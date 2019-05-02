import React from 'react';
import { observer } from 'mobx-react';
import Register from '../flag/components/register';

@observer
class LoginRoute extends React.Component {
    render() {
        return (
            <Register />
        )
    }
}

export default LoginRoute;