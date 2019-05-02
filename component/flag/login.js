import React from 'react';
import { observer } from 'mobx-react';
import Login from '../flag/components/login';

@observer
class LoginRoute extends React.Component {
    render() {
        return (
            <Login />
        )
    }
}

export default LoginRoute;