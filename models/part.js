const mongoose = require("mongoose")
const partSchema = mongoose.Schema({
    part_name: String,
    size: String,
    cost: Number
})

module.exports = mongoose.model("Part", partSchema)