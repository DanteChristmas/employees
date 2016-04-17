var express = require('express');
var router = express.Router();
var EmployeeProvider = require('../employeeprovider').EmployeeProvider;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});


var employeeProvider = new EmployeeProvider('localhost', 27017);
router.get('/employee/new', function(req, res) {
  res.render('employee_new', {
    title: 'New Employee'
  });
});

router.post('/employee/new', urlencodedParser, function(req, res) {
  employeeProvider.save({
    title: req.body.title,
    name: req.body.name
  }, function(error, docs) {
    res.redirect('/');
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  employeeProvider.findAll(function(error, emps) {
    console.log(emps);
    res.render('index', {
      title: 'Employees',
      employees: emps
    });
  });
});

module.exports = router;
