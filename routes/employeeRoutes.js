const express = require('express');
const { loginEmploye, registerEmployee, getEmployees, editEmployee, deleteEmployee, getEmployeeById, editEmployeePost } = require('../services/employeeService');
const { employeeValidator, validateEmployee } = require('../validators/employeeValidator');
const { authenticateToken,authorizeRole } = require("../middleware/auth");
const router = express.Router();


router.get('/registerEmployee', (req, res) => {
    res.render('employees/registerEmployee');
});


router.post('/registerEmployee', employeeValidator, validateEmployee, registerEmployee);




router.get('/',authenticateToken, authorizeRole(["Manager","RH"]) , getEmployees);

router.post('/', editEmployee);

router.get('/login', (req, res) => {
    res.render('employees/login');
});

router.post('/login', loginEmploye);


router.get('/edit/:id', getEmployeeById);
/* (req, res) => {
    const employeeId = req.params.id;
    
    res.render('employees/editEmployee', { employeeId });
});*/
router.post('/edit/:id', editEmployeePost);

router.get('/delete/:id', deleteEmployee);

module.exports = router;

