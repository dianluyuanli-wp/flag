import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import { Route, Router } from 'react-router-dom';
//import { createMemoryHistory } from 'history';

import Flag from './components/flag/index';
import Login from './components/login';
import Register from './components/register';

//history={history}
//const history = createMemoryHistory();
class AppRouter extends Component {    
    render() {
        const isNode = typeof window === 'undefined'; 
        const serverRoute = {
            '/flag.html': <Flag />,
            '/login.html': <Login />,
            '/register.html': <Register />
        }
        return (
            <React.Fragment>
                {isNode ? 
                    serverRoute[this.props.url] : 
                    <Router>
                        <React.Fragment>
                            <Route path='/flag.html' component={Flag} />
                            <Route path='/login.html' component={Login} />
                            <Route path='/register.html' component={Register} />
                        </React.Fragment>
                    </Router>
                }
            </React.Fragment>
        )
    }
}

export default AppRouter;