import React, { Component } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import axios from 'axios'

// Dashboard view
class Account extends Component {

    state = {
        readyToRender: false, // false while fetching API data, true when ready to render
        logged: false // Wether there is a logged user
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
                                    {/** Logged content */}
                                    <NavBar logged={true} disconnect={this.props.disconnect} />
                                    <h1 style={styles.back_button}>You are logged in. </h1>
                                </div>
                                : 
                                <div>
                                    <NavBar logged={false} />
                                    <div style={styles.inscription}>
                                        {/** Unlogged content */}
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
    }
}
