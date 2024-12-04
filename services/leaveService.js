const Leave = require('../models/Leave');


const createLeave = async (req, res) => {
    const { typeConge, dateDebut, dateFin, soldeRestant, employee } = req.body;
    const newLeave = new Leave({ typeConge, dateDebut, dateFin, soldeRestant, employee });

    try {
        await newLeave.save();
        res.status(201).redirect('/leaves');
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { createLeave };
