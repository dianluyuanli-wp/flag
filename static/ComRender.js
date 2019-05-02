import React from 'react';
import ReactDom from 'react-dom';
//import { Provider } from 'mobx-react';
//import FirstCom from '../component/firstCom';
//import { cube } from './test.js';
//import FirstComStore from '../component/firstCom/store';
//import appStore from './appStore.js';
import Flag from '../component/flag';
import FlagContext from '../component/flag/context';
import network from '@network';
import { writeCookie, parseCookie } from '@tools';

const renderFunction = async () => {
    const currentRoute = /(?<=\/).*(?=.html)/g.exec(window.location.pathname)[0];

    //  登录验证
    if(currentRoute === 'flag' && !await verifyLogin()) {
        window.location.href='/login.html'
    }

    //  获取数据
    const dataFucMap = {
        flag: getFlagData,
        login: () => ({}),
        register: () => ({})
    }

    //  挂载组件
    const mountNode = document.getElementById('main');
    const data = await dataFucMap[currentRoute]();
    ReactDom.render((
        <FlagContext.Provider value={data}>
            <Flag />
        </FlagContext.Provider>
    ),mountNode);
}

const verifyLogin = async () => {
    const cookie = parseCookie();
    const res = await network.post('verify', {
        userName: cookie.userName,
        passWord: cookie.password
    },{});
    if (res === 'verified') {
        return true;
    } else {
        return false;
    }
}

const getFlagData = async() => {
    let data = [];
    let marked = '';
    let latestRecord = '';
    //  获取模板
    const getData = async() => {
        data = await network.post('readTemplate', {
            templateName: '模板'
        },{});
        if (data === 'not found') {
            data = {};
        }
        console.log(data,'dataaaaaaaaaaaaa')
    }
    //  获取今日打卡记录
    const getMark = async() => {
        marked = await network.get('isMarked', {}, {});
        console.log(marked)
    }
    //  获取最近几日的打卡记录
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
        //  如果没有打卡记录，根据模板生成全false的记录
        console.log('here!!!!');
        data.flagArray.map(item => {item.value = false; return item});
    }
    data.record = latestRecord;
    return {
        data: data,
        userName: parseCookie().userName
    };
}



if (module.hot) {
    // 模块自己就接收更新
    module.hot.accept();
}

renderFunction();
