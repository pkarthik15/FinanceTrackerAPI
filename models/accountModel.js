const mongoose = require('mongoose')


const Schema = mongoose.Schema

const accountSchema = new Schema (
    {
        name : {
            type: String,
            required: [true, 'Please add name']
        },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',  
            required: [true, 'Please add user'],
            index: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = {
    AccountSchema: accountSchema,
    Account :  mongoose.model('Account', accountSchema)
}