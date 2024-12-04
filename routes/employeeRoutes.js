const express = require('express');
const { registerEmployee, getEmployees, editEmployee, deleteEmployee, getEmployeeById, editEmp } = require('../services/employeeService');
const { employeeValidator, validateEmployee } = require('../validators/employeeValidator');
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();


router.get('/registerEmployee', (req, res) => {
    res.render('employees/registerEmployee');
});


router.post('/registerEmployee', employeeValidator, validateEmployee, registerEmployee);




router.get('/',authenticateToken, getEmployees);

router.post('/', editEmp);


router.get('/edit/:id', getEmployeeById);
/* (req, res) => {
    const employeeId = req.params.id;
    
    res.render('employees/editEmployee', { employeeId });
});*/


router.get('/delete/:id', deleteEmployee);

module.exports = router;

