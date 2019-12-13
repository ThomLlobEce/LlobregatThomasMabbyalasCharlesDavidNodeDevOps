const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

const PORT = 8800;

app.use(bodyParser.json())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT);

console.log('App is listening on port ' + PORT);