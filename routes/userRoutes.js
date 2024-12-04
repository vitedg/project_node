const express = require('express');
const { registerUser, loginUser } = require('../services/userService');
const { userValidator, validateUser } = require('../validators/userValidator');
const router = express.Router();


router.get('/registerUser', (req, res) => {
    res.render('users/registerUser');
});


router.post('/registerUser', userValidator, validateUser, registerUser);



router.get('/login', (req, res) => {
    res.render('users/login');
});


router.post('/login', loginUser);


module.exports = router;
