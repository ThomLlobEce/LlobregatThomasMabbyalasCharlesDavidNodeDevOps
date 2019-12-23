import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home  from "./Components/Home";
import SignIn  from "./Components/SignIn";
import Account from './Components/Account'
import axios from 'axios'

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: false // Contains informations of a logged user
        }
    }

    // Update user state
    addUser = (user) => {
        this.setState({user: user})
    }

    // Update user state if API disconnection call succeed.
    disconnect = async () => {
        await axios.get(
            '/api/disconnect?email='+this.state.user.email
        )
        .then( (res) => {
            if(res.data.message === true){
                this.setState({user: false})
            }
        })
    }

    render()
    {
        return(
            <div className="App" style={{margin: -10}}>
                <div className="App-content">
                    <Router>
                        <Switch>
                            {/** Default route : render home component */}
                            <Route exact path="/" component={Home} />
                            {/** /signin route : render signIn component */}
                            <Route exact path='/signin' render={(props) => <SignIn {...props} addUser={this.addUser} />}/>
                            {/** /dashboard route : render dashboard component */}
                            <Route exact path='/dashboard' render={(props) => <Account {...props} user={this.state.user} disconnect={this.disconnect} />}/>
                        </Switch>
                    </Router>
                </div>
                
            </div>
        );
    }
}

export default App;