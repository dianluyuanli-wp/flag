class Api {
    constructor() {
        this.apiDomain = '';
    }
    get(name) {
        //const apiDomain = 'http://localhost:3000/api/';
        //const apiDomain = 'http://g.w.com:3000/';
        const apiDomain = 'http://149.129.83.246/api/';
        const hostObject = {
            animal: {
                api: apiDomain + '123',
                nickName: '动物接口测试'
            },
            addOrUpdateTemplate: {
                api: apiDomain + 'addOrUpdateTemplate',
                nickName: '新增或更新模板'
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
            },
            addUser: {
                api: apiDomain + 'addUser',
                nickName: '添加用户'
            },
            verify: {
                api: apiDomain + 'verify',
                nickName: '验证用户'
            }
        }
        return hostObject[name] && hostObject[name].api;
    }
}

export default new Api();