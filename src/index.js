const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config({ encoding: 'latin1', path: './config.env'})
const cors = require("cors")
const userRoutes = require("./Routes/user.routes")
const seriesRoutes = require("./Routes/series.routes")
const authRoutes = require('./Routes/auth.routes')
const privateRoutes = require('./Routes/private.routes')
const errorHandler = require("./Middleware/error")

const app = express()
const port = process.env.PORT || 9000

// Middleware
app.use(express.json())
app.use(cors({ origin: '*'}))
app.use('/api', userRoutes)
app.use('/api', seriesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/private', privateRoutes)

// ErrorHandler

app.use(errorHandler)

// routes
app.get("/", (req, res) => {
    res.send("Welcome to my API")
})

// mongodb connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connection to MongoDB Atlas"))
    .catch((err) => console.log(err))

const server = app.listen(port, () => {
    console.log("server listen on port:", port)
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error ${err}`)
    server.close(() => process.exit(1))
})