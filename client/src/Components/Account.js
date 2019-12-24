import React, { Component } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import {PieChart } from 'react-chartkick'
import 'chart.js'
import axios from 'axios'

// Dashboard view
class Account extends Component {

    state = {
        readyToRender: false, // false while fetching API data, true when ready to render
        logged: false, // Wether there is a logged user
        value: 0,
        message: '',
        metrics: [],
        timestamp: '',
        reddit: false,
        data: []
    }

    // Trying to know if the client user is authed on server-side
    content = async () => {
        await axios.get(
            '/api/isAuth?email='+this.props.user.email
        )
        .then( (res) => {
            if(res.data.message === true){
                this.setState({readyToRender: true, logged: true})
            }
            else{
                
                this.setState({readyToRender: true})
            }
        })
        .catch(error => {
            this.setState({readyToRender: true})
            console.log(error)
        })
    }

    addMetrics = async () => {
        await axios.get(
            '/api/addMetrics?email='+this.props.user.email+'&value='+this.state.value+'&timestamp='+(new Date),
        )
        .then( (res) => {
            this.setState({message: res.data.message})
            this.getMetrics()
        })
    }

    deleteMetrics = async () => {
        this.setState({reddit:false})
        await axios.get(
            '/api/deleteMetrics?email='+this.props.user.email+'&timestamp='+this.state.timestamp,
        )
        .then( (res) => {
            this.setState({message: res.data.message})
            this.getMetrics()
        })
    }

    getMetrics = async () => {
        await axios.get(
            '/api/getMetrics?email='+this.props.user.email
        )
        .then( (res) => {
            this.state.metrics = res.data.message
            this.forceUpdate(() => {console.log(this.state.metrics)})
            this.setState({reddit:true})
            this.getData()
        })
    }

    getData = () => {
        let ret = []
        let temp = []
        for(let i = 0; i < this.state.metrics.length; i++){
            temp.push(this.state.metrics[i].time)
            temp.push(parseInt(this.state.metrics[i].value, 10) + 1)
            ret.push(temp)
            temp = []
        }

        this.setState({data: ret})
    }

    render()
    {
        this.content()
        return(
            <div>

                <div style={styles.inscription}>
                    { 
                        this.state.readyToRender ?
                        this.state.logged ? 
                            <div>
                                <div>
                                <NavBar logged={true} disconnect={this.props.disconnect} />
                                    <div style={styles.formulaire}>
                                    <label style={styles.legend}><span style={styles.number}>1</span> Timestamp</label>
                                    <br/>
                                    <br/>
                                    <input type="text" placeholder="value" style={styles.textArea} value={this.state.value} onChange = {(event) => {this.setState({value: event.target.value})}}/>
                                    <button onClick={this.addMetrics} style={styles.submitButton}>Send</button> 
                                    <input type="text" placeholder="Tue Dec 24 2019 18:14:53 GMT 0100 (heure normale d’Europe centrale)" style={styles.textArea} value={this.state.timestamp} onChange = {(event) => {this.setState({timestamp: event.target.value})}}/>
                                    <button onClick={this.deleteMetrics} style={styles.submitButton}>Delete</button>
                                    {this.state.message}
                                    <br />
                                    <label>Metrics : </label><br />
                                    {
                                    this.state.reddit ? 
                                        <div>
                                        <ul>
                                        {
                                           this.state.metrics.map( (d, idx) => { console.log(this.state.metrics  )
                                          return (
                                            <li key={idx}>{d.time + ": " + d.value}
                                            </li>)
                                          })
                                        }
                                        </ul>
                                          
                                         <PieChart data={this.state.data} />
                                        </div> : null
                                    }
                                        
                                    </div>
                                </div>
                            </div>
                            : 
                            <div>
                                <NavBar logged={false} />
                                <div style={styles.inscription}>
                                    <h1 style={styles.back_button}>You are not logged in. <Link to = {'/signin'} style={{color: 'blue'}}>Please sign in</Link> or <Link to="/" style={{color: 'blue'}}>create an account</Link></h1>
                                </div>
                            </div>
                            : 
                            null
                    }
                </div>
            </div>)
    }
}

export default Account;

const styles = {

    inscription: {
        width: '100%',
        height: '110vh',
        display: 'flex',
        backgroundImage: "url(http://www.corentin-bechet.com/wp-content/uploads/2015/01/RESULTAT-PARTICLES-BACKGROUND-BLENDER.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
    },
    back_button: {
        position: 'absolute',
        width: 300,
        height: 50,
        left: '50%',
        top: '45%',
        border: 'none',
	    padding: 6,
	    borderRadius: 8,
	    background: '#109177',
	    font: 'bold 13px Arial',
        color: '#fff',
        transform: "translate(-50%, -50%)"   
    },
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
}
