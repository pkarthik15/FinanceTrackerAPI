const mongoose = require('mongoose')
const accountModel  = require('../models/accountModel')


const getUserAccounts = async (req, res) => {
    const user_id = req.user.id
    const accounts = await accountModel.Account.find({user:user_id}).sort({name:1})
    res.status(200).json(accounts)
}
  
  
const createUserAccount = async (req, res) => {
    const {name} = req.body
  
    let emptyFields = []
  
    if(!name) {
      emptyFields.push('name')
    }
    
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
  
    
    try 
    {
      const user_id = req.user.id
      const account = await accountModel.Account.create({name, user:user_id})
      res.status(200).json(account)
    } 
    catch (error) 
    {
      res.status(400).json({error: error.message})
    }
}
  

const deleteUserAccount = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such account'})
    }
  
    const account = await accountModel.Account.findOneAndDelete({_id: id})
  
    if (!account) {
      return res.status(400).json({error: 'No such account'})
    }
  
    res.status(200).json(account)
}
  

const updateUserAcount = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such account'})
    }
  
    const account = await accountModel.Account.findOneAndUpdate({_id: id}, {
      name:req.body.name
    })
  
    if (!account) {
      return res.status(400).json({error: 'No such account'})
    }
  
    res.status(200).json(account)
}
  
  
module.exports = {
    getUserAccounts,
    createUserAccount,
    deleteUserAccount,
    updateUserAcount
}