exports.getPrivatedData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "Ya cuentas con acceso a la data privada en esta ruta"
    })
}