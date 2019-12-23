const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

// Defining a typical user
class User {
    name: string
    firstName: string
    email: string
    password: string
  
    constructor(name: string, firstName: string, email: string, password: string) {
      this.name = name
      this.firstName = firstName
      this.email = email
      this.password = password
    }
  }

const users: User[] = [{ name: "a", firstName: "a", email: "a@gmail.com", password: "a"}]
const auths: String[] = []

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API that can create an user if it has the required informations and add it into users array
app.post('/api/createUser', (req: { body: { email: string; first_name: string; last_name: string; password: string; }; },res: { json: (arg0: { status: string; message: string; }) => void; }) => {
    let exist = false
    let missingParams = false;

    if(!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password){
        missingParams = true
    }
    else{
        for(let i = 0; i < users.length; i++){
            if(users[i].email === req.body.email){
                exist = true
                break
            }
        }
    }
    
    if(exist){
        res.json({
            status: "failed",
            message: "Email already exists"
        })
    }
    else if(missingParams){
        res.json({
            status: "failed",
            message: "Missing parameters"
        })
    }
    else{
        users.push({name: req.body.last_name, firstName: req.body.first_name, email: req.body.email, password: req.body.password})
        res.json({
            status: "success",
            message: "User added"
          });
    }
});

// API that sign a user in if it exist and it is not already logged. Then add its email to auths array.
app.get('/api/signIn', (req: { query: { email: string; password: string; }; },res: { json: (arg0: { status: string; message: string | User ; }) => void; }) => {
    let user
    let exist = false

    for(let i = 0; i < users.length; i++){
        if(users[i].email === req.query.email && users[i].password === req.query.password){
            for(let j = 0; j < auths.length; j++){
                if(auths[j] = users[i].email){
                    exist = true
                    break
                }
            }
            if(!exist){
                user = users[i]
                auths.push(users[i].email)
            }
            break
        }
    }

    if(user){
        res.json({ status: "success", message: user });
    }
    else if(exist){
        res.json({ status: "failed", message: "Already signed in" });
    }
    else{
        res.json({ status: "failed", message: "error" });
    }
});

// API that check if a user is authenticated by looking for its email into the auths array.
app.get('/api/isAuth', (req: { query: { email: string; }; }, res: { json: (arg0: { status: string; message: boolean; }) => void; }) => {
    let auth = false

    for(let i = 0; i < auths.length ; i++){
        if(auths[i] === req.query.email){
            auth = true
        }
    }

    if(auth){
        res.json({ status: "success", message: auth });
    }
    else{
        res.json({ status: "failed", message: auth });
    }

});

// API that disconnect a user based on the provided email. So it removes it from auths array.
app.get('/api/disconnect', (req: { query: { email: string; }; }, res: { json: (arg0: { status: string; message: boolean; }) => void; }) => {
    let disconnect = false

    for(let i = 0; i < auths.length ; i++){
        if(auths[i] === req.query.email){
            auths.splice(i, 1)
            disconnect = true
        }
    }

    if(disconnect){
        res.json({ status: "success", message: disconnect });
    }
    else{
        res.json({ status: "failed", message: disconnect });
    }

});

// Handles any requests that don't match the ones above
app.get('*', (req: any,res: { sendFile: (arg0: any) => void; }) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);

console.log('App is listening on port ' + port);

module.exports = app