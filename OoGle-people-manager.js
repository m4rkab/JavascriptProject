// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

// Build our routes
// get /all gives list of all programmers
app.get('/all', (req, res) => {
  res.send(database);
  
});

app.get('/:id', (req, res) => {
  // written with help from Eris
  // return slave programmer by ID
  const id = req.params.id;
  let slave = database.find(o => o[id]);
  res.send(slave);
});

// update programmer by ID
app.put('/:id', (req, res) => {
  const id = req.params.id;
  let slave = database.find(o => o[id]);
  
  // update all slave data with newly provided data
  slave.firstName = body.firstName;
  slave.lastName = body.lastName;
  slave.homeAddress = body.homeAddress;
  slave.SID = body.SID;
  slave.goodSlave = body.goodSlave;
  slave.beatingsToDate = body.parseInt(body.beatingsToDate);
  
  slave.family.wife = body.slave.family.wife;
  slave.family.husband = body.slave.family.husband;
  slave.family.children = body.slave.family.children;

  res.send(slave);
});

app.post('/', (req, res) => {
  const body = req.body; // Hold your JSON in here!
  database.push(body); 
  res.send(`You sent: ${body}`);
});

// handle invalid requests by sending 'ERROR'
app.all('/*', (req,res) => {
  res.send('ERROR');
});

app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});
