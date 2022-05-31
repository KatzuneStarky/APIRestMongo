const mongoose = require("mongoose")

const seriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    numCaps: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
})

module.exports = mongoose.model('Series', seriesSchema)