const express = require("express")
const userSchema = require("../Models/user.model")

const router = express.Router()

// Create User
router.post("/users", (req, res) => {
    const user = userSchema(req.body)
    user.save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Get All Users
router.get("/users", (req, res) => {
    userSchema.find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Get User By ID
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema.findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Update User
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body
    userSchema.updateOne({ _id: id }, { $set: { name, age, email } })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

// Delete User
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema.remove({ _id: id })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
})

module.exports = router