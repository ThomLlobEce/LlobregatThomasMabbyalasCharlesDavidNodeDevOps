import React, { Component } from 'react';
import Home  from "./Components/Home";
import SignIn  from "./Components/SignIn";

class App extends Component {

    render()
    {
        return(
            <div className="App" style={{margin: -10}}>
                <div className="App-content">
                    <SignIn />
                </div>
                
            </div>
        );
    }
}

export default App;