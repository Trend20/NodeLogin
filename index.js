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
     response.sendFile(path.join(__dirname + '/login.html'));
 });

 app.post('/auth', function(request, response){
     const username = request.body.username;
     const password = request.body.password;
     if(username&&password){
         connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
             if(request.length > 0){
                 request.session.loggedin = true;
                 request.session.username = username;
                 response.redirect('/home');
             }else{
                 response.send('Incorrect Username and Password');
             }
             response.end();
         }
     }
 })