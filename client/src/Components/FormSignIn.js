import React, { Component } from 'react';
import axios from 'axios'
import { Redirect, Link} from 'react-router-dom'

export default class FormSignIn extends Component {

    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: "",
            error: ["", ""],
            redirect: false
        }

    }

    // Trying to sign in with provided informations from form.
    signIn = async () => {

        // Verifying fields
        this.state.error = ["", ""]

        if(this.state.email === ""){
            this.state.error[0] = "This fields is empty."
        }
        if(this.state.password === ""){
            this.state.error[1] = "This fields is empty."
        }

        this.forceUpdate()

        if(this.state.error[0] === "" && this.state.error[1] === "" ){
            // Informations provided are well-formated
            // Using signIn API
            await axios.get(
                '/api/signIn?email='+this.state.email+'&password='+this.state.password,
            )
            .then( (res) => {
                console.log(res.data.message)
                if(res.data.message.name){
                    // User signed in, updating client data and ordering a redirect
                    this.props.addUser(res.data.message)
                    this.setState({redirect: true})
                }
                else if(res.data.message === "Already signed in"){
                    this.state.error[0] = "You are alreayd signed in"
                    this.forceUpdate()
                }
                else{
                    this.state.error[0] = "Sorry, we can't logged you in with provided informations"
                    this.forceUpdate()
                }
            })
        }else{
            console.log("Unable to sign up. Data is not correctly formatted.")
        }

    }

    render()
    {
        return(
            <div>
                { // if a redirect is required, not rendering this component. 
                this.state.redirect ? <Redirect to='/dashboard'/> : null
                }
                <div style={styles.formulaire}>
                    <label style={styles.legend}><span style={styles.number}></span> Informations </label>
                    <br/>
                    <br/>
                    <input type="text" placeholder="Email" style={styles.textArea} value={this.state.email} onChange = {(event) => {this.setState({email: event.target.value})}}/>
                    {this.state.error[0] !== "" ?  (<div style={{color: 'red'}}>{this.state.error[0]}<br /></div>) : (<br />)}
                    <br/>
                    <br/>
                    <input type="password" placeholder="Mot de passe" style={styles.textArea} value={this.state.password} onChange = {(event) => {this.setState({password: event.target.value})}}/>
                    {this.state.error[1] !== "" ?  (<div style={{color: 'red'}}>{this.state.error[1]}<br /></div>) : (<br />)}
                    <br/>< br/>
                    <button onClick={this.signIn} style={styles.submitButton}>Send</button>
                    No account yet ? <Link to = "/" style={{color: "blue"}} >Sign up now !</Link>
                </div>
            </div>
        );
    }
}

const styles = {

    formulaire: {
        width: 400,
        left: '50%',
        top: '50%',
        position: 'absolute',
        zIndex: 2,
    	padding: 20,
    	backgroundColor: '#f4f7f8',
    	margin: 10,
    	borderRadius: 8,
    	fontFamily: "Georgia",
        transform: "translate(-50%, -50%)"
    },

    number:{
        background: '#1abc9c',
    	color: '#FFF',
    	height: 30,
    	width: 30,
    	display: 'inline-block',
    	fontSize: 18,
    	lineHeight: 1.2,
    	textAlign: 'center',
    	textShadow: 'rgba(255,255,255,0.2)',
    	borderRadius: 15,
    },

    legend:{
        fontSize: 20,
        color: '#1abc9c',
    },

    textArea: {
        fontFamily: "Georgia",
    	background: "rgba(255,255,255,.1)",
    	border: "none",
    	borderRadius: 4,
    	fontSize: 12,
    	margin: 0,
    	outline: 0,
    	padding: 10,
    	width: '100%',
    	boxSizing: 'border-box',
    	WebkitBoxSizing: 'border-box',
    	MozBoxSizing: 'border-box',
    	backgroundColor: '#e8eeef',
    	color: '#8a97a0',
    	WebkitBoxShadow: "rgba(0,0,0,0.03)",
        boxShadow: "rgba(0,0,0,0.03)",
        marginBottom: 5
    },

    submitButton: {
        position: 'relative',
	    display: 'block',
	    padding: '19px 39px 18px 39px',
        color: '#FFF',
        margin: 'auto',
        background: '#1abc9c',
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'normal',
        width: '100%',
        border: '1px solid #16a085',
        borderWidth: '1px 1px 3px',
        marginBottom: 10
    },

    cross: {
        position: 'absolute',
        top: 5,
        right: 5,
        border: "none",
        backgroundColor: '#f4f7f8',
    }

    }
