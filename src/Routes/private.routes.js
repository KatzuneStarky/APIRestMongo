const express = require("express")
const router = express.Router()
const { getPrivatedData } = require('../Controllers/private.controller')
const { protect } = require("../Middleware/auth")

router.route("/").get(protect, getPrivatedData)

module.exports = router