const express = require('express');
const { createLeave, createLeaveForm } = require('../services/leaveService');
const { leaveValidator, validateLeave } = require('../validators/leaveValidator');
const router = express.Router();

// Route pour afficher le formulaire de création d'un congé
router.get('/create', createLeaveForm);

// Route pour soumettre le formulaire de création d'un congé
router.post('/create', createLeave);



router.get('/createLeave', (req, res) => {
    res.render('leaves/createLeave');
});


router.post('/createLeave', leaveValidator, validateLeave, createLeave);

module.exports = router;
