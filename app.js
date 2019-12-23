"use strict";
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
// Defining a typical metrics
var Metrics = /** @class */ (function () {
    function Metrics(time, value) {
        this.time = time;
        this.value = value;
    }
    return Metrics;
}());
// Defining a typical user
var User = /** @class */ (function () {
    function User(name, firstName, email, password) {
        var _this = this;
        this.addMetrics = function (value, time) {
            _this.metrics.push(new Metrics(time, value));
        };
        this.name = name;
        this.firstName = firstName;
        this.email = email;
        this.password = password;
        this.metrics = [];
    }
    return User;
}());
// Array containing registered users
var users = [];
// Array containing emails of current authenticated users
var auths = [];
var port = process.env.PORT || 5000;
app.use(bodyParser.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// API that can create an user if it has the required informations and add it into users array
app.post('/api/createUser', function (req, res) {
    var exist = false;
    var missingParams = false;
    if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password) {
        missingParams = true;
    }
    else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === req.body.email) {
                exist = true;
                break;
            }
        }
    }
    if (exist) {
        res.json({
            status: "failed",
            message: "Email already exists"
        });
    }
    else if (missingParams) {
        res.json({
            status: "failed",
            message: "Missing parameters"
        });
    }
    else {
        users.push(new User(req.body.last_name, req.body.first_name, req.body.email, req.body.password));
        res.json({
            status: "success",
            message: "User added"
        });
    }
});
// API that sign a user in if it exist and it is not already logged. Then add its email to auths array.
app.get('/api/signIn', function (req, res) {
    var user;
    var exist = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === req.query.email && users[i].password === req.query.password) {
            for (var j = 0; j < auths.length; j++) {
                if (auths[j] = users[i].email) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                user = users[i];
                auths.push(users[i].email);
            }
            break;
        }
    }
    if (user) {
        res.json({ status: "success", message: user });
    }
    else if (exist) {
        res.json({ status: "failed", message: "Already signed in" });
    }
    else {
        res.json({ status: "failed", message: "error" });
    }
});
// API that check if a user is authenticated by looking for its email into the auths array.
app.get('/api/isAuth', function (req, res) {
    var auth = false;
    for (var i = 0; i < auths.length; i++) {
        if (auths[i] === req.query.email) {
            auth = true;
        }
    }
    if (auth) {
        res.json({ status: "success", message: auth });
    }
    else {
        res.json({ status: "failed", message: auth });
    }
});
// API that disconnect a user based on the provided email. So it removes it from auths array.
app.get('/api/disconnect', function (req, res) {
    var disconnect = false;
    for (var i = 0; i < auths.length; i++) {
        if (auths[i] === req.query.email) {
            auths.splice(i, 1);
            disconnect = true;
        }
    }
    if (disconnect) {
        res.json({ status: "success", message: disconnect });
    }
    else {
        res.json({ status: "failed", message: disconnect });
    }
});
app.get('/api/addMetrics', function (req, res) {
    var missingParams = false;
    var nonAuth = true;
    if (!req.body.email || !req.body.value || !req.body.timestamp) {
        missingParams = true;
    }
    else {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === req.body.email) {
                for (var j = 0; j < auths.length; j++) {
                    if (auths[j] == users[i].email) {
                        nonAuth = false;
                        break;
                    }
                }
                if (!nonAuth) {
                    users[i].addMetrics(req.body.value, req.body.timestamp);
                }
            }
        }
    }
    if (missingParams) {
        res.json({
            status: "failed",
            message: "Parameters are missing"
        });
    }
    else if (nonAuth) {
        res.json({
            status: "failed",
            message: "Email provided does not correspond to an authed user."
        });
    }
    else {
        res.json({
            status: "success",
            message: "Timestamp successfully added to user"
        });
    }
});
// Handles any requests that don't match the ones above
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(port);
console.log('App is listening on port ' + port);
module.exports = app;
