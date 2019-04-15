class Api {
    constructor() {
        this.apiDomain = '';
    }
    get(name) {
        //  const apiDomain = 'http://localhost:3000/';
        const apiDomain = 'https://cryptic-shelf-72241.herokuapp.com/';
        //const apiDomain = 'http://149.129.83.246:81/';
        const hostObject = {
            animal: {
                api: apiDomain + '123',
                nickName: '动物接口测试'
            },
            addTemplate: {
                api: apiDomain + 'addTemplate',
                nickName: '提交模板'
            },
            readTemplate: {
                api: apiDomain + 'readTemplate',
                nickName: '读取模板'
            },
            attendance: {
                api: apiDomain + 'attendance',
                nickName: '打卡接口'
            },
            isMarked: {
                api: apiDomain + 'isMarked',
                nickName: '是否打卡'
            },
            recentRecord: {
                api: apiDomain + 'recentRecord',
                nickName: '拉取最近记录'
            }
        }
        return hostObject[name] && hostObject[name].api;
    }
}

export default new Api();