const { body, validationResult } = require('express-validator');

const leaveValidator = [
    
    body('typeConge').notEmpty().withMessage('type conge obligatoire'),
    body('dateDebut').isDate().withMessage('Date debut obligatoire'),
    body('dateFin').isDate().withMessage('Date fin obligatoire'),
    body('employee').notEmpty().withMessage('employee non trouver')
    
];

const validateLeave = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { leaveValidator, validateLeave };
