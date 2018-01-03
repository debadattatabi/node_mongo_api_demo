var express = require('express');
var api = express.Router();

var Employee = require('../models/EmployeeModel');
var Response = require('../utils/response');
var api = express.Router();

// Create
api.post('/employee', function(req, res) {
  req.body.created_at = new Date();
  req.body.updated_at = null;
  var employee = new Employee(req.body);
  employee.save(function(err, employee){
    if(!err){
      req.body.id = employee.id;
      var resData = Response.data(req.body);
      res.send(resData);
    }else{
      // Handle Error
      var resError = Response.error({
        code: "500",
        message: "Internal Server Error"
      })
      log.error(err);
      res.status(500).send(resError);
    }
  });
});

// Get all
api.get('/employees', function(req, res) {
  Employee.find({}, {__v: 0}, function(err, records) {
    if(!err){
      var resData = Response.data(records);
      res.send(resData);
    }else{
      // Handle Error
      log.error(err);
    }
  });
});

// Get details by id
api.get('/employee/:id', function(req, res){
  Employee.findById(req.params.id, function(err, doc){
    if(!err){
      var resData = Response.data(doc);
      res.send(resData);
    }else{
      // Handle Error
      log.error(err);
    }
  });
})

// Update by id
api.put('/employee/:id', function(req, res){
  req.body.updated_at = new Date();
  Employee.findOneAndUpdate({"_id":req.params.id}, {$set: Object.assign({}, req.body)}, {upset: true}, function(err, doc){
    if(!err){
      var resData = Response.data(doc._id);
      res.send(resData);
    }else{
      // Handle Error
      log.error(err);
    }
  })
});

// Delete by id
api.delete('/employee/:id', function(req, res){
  employee.deleteOne({"_id":req.params.id}, function(err, doc){
    if(!err){
      res.status(200).send('');
    }else{
      // Handle Error
      var resError = Response.error({
        code: "500",
        message: "Internal Server Error"
      })
      log.error(err);
      res.status(500).send(resError);
    }
  })
})

module.exports = api;