import React from 'react';
import ReactDom from 'react-dom';
//import { Provider } from 'mobx-react';
//import FirstCom from '../component/firstCom';
//import { cube } from './test.js';
//import FirstComStore from '../component/firstCom/store';
//import appStore from './appStore.js';
import Flag from '../component/flag';
import FlagContext from '../component/flag/context';
import network from '../utils/network';
import WeatherApp from '../component/WeatherApp';
import {TestContext} from '../component/WeatherApp/context';

const renderFunction = async () => {
    let data = [];
    let marked = '';
    let latestRecord = '';
    const getData = async() => {
        data = await network.post('readTemplate', {
            templateName: '模板'
        },{});
    }
    const getMark = async() => {
        marked = await network.get('isMarked', {}, {});
        console.log(marked)
    }

    const getRecord = async() => {
        latestRecord = await network.get('recentRecord', {}, {});
        console.log(latestRecord, 'record')
    }
    
    await Promise.all([getData(), getMark(), getRecord()]);
    if (marked.length > 0) {
        data.flagArray = marked[0].flagArray;
        console.log(marked, 'dddddddd');
        data.isMarked = true;
    } else {
        console.log('here!!!!');
        data.flagArray.map(item => {item.value = false; return item});
    }
    data.record = latestRecord;
    const mountNode = document.getElementById('main');
    ReactDom.render((
        // <TestContext.Provider>
        //     <WeatherApp />
        // </TestContext.Provider>
        <FlagContext.Provider value={data}>
            <Flag />
        </FlagContext.Provider>
    ),mountNode);
}

if (module.hot) {
    // 模块自己就接收更新
    module.hot.accept();
}

renderFunction();
