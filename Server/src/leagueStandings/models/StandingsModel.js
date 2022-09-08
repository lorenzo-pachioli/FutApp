const {Schema, model} = require('mongoose');

const standingsSchema = new Schema({
    _id: String,
    standings: Object
});
const Standings = model('Standings', standingsSchema);
module.exports = Standings;