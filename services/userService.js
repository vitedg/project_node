const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();



const registerUser = async (req, res) => {
    const { nom, prenom, email, password, role } = req.body;
    const user = new User({ nom, prenom, email, password, role });

    try {
        await user.save();
        res.status(201).redirect('/login'); 
    } catch (err) {
        res.status(400).send(err);
    }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send('user not found');
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send('mot de passe incorrect');
    }


    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY);
    res.cookie('token', token);
    res.redirect('/employees');
};

module.exports = { loginUser, registerUser };