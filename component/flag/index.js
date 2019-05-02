import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import { Route, Router } from 'react-router-dom';
//import { createMemoryHistory } from 'history';

import Flag from './flag';
import Login from './login';
import register from './register';

//history={history}
//const history = createMemoryHistory();
class AppRouter extends Component {    
    render() {
        const isNode = typeof window === 'undefined'; 
        return (
            <React.Fragment>
                {isNode ? 
                    <Flag /> : 
                    <Router>
                        <React.Fragment>
                            <Route path='/flag.html' component={Flag} />
                            <Route path='/login.html' component={Login} />
                            <Route path='/register.html' component={register} />
                        </React.Fragment>
                    </Router>
                }
            </React.Fragment>
        )
    }
}

export default AppRouter;