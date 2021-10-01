const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID:{ type: String, require: true, unique:true},
    serverID:{type: String, require:true},
    team: {type: Array, default:[]},
    inventory:{type: Object, default:{pokeballs: 5}}
})

const model = mongoose.model('ProfileModels', profileSchema)

module.exports = model