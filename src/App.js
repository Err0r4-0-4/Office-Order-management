import React, {Component} from 'react';
import Home from './Container/Home/Home';
import Auth from './Container/Auth/Auth'

class App extends Component{

    render() {

        return(
            <div>
              <Auth/>
                {/* <Home /> */}
            </div>
        )
    }
}

export default App;
