var express = require('express');
var router = express.Router();
const ReactSSR = require('react-dom/server');
const path = require('path');

const ServerEntry = require('../dist/serverDom.bundle.js');

const React = require('react');

const fs = require('fs');

const network = require('../dist/serverDom.bundle.js').network;

// 读取模板的内容出来

const template = fs.readFileSync(path.join(__dirname,'../views/newSSR.html'),'utf8');

/* GET home page. */

router.get('/', async function(req, res, next) {
//   //入口文件位置 ./static/serverEntry.js    
//   const url = req._parsedOriginalUrl.path;
//   let ans = await getData();
//   let instance = React.createElement(() => ServerEntry.default(ans, url), null, 'ddd');
//   const appString = ReactSSR.renderToString(instance);  //  后端渲染测试

//   res.send(template.replace('<app></app>',appString));

//前端渲染
//入口文件位置 ./static/ComRender.js 

  res.render('newSSR', { content: 'Express' });
});

module.exports = router;

