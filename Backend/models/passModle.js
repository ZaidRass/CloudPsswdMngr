const mongoose = require('mongoose');

const passSchema = new mongoose.Schema({
    Website : {type: String, required: true},
    Username : {type: String, required: true},
    Password : {type: String, required: true},
});
module.exports = mongoose.model('Password', passSchema);
module.exports.Schema = passSchema;