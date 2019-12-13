import React, { Component } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';

class App extends Component {

    render()
    {
        if(this.props.user !== false){
            return(
                <div>
                    <NavBar logged={true} disconnect={this.props.disconnect} />
                    <div style={styles.inscription}>
                        
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <NavBar logged={false} />
                    <div style={styles.inscription}>
                        <h1 style={styles.back_button}>You are not logged in. <Link to = {'/signin'} style={{color: 'blue'}}>Please sign in</Link> or <Link to="/" style={{color: 'blue'}}>create an account</Link></h1>
                    </div>
                </div>
            );
        }
        
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
