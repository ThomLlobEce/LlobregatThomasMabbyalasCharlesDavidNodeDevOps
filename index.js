const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

const users = []


app.use(bodyParser.json())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.post('/api/createUser', (req,res) => {

    users.push({name: req.body.last_name, firstName: req.body.first_name, email: req.body.email, password: req.body.password})

    console.log(users)

    res.send("User correctly added")
});

// An api endpoint that returns a short list of items
app.get('/api/logIn', (req,res) => {
    let user = false

    for(let i = 0; i < users.length; i++){
        if(users[i].email === req.query.email && users[i].password === req.query.password){
            user = users[i]
            break
        }
    }

    res.send(u)
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);