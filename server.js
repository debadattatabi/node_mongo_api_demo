var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var config = require('config');

var bunyan = require('bunyan');
global.log = bunyan.createLogger({name: "node-mongo-first-api"});


// Connect Db
var initDb = require('./app/db/init.js');
initDb();

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

// var router = express.Router();

app.get('/', function(req, res){
  res.json({'message':'Hey! Welcome to API!'})
})

app.use('/api', require('./app/controllers/EmployeeController'));

var port = process.env.PORT || config.get('port');
app.listen(port)
console.log('Server started at ', port);