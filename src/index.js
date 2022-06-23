const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({ encoding: 'latin1'})
const cors = require("cors")
const jwt = require('jsonwebtoken')
const userRoutes = require("./Routes/user.routes")
const seriesRoutes = require("./Routes/series.routes")
const registerRoutes = require("./Routes/register.routes")

const app = express()
const port = process.env.PORT || 9000

// Middleware
app.use(express.json())
app.use(cors({ origin: '*'}))
app.use('/api', userRoutes)
app.use('/api', seriesRoutes)
app.use('/api', registerRoutes)

// routes
app.get("/", (req, res) => {
    res.send("Welcome to my API")
})

// mongodb connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connection to MongoDB Atlas"))
    .catch((err) => console.log(err))

app.listen(port, () => {
    console.log("server listen on port:", port)
})