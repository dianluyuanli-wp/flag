import React, {Component} from 'react';
// import InterFace from './interface';
import user from './user';
import flag from '../flag';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class AppRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                <Route path='/user.html/' component={user}></Route>
                <Route path='/flag.html' component={flag} />
                {/* <Route path='/index.html/' extract component={InterFace}></Route> */}
                </div>
            </Router>
            // <div>here</div>
            // <InterFace />
        )
    }
}

export default AppRouter;