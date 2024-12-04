const express = require('express');
const { createLeave } = require('../services/leaveService');
const { leaveValidator, validateLeave } = require('../validators/leaveValidator');
const router = express.Router();


router.get('/createLeave', (req, res) => {
    res.render('leaves/createLeave');
});


router.post('/createLeave', leaveValidator, validateLeave, createLeave);

router.get('/login', (req, res) => {
    res.render('leaves/login');
});



module.exports = router;
