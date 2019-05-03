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
let ownTool = require('xiaohuli-package');
import { writeCookie, parseCookie } from '@tools';

const renderFunction = async () => {
    const currentRoute = /(?<=\/).*(?=.html)/g.exec(window.location.pathname)[0];

    console.log(currentRoute);
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
    let latestRecord = '';

    //  获取模板
    const getData = async() => {
        data = await network.post('readTemplate', {
            templateName: '模板'
        },{});
        if (data === 'not found') {
            data = {};
        }
    }
    const getRecord = async() => {
        latestRecord = await network.get('recentRecord', {}, {});
    }
    
    await Promise.all([getData(), getRecord()]);
    if (latestRecord[latestRecord.length -1]?.date ===  ownTool.getYearMonthDate()) {
        data.flagArray = latestRecord[latestRecord.length -1].flagArray;
        data.isMarked = true;
    } else {
        //  如果没有打卡记录，根据模板生成全false的记录
        let targetTemplate = data.templateArray.filter(item => item.name === data.preferTemplate)[0];
        data.flagArray = targetTemplate.itemArray.map(item => ({name: item, value: false}));
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
