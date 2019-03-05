import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'mobx-react';
import SecondCom from '../component/secondCom';

const mountNode = document.getElementById('second');
ReactDom.render((
    <Provider>
        <SecondCom />
    </Provider>
    // <div>wangpei</div>
),mountNode);