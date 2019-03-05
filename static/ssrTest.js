import React, {Component} from 'react';
import ReactDom from 'react-dom';
const mountNode = document.getElementById('main');
import TestCom from '../component/ssrCom';

ReactDom.hydrate((
    <TestCom />
),mountNode);
export default TestCom;