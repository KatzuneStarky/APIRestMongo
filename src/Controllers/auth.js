const crypto = require("crypto")
const User = require("../Models/user.model");
const ErrorResponse = require("../Utils/errorResponse");
const sendEmail = require("../Utils/sendEmail");

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
        });

        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(
            new ErrorResponse("Favor de proveer correo electronico y contraseña", 400)
        );
    }

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorResponse("Credenciales Invalidas", 404));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return next(new ErrorResponse("Credenciales Invalidas", 404));
        }

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No se pudo mandar el correo", 404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();
        const resetUrl = `http://localhost:3000/passwordReset/${resetToken}`;

        const message = `
            <h1>Sigue el siguiente link para resetear tu password</h1>
            <a href=${resetUrl} clictracking=off >${resetUrl}</a>
        `;
        try {
            await sendEmail({
                to: user.email,
                subject: "Solicitud para cambio de contraseña",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email enviado" });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("El email no pudo ser enviado", 500));
        }
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if(!user){
            return next(new ErrorResponse("Actualizacion de token invalido", 400))
        }

        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        res.status(201).json({
            success: true,
            data: "Contraseña restablecida con exito"
        })
    } catch (error) {
        next(error)
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({ success: true, token });
};
