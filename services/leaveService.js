const Leave = require('../models/Leave');
const Employee = require('../models/Employee');

// Afficher le formulaire de création de congé
const createLeaveForm = async (req, res) => {
    try {
        // Vous pouvez aussi obtenir des employés pour les afficher dans le formulaire
        const employees = await Employee.find();
        res.render('createLeave', { employees });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};

// Soumettre la création d'un congé
const createLeave = async (req, res) => {
    const { typeConge, dateDebut, dateFin, employeeId } = req.body;

    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).send('Employé non trouvé');
        }

        const newLeave = new Leave({
            typeConge,
            dateDebut,
            dateFin,
            employee: employeeId,
            soldeRestant: employee.soldeConges, // Initial solde of leave
        });

        await newLeave.save();

        res.redirect('/leave/create'); // Rediriger vers le formulaire après la création
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};


module.exports = { createLeave ,createLeaveForm};
