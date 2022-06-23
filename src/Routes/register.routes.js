const express = require("express");
const jwt = require('jsonwebtoken')
const RegisterModel = require("../Models/register.model");

const router = express.Router();

router.post("/register", (req, res) => {
    try {
        RegisterModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: "ok" });
    } catch (error) {
        res.json({ status: "error", error: "email duplicado" });
    }
});

router.post("/login", (req, res) => {
    const userL = RegisterModel.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (userL) {
        const token = jwt.sign({
            name: userL.name,
            email: userL.email
        }, 'secret123')
        return res.json({ status: "ok", user: token });
    } else {
        res.json({ status: "error", user: false });
    }
});

module.exports = router