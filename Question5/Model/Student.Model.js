const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: String,
    age: Number,
    // Add more fields as needed
});

module.exports = mongoose.model('Student', studentSchema);
