const express = require("express")
const seriesModel = require("../Models/series.model")

const router = express.Router()

// Create Data Serie
router.post("/series", (req, res) => {
    const serie = seriesModel(req.body)
    serie.save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Get All Series
router.get("/series", (req, res) => {
    seriesModel.find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Get Series By ID
router.get("/series/:id", (req, res) => {
    const { id } = req.params;
    seriesModel.findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Update Serie
router.put("/series/:id", (req, res) => {
    const { id } = req.params;
    const { name, numCaps, description, imageUrl } = req.body
    seriesModel.updateOne({ _id: id }, { $set: { name, numCaps, description, imageUrl } })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Delete Serie
router.delete("/series/:id", (req, res) => {
    const { id } = req.params;
    seriesModel.remove({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

module.exports = router