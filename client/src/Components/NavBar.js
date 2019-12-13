import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/logo.png'

export default class NavBar extends Component {

    render()
    {
        return(
            <div style={styles.nav}>
                <Link to = {"/"}>
                    <img src={logo} height={"100%"} style={{marginLeft: 30}} alt={"Logo"}/>
                </Link>
                {
                    this.props.logged ? 
                    (
                        <Link to = {"/"}>
                            <button style={styles.connexion_button}>Déconnexion</button>
                        </Link>
                    ) :
                    (
                        <Link to ={"/signin"}>
                           <button style={styles.connexion_button}>Connexion</button>
                        </Link>
                    )
                }   
            </div>
        )
    }
}

const styles = {
    nav: {
        backgroundColor: '#1abc9c',
        width: '100%',
        height: 75,
        top: 0,
        position: 'fixed',
        zIndex: 4
    },
    connexion_button: {
        backgroundColor: '#1abc9c',
        height: 40,
        width: 150,
        border: '2px solid black',
        font: 'bold 17px Arial',
        borderRadius: '10px',
        position: 'absolute',
        right: 0,
        top: 37,
        transform: "translate(-50%, -50%)"
    }
}
