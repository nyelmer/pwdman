const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { registerValidation } = require("../middlewares/validation");

router.post("/login", async (req, res) => {

    // Check if user exists
    let user = await User.findOne({ 'username': req.body.username });
    if (!user) {
        return res.status(400).json({ 'error': 'Email or password is wrong' })
    }

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).json({ 'error': 'password is invalid' })
    }

    // Create JWT 
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Send JWT back
    res.header('auht-token', token).json({ "message": `Logged in as ${user.username}`, 'token': token });
});

router.post("/register", async (req, res) => {

    // Check if user already exists
    let userExists = await User.findOne({ 'username': req.body.username });
    if (userExists) return res.status(400).json({ "error": "Username already taken." });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Save the user
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    });

    // Validate data
    let error = registerValidation({
        "username": user.username,
        "password": user.password
    });

    if (error) {
        return res.json({
            'error': error.details[0].message
        });
    }

    // Save the user
    try {
        await user.save()
    } catch (error) {
        res.status(400).send(error);
    }

    res.send(user);

});

module.exports = router;