const jwt = require("jsonwebtoken")
const User = require("../Models/user.model")
const ErrorResponse = require("../Utils/errorResponse")

exports.protect = async (req, res, next) => {
    let token
    token = req.headers.authorization
    console.log(token)

    if(!token){
        return next(new ErrorResponse("No esta autorizado para accesar a esta ruta", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if(!user){
            return next(new ErrorResponse("Usuario no encontrado con su ID", 404))
        }

        req.user = user
        next()
    } catch (error) {
        return next(new ErrorResponse("No esta autorizado para accesar a esta ruta", 401))
    }
}