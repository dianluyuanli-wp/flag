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

const getData = async () => {
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
    return data;
}

router.get('/', async function(req, res, next) {
  const url = req._parsedOriginalUrl.path;
  let ans = await getData();
  let instance = React.createElement(() => ServerEntry.default(ans, url), null, 'ddd');
  const appString = ReactSSR.renderToString(instance);  //  后端渲染测试

  res.send(template.replace('<app></app>',appString));

  //前端渲染

  //res.render('home', { content: 'Express' });
  //res.render('new', { content: 'Express' });
  // res.send('ddddddddddddddddddddssssssssssssss');
});

module.exports = router;

