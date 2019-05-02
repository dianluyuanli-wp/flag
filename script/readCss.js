let fs = require('fs');
const util = require('util');
const readAsync = util.promisify(fs.readFile);

//  将打包的文件写入模板，自动生成html
const action = async() => {
    let cssName = []; 
    let jsName = [];
    await fs.readdir('dist', (err, data) => {
        cssName = data.filter(item => /.*(.css)$/g.test(item));
        //jsName = data.filter(item => /.*(.js)$/g.test(item));
    });
    let sss = (await readAsync('views/new.html')).toString();
    let cssString = (await readAsync('dist/serverDom.css'));
    // sss = sss.replace('<linkArea></linkArea>', cssName.map(item => `<link rel="stylesheet" href="${item}" >`).join('\r\n'));
    sss = sss.replace(/(?<=<style>).*(?=<\/style>)/g, cssString + 'html {font-size: 26.66667vw;}');
    fs.writeFile('views/newSSR.html', sss, (err) => {
        if(err) {
            console.log(err);
        }
    })
}

action();