var express = require('express');
var router = express.Router();
const ReactSSR = require('react-dom/server');
const path = require('path');
//  const ServerEntry = require('../dist/serverDom.bundle.js');

const React = require('react');
//let instance = React.createElement('div', null, 'ddd');
// let instance = React.createElement(ServerEntry, null, 'ddd');
//console.log(instance, 'dddddddddddccccccccccc');
//onst ServerEntry = require('../component/ssrCom');
const fs = require('fs');


// class XXX extends react.Component {
//   render() {
//     return (
//       'ddddd'
//     )
//   }
// }

// 读取模板的内容出来
const template = fs.readFileSync(path.join(__dirname,'../views/home.html'),'utf8');
//console.log(template, 'template');

/* GET home page. */
router.get('/', function(req, res, next) {
  // const appString = ReactSSR.renderToString(instance);  //  后端渲染测试
  // res.send(template.replace('<app></app>',appString));
  // console.log(appString,'ssstring');

  res.render('home', { content: 'Express' });
  // res.send('ddddddddddddddddddddssssssssssssss');
});

module.exports = router;
