const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({ encoding: 'latin1'})
const userRoutes = require("./Routes/user.routes")
const seriesRoutes = require("./Routes/series.routes")

const app = express()
const port = process.env.PORT || 9000

// Middleware
app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', seriesRoutes)

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