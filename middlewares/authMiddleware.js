const jwt = require('jsonwebtoken')
const userModel  = require('../models/userModel')



const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.User.findOne({ id })
        req.user = {
            "id": user._id,
            "name": user.name,
            "email": user.email
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth