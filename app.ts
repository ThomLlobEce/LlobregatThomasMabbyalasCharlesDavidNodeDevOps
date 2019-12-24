const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

// Defining a typical metrics
class Metrics {
    time: string
    value: string

    constructor(time: string, value: string){
        this.time = time
        this.value = value
    }
}

// Defining a typical user
class User {
    name: string
    firstName: string
    email: string
    password: string
    metrics: Metrics[]
  
    constructor(name: string, firstName: string, email: string, password: string) {
      this.name = name
      this.firstName = firstName
      this.email = email
      this.password = password
      this.metrics = []
    }

    addMetrics = (value: string, time: string) => {
        this.metrics.push(new Metrics(time, value))
    }
  }


const users: User[] = [new User("a", "a", "a@gmail.com", "a")]
const auths: string[] = []

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
        users.push(new User(req.body.last_name, req.body.first_name, req.body.email, req.body.password))
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


app.get('/api/deleteMetrics',  (req: { query: { email: string; value: string; timestamp: string; }; }, res: any) => {
    let disconnect = false

    for(let i = 0; i < users.length ; i++){
        if(users[i] === req.query.timestamp){
            users.splice(i, 1)
        }
    }

});

// API that add a metrics to a user based on provided email.
app.get('/api/addMetrics', (req: { query: { email: string; value: string; timestamp: string; }; }, res: any) => {
    let missingParams = false
    let nonAuth = true

    if(!req.query.email || !req.query.value || !req.query.timestamp){
        missingParams = true
    }
    else{
        for(let i = 0; i < users.length; i++){
            if(users[i].email === req.query.email){
                for(let j = 0; j < auths.length; j++){
                    if(auths[j] === users[i].email){
                        nonAuth = false
                        break;
                    }
                }
                if(!nonAuth){
                    users[i].addMetrics(req.query.value, req.query.timestamp)
                }
            }
        }
    }

    if(missingParams){
        res.json({
            status: "failed",
            message: "Parameters are missing"
        })
    }
    else if(nonAuth){
        res.json({
            status: "failed",
            message: "Email provided does not correspond to an authed user."
        })
    }
    else{
        res.json({
            status: "success",
            message: "Timestamp successfully added to user"
        })
    }


});

// API that add a metrics to a user based on provided email.
app.get('/api/getMetrics', (req: { query: { email: string; }; }, res: any) => {
    let missingParams = false
    let nonAuth = true
    let response

    if(!req.query.email){
        missingParams = true
    }
    else{
        for(let i = 0; i < users.length; i++){
            if(users[i].email === req.query.email){
                for(let j = 0; j < auths.length; j++){
                    if(auths[j] === users[i].email){
                        nonAuth = false
                        break;
                    }
                }
                if(!nonAuth){
                    response = users[i].metrics
                }
            }
        }
    }

    if(missingParams){
        res.json({
            status: "failed",
            message: "Parameters are missing"
        })
    }
    else if(nonAuth){
        res.json({
            status: "failed",
            message: "Email provided does not correspond to an authed user."
        })
    }
    else{
        res.json({
            status: "success",
            message: response
        })
    }


});

// Handles any requests that don't match the ones above
app.get('*', (req: any,res: { sendFile: (arg0: any) => void; }) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port);

console.log('App is listening on port ' + port);

module.exports = app