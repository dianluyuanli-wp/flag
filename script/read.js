let fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);

//  将打包的文件写入模板，自动生成html
const action = async() => {
    let cssName = []; 
    let jsName = [];
    let originUrl = ['<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>',
    '<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>'];
    await fs.readdir('dist', (err, data) => {
        cssName = data.filter(item => /.*(.css)$/g.test(item));
        jsName = data.filter(item => /.*(.js)$/g.test(item)).filter(item => item !== 'serverDom.bundle.js');
    });
    let sss = (await readAsync('script/ssrTemplate.html')).toString();
    sss = sss.replace('<linkArea></linkArea>', cssName.map(item => `<link rel="stylesheet" href="${item}" >`).join('\r\n'));
    sss = sss.replace('<jsArea></jsArea>', originUrl.concat(jsName.map(item => `<script src="${item}" type="text/javascript"></script>`)).join('\r\n'));
    fs.writeFile('views/new.html', sss, (err) => {
        if(err) {
            console.log(err);
        }
    })
}

action();

