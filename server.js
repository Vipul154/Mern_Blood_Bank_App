const express = require('express');

//Now we are creating the rest object, which is used for getting all the functionalities of the express()
const app = express()

//Now we are creating a port
const PORT = 8080

//We need to create a route
app.get('/', (requst, response)=>{
    //using request, we can take requests from the user.
    //using response, we can give response to the user.
    response.status(200).json({
        message : 'Welcome to the Blood Bank Management System'
    })
})

//Me Adding a test route
app.get('/test', (request, response)=>{
    response.status(200).json({
        message : "Welcome you are in the test route"
    })
})

//*Nodejs code does not get updated automatically, as we need to install another package called nodemon.
//Normally this is not how real world apps are made, so we work using architectural models like MVC (Model-View-Controller) later.
//refer doc1
//Now we are gonna change the code for letting it follow MVC Pattern.
//But first, I will initialze the git repo for this project.

//This will be the endpoint : http://localhost:8080/test

//listen is a function used to call the server
app.listen(PORT, ()=>{
    console.log("Node Server Running");
})