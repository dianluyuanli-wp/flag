import React, {Component} from 'react';
import ReactDom from 'react-dom';
const mountNode = document.getElementById('main');
import TestCom from '../component/ssrCom';

ReactDom.hydrate((
    <TestCom />
),mountNode);
// const TestCom = () => {
//     return (<div>后端渲染测试</div>)
// }
// export default TestCom;