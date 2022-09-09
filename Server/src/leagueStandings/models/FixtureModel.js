const {Schema, model} = require('mongoose');

const fixtureSchema = new Schema({
    _id: String,
    fases: Array
});
const Fixture = model('Fixture', fixtureSchema);
module.exports = Fixture;