const Employee = require('../models/Employee');


const registerEmployee = async (req, res) => {
    const { nom, prenom, addresse, salaire, dateNaissance, email, password } = req.body;
    const employee = new Employee({ nom, prenom, addresse, salaire, dateNaissance, email, password });

    try {
        await employee.save();
        res.status(201).redirect('/employees');
    } catch (err) {
        res.status(400).send(err);
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);
        
        if (!employee) {
            return res.status(404).send('Employe not found');
        }

        res.render('employees/editEmployee', { employee });
    } catch (err) {
        res.status(500).send('error recuperation de donné');
    }
};


const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('employees/employeesList', { employees });
    } catch (err) {
        res.status(500).send('error recuperation de donné');
    }
};


const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;
        await Employee.findByIdAndDelete(employeeId);
        res.redirect('/employees');
    } catch (err) {
        res.status(500).send(' error en tant que delete ');
    }
};


const editEmployee = async (req, res) => {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    res.render('employees/editEmployee', { employee });
};

const editEmp = async (req, res) => {
    const employeeId = req.params.id;
    const employee = await Employee.findById(employeeId);
    res.render('employees/editEmployee', { employee });
};




module.exports = { registerEmployee, getEmployees, deleteEmployee, editEmployee, getEmployeeById, editEmp };
