import React from 'react';
import ReactDom from 'react-dom';
import Flag from '../component/flag';
import FlagContext from '../component/flag/context';
import network from '@network';
import ownTool from 'xiaohuli-package';
import { writeCookie, parseCookie } from '@tools';

import getDataMap from '../routes/getData';

const renderFunction = async () => {
    const currentRoute = /(?<=\/).*(?=.html)/g.exec(window.location.pathname)[0];

    //  登录验证
    if(currentRoute === 'flag' && !await verifyLogin()) {
        window.location.href='/login.html'
    }

    //  挂载组件
    const mountNode = document.getElementById('main');
    // 重新拉接口
    //const data = await getDataMap[currentRoute]();

    //  直接读后端渲染内容
    const data = JSON.parse(window.__data);
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

if (module.hot) {
    // 模块自己就接收更新
    module.hot.accept();
}

renderFunction();
