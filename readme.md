
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
    
**To run the project again, you simply use** `npm start` **from** `./`
## API DOCUMENTATION

-  **/api/signIn : Try to sign a user in.**
	- Method: get
	- Needed params : email, password
	- Return :
		- false if the user could not be signed in
		- {name: , firstName: , email: , password: } if the user could be signed in

-  **/api/createUser : Try to create a user.**
	- Method: post
	- Needed params : last_name, first_name, email, password
	- Return :
		- "Email already exists" if a user with same email already exist
		- "User added" if the user has successfully been added

-  **/api/isAuth : Check whether or not a specific user is signed in.**
	- Method: get
	- Needed params : email
	- Return :
		- true if the user with provided email is signed in
		- false if the user with provided email is signed in


## You want to modify the project ?
In order for your changes to show when using `npm start` in `./` you will need to run before the following command in `./` client : `npm run build` and then in `./` use `npm start`.
  

## Continues Integration (CI) with Travis CI
[![Build Status](https://travis-ci.com/ThomLlobEce/LlobregatThomasMabbyalasCharlesDavidNodeDevOps.svg?branch=master)](https://travis-ci.com/ThomLlobEce/LlobregatThomasMabbyalasCharlesDavidNodeDevOps)

## Support

You can contact the following person for any question :
* Llobregat Thomas : thomas.llobregat@edu.ece.fr
* Mabbyalas Charles David : charlesdavid.mabbyalas@edu.ece.fr

## Contributors

Please check the wiki pages on https://github.com/ThomLlobEce/LlobregatThomasMabbyalasCharlesDavidNodeDevOps/wiki to see contributors.
  
## License

[MIT](https://choosealicense.com/licenses/mit/)
