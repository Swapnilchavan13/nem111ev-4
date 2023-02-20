const mongoose = require("mongoose");
const connection = mongoose.connect(process.env.mongoUR);

module.exports = {
connection
};