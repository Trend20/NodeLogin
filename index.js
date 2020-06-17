const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login',
});
 const app = express();
 app.use(session({
    secret: 'secret',
	resave: true,
	saveUninitialized: true
 }));
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

 app.get('/', function(request, response){
     response.sendFile(path.join(__dirname + '/login.html'))
 })
