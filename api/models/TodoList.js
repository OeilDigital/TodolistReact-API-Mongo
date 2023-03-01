const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TodoListSchema = new Schema({
    id: String,
    name: String,
    user_id: String,
    area: String,
    priorityLevel: Number,
    editable: Boolean,
    validated: Boolean,
    details: String,
    editableModal: Boolean,
    postedDate: {
        type: Date,
        default: new Date()
    }
    // postedDate: { type: Date, default: Date.now }
})
const TodoList = mongoose.model('TodoList', TodoListSchema);
module.exports = TodoList;