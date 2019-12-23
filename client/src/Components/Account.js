import React, { Component } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import axios from 'axios'

class App extends Component {

    state = {
        readyToRender: false,
        logged: false,
        value: 0,
        timestamp: ""
    }

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
                                <NavBar logged={true} disconnect={this.props.disconnect} />
                                <h1 style={styles.back_button}>You are logged in. </h1>
                                    <div style={styles.formulaire}>
                                        <button onClick={this.props.toggleSignUp} style={styles.cross}>X</button>
                                        <label style={styles.legend}><span style={styles.number}>1</span> Identité</label>
                                        <br/>
                                        <br/>
                                        <input type="text" placeholder="timestamp" style={styles.textArea} value={this.state.timestamp} onChange = {(event) => {this.setState({timestamp: event.target.value})}}/>
                                        <input type="text" placeholder="value" style={styles.textArea} value={this.state.value} onChange = {(event) => {this.setState({value: event.target.value})}}/>
                                        <button onClick={this.addMetrics} style={styles.submitButton}>Envoyer</button> 
                                    { /* addMetrics n'est pas encore codé */}
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

export default App;

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
    }
}
