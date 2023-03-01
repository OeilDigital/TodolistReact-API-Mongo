const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UsersSchema = new Schema({
    // id: String,
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
    // postedDate: { type: Date, default: Date.now }
})
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;