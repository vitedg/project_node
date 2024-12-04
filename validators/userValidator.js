const { body, validationResult } = require('express-validator');

const userValidator = [
    body('nom').notEmpty().withMessage('nom require '),
    body('prenom').notEmpty().withMessage(' prenom require'),
    body('email').isEmail().withMessage('email non valide'),
    body('password').isLength({ min: 6 }).withMessage('minimum 6 character'),
    body('role').notEmpty().withMessage('Role obligatoire')
];

const validateUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { userValidator, validateUser };
