import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import flag from './flag';

class AppRouter extends Component {    
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route path='/flag.html' component={flag} />
                </React.Fragment>
            </Router>
        )
    }
}

export default AppRouter;