const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();

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


const editEmployeePost = async (req, res) => {
    const { _id, nom, prenom, addresse, salaire, dateNaissance, email } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            _id,
            { nom, prenom, addresse, salaire, dateNaissance, email },
            { new: true } // Retourne l'employé mis à jour
        );

        if (!updatedEmployee) {
            return res.status(404).send('Employé non trouvé');
        }

        res.redirect(`/employee/${updatedEmployee._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};

const loginEmploye = async (req, res) => {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee) {
        return res.status(400).send('user not found');
    }


    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
        return res.status(400).send('mot de passe incorrect');
    }


    const token = jwt.sign({ employeeId: employee._id}, process.env.SECRET_KEY);
    res.cookie('token', token);
    res.redirect('/employees');
};



module.exports = { loginEmploye, registerEmployee, getEmployees, deleteEmployee, editEmployee, getEmployeeById, editEmployeePost };
