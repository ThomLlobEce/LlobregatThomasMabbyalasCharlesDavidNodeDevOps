import React, { Component } from 'react';
import Home  from "./Components/Home";

class App extends Component {

    render()
    {
        return(
            <div className="App" style={{margin: -10}}>
                <div className="App-content">
                    <Home />
                </div>
                
            </div>
        );
    }
}

export default App;