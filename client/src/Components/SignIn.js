import React, { Component } from 'react';
import FormSignIn from './FormSignIn'
import NavBar from './NavBar';


class SignIn extends Component {

    render()
    {
        return(
            <div>
                <NavBar logged={false} />
                <div style={styles.connexion}>
                    <FormSignIn style={{zIndex: 2}} addUser={this.props.addUser}/>
                </div>
            </div>
        )
    }
}

export default SignIn;


const styles = {
    connexion: {
        width: '100%',
        height: '110vh',
        display: 'flex',
        backgroundImage: "url(http://www.corentin-bechet.com/wp-content/uploads/2015/01/RESULTAT-PARTICLES-BACKGROUND-BLENDER.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 1
    },
    connexion_button: {
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
