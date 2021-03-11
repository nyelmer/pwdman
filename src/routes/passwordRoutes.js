const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const Password = require("../models/PasswordModel");

router.get("/all", auth, async (req, res) => {

    // Get auth_token and decode it to get the user id
    const auth_token = req.headers["auth-token"];

    const verified_token = await jwt.verify(auth_token, process.env.JWT_SECRET);

    // Get all the passwords
    Password.find({ owner_id: verified_token._id }).select("-_id -__v -owner_id")
        .then(docs => {
            res.json({ passwords: docs })
        })
        .catch(error => {
            console.log(error);
        });

});

router.post("/new", auth, async (req, res) => {

    // Get the auth token and get the user id from it
    const auth_token = req.headers["auth-token"];
    const user_id = await jwt.verify(auth_token, process.env.JWT_SECRET)._id;

    // Create new password
    const new_pwd = {
        owner_id: user_id,
        website: req.body.website,
        username: req.body.username,
        password: req.body.password
    }

    // Encrypt the data

    // Create the new password
    await new Password(new_pwd).save();

    res.send(new_pwd)

});

module.exports = router;