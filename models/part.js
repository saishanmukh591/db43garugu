const mongoose = require("mongoose")
const partSchema = mongoose.Schema({
    part_name: {
        type: String,
        required: [true, "part name can not be blank"],
    },

    size: {
        type: String,
        required: [true, "part size can not be blank"] ,
    },

    cost: {
        type: Number,
        required: [true, "Cost of the part is required"],
        min: [10, "part Cost Should be minimum of $10 "],
        max: [100, "part Cost Cannot be greater than $100 "]
    }
})

module.exports = mongoose.model("Part", partSchema)