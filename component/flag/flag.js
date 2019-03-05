import React from 'react';
import { Provider, observer } from 'mobx-react';

import HeaderPanel from './components/HeaderPanel';
import BodyPanel from './components/BodyPanel';
import flagStore from './flagStore';

import FlagContext from '../../component/flag/context';

@observer
class Flag extends React.Component {
    getCheckoutBox = (array) => {
        return array.map((item, index) => {
            return <Checkbox key={index}>{item.name}</Checkbox>
        })
    }
    render() {
        //const Store = new flagStore({funcType: 'compile-panel'});
        const Store = new flagStore();
        return (
            <Provider flagStore={Store}>
                <React.Fragment>
                    <HeaderPanel />
                    <FlagContext.Consumer>
                        { data => (<BodyPanel originData={data}/>)}
                    </FlagContext.Consumer>
                </React.Fragment>
            </Provider>
        )
    }
}
export default Flag;