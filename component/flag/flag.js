import React from 'react';
import { Provider, observer } from 'mobx-react';

import HeaderPanel from './components/flag/HeaderPanel';
import BodyPanel from './components/flag/BodyPanel';
import flagStore from './flagStore';

import FlagContext from '../../component/flag/context';

@observer
class Flag extends React.Component {
    render() {
        //const Store = new flagStore();
        return (
            <FlagContext.Consumer>
                {data => (<Provider flagStore={new flagStore({userName: data.userName})}>
                    <React.Fragment>
                        <HeaderPanel />
                        <BodyPanel originData={data.data}/>
                    </React.Fragment>
                </Provider>)}
            </FlagContext.Consumer>
        )
    }
}
export default Flag;