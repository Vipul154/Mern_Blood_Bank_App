const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

//Now we are creating the rest object, which is used for getting all the functionalities of the express()
const app = express()

//Now we are creating a port
const PORT = process.env.PORT || 8080;

//importing other packages
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');

//Adding in middlewares
app.use(cors());
app.use(express.json()) //for handling json response in application
app.use (morgan('dev')) //the mode for morgan package, used for printing the http response and url hit with time taken

//We need to create a route
app.get('/', (requst, response)=>{
    //using request, we can take requests from the user.
    //using response, we can give response to the user.
    response.status(200).json({
        message : 'Welcome to the Blood Bank Management System'
    })
})
 
//Me Adding a test route
/*
app.get('/testWithoutMvc', (request, response)=>{
    response.status(200).json({
        message : "Welcome you are in the test route"
    })
})
*/
app.use('/api/v1/test', require('./routes/testroute'));

//*Nodejs code does not get updated automatically, as we need to install another package called nodemon.
//Normally this is not how real world apps are made, so we work using architectural models like MVC (Model-View-Controller) later.
//refer doc1
//Now we are gonna change the code for letting it follow MVC Pattern.
//But first, I will initialze the git repo for this project. Done. Although took me some time.

//This will be the endpoint : http://localhost:8080/test

//listen is a function used to call the server
app.listen(PORT, ()=>{
    console.log(`Node Server Running in ${process.env.DEV_MODE} on port ${process.env.PORT}`.bgGreen.bgYellow);
})