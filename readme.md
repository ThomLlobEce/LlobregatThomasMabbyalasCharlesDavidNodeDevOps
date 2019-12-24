
# NODEJS  X DEVOPS PROJECT

## Description

This is a student project illustrating the courses we had at ECE Paris engineering school in NodeJS & DevOps.
The project consists in a full-stack website using both NodeJS & React JS.

List of current availables features :
-  [x] Sign in
-  [x] Sign up
-  [x] Disconnect
-  [x] An only signed in users page

**To run the project paste the following lines into your node.js prompt from** `./`

    cd client
    npm install
    npm run build
    cd ..
    npm install
    npm start
    
**To run the project again, please use only** `npm start` **from** `./` **and go to http://localhost:5000/**

## API DOCUMENTATION

-  **/api/signIn : Try to sign a user in.**
	- Method: get
	- Required params : email, password
	- Return :
		- { status: "success", message: user } if the user could be signed in (user is object with keys name, firstName, email & password)
		- { status: "failed", message: "Already signed in" } if the user is already signed in
		- { status: "failed", message: "error" } if any uncaughted error occured

-  **/api/createUser : Try to create a user.**
	- Method: post
	- Required params : last_name, first_name, email, password
	- Return :
		- { status: "failed", message: "Email already exists" } if an user with the same email address already exists
		- { status: "failed", message: "Missing parameters" } if at least 1 parameter is missing
		- { status: "success", message: "User added" } if the user has successfully been created

-  **/api/isAuth : Check whether or not a specific user is signed in.**
	- Method: get
	- Required params : email
	- Return :
		- { status: "success", message: auth } if email provided matchs an authenticated user (auth is boolean)
		- { status: "failed", message: auth } if email provided does not match any authenticated user (auth is boolean)

-  **/api/disconnect : Check whether or not a specific user is signed in.**
	- Method: get
	- Required params : email
	- Return :
		- { status: "success", message: disconnect } if email provided matchs an authenticated user and that user has successfuly been disconnected (disconnect is boolean)
		- { status: "failed", message: disconnect }  if email provided does not match any authenticated user (disconnect is boolean)

-  **/api/addMetrics : Add a metrics to a signed in user**
	- Method: get
	- Required params : email, timestamp, value
	- Return :
		- { status: "failed", message: "Parameters are missing" } if at least 1 parameter is missing
		- { status: "failed", message: "Email provided does not correspond to an authed user." } if email provided does not match any signed in user
		- { status: "success", message: "Timestamp successfully added to user" } Return successful message 

-  **/api/getMetrics : Get all metrics from a signed in user**
	- Method: get
	- Required params : email
	- Return :
		- { status: "failed", message: "Parameters are missing" } if at least 1 parameter is missing
		- { status: "failed", message: "Email provided does not correspond to an authed user." } if email provided does not match any signed in user
		- { status: "success", message: response } Return all the metrics of the user 

## You want to modify client-side ?
In order for your changes to show when using `npm start` in `./` you will need to run before the following command in `./` client : `npm run build` and then in `./` use `npm start`.
  

## Continues Integration (CI) with Travis CI
[![Build Status](https://travis-ci.com/ThomLlobEce/LlobregatThomasMabbyalasCharlesDavidGregoireVictorNodeDevOps.svg?branch=master)](https://travis-ci.com/ThomLlobEce/LlobregatThomasMabbyalasCharlesDavidGregoireVictorNodeDevOps)

## Support

You can contact the following person for any question :
* Llobregat Thomas : thomas.llobregat@edu.ece.fr
* Mabbyalas Charles David : charlesdavid.mabbyalas@edu.ece.fr
* Grégoire victor : victore.grégoir@edu.ece.fr

## Contributors

Please check the wiki pages on https://github.com/ThomLlobEce/LlobregatThomasMabbyalasCharlesDavidNodeDevOps/wiki to see contributors.
  
## License

[MIT](https://choosealicense.com/licenses/mit/)
