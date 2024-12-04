const { body, validationResult } = require('express-validator');

const employeeValidator = [
    body('nom').notEmpty().withMessage('Nom obligatoire'),
    body('prenom').notEmpty().withMessage('prenom obligatoire'),
    body('addresse').notEmpty().withMessage('address obligatoire'),
    body('salaire').isNumeric().withMessage('obligatoire numero'),
    body('dateNaissance').isDate().withMessage('Date Naissance obligatoire'),
    body('email').isEmail().withMessage('Email Obligatoire'),
    body('password').isLength({ min: 6 }).withMessage('mote de passe minimum 6 character')
];

const validateEmployee = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { employeeValidator, validateEmployee };












  