const userModel  = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}


const login = async (req, res) => {
    const {email, password} = req.body
    try 
    {
        const user = await userModel.User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({name:user.name, email:user.email, token})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
}


const signup = async (req, res) => {
    const {name, email, password} = req.body
  
    try 
    {
      const user = await userModel.User.signup(name, email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({name:user.name, email:user.email, token})
    } catch (error) 
    {
      res.status(400).json({error: error.message})
    }
  }
  
  module.exports = { signup, login }
