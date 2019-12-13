const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

const users = [{name: "Llobregat", firstName: "Thomas", email: "w@gmail.com", password: "azer"}]
const auths = []

const port = process.env.PORT || 5000;

app.use(bodyParser.json())

// Serve the static files from the React app
.use(express.static(path.join(__dirname, 'client/build')))

// An api endpoint that returns a short list of items
.post('/api/createUser', (req,res) => {
    let exist = false

    for(let i = 0; i < users.length; i++){
        if(users[i].email === req.body.email){
            exist = true
            break
        }
    }
    if(exist){
        res.send("Email already exists")
    }
    else{
        users.push({name: req.body.last_name, firstName: req.body.first_name, email: req.body.email, password: req.body.password})
        res.send("User added")
    }
})

// An api endpoint that returns a short list of items
.get('/api/signIn', (req,res) => {
    let user = false

    for(let i = 0; i < users.length; i++){
        if(users[i].email === req.query.email && users[i].password === req.query.password){
            user = users[i]
            auths.push(users[i].email)
            break
        }
    }

    res.send(user)
})

.get('/api/isAuth', (req, res) => {
    let auth = false

    for(let i = 0; i < auths.length ; i++){
        if(auths[i] === req.query.email){
            auth = true
        }
    }

    res.send(auth)

})

// Handles any requests that don't match the ones above
.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

.listen(port);

console.log('App is listening on port ' + port);