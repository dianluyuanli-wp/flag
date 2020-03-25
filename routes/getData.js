import network from '@network';
import ownTool from 'xiaohuli-package';
import { writeCookie, parseCookie, parseCookieObjToString } from '@tools';

const getFlagData = async(cookie) => {
    let data = [];
    let latestRecord = '';

    //  获取模板
    const getCookieForServer = cookie ? {cookie: parseCookieObjToString(cookie)} : {};
    const getData = async() => {
        data = await network.post('readTemplate', {
            templateName: '模板'
        },getCookieForServer);
        if (data === 'not found') {
            data = {
                templateArray: [],
                preferTemplate: ''
            };
        }
        return data;
    }
    const getRecord = async() => {
        latestRecord = await network.get('recentRecord', {}, getCookieForServer);
        return latestRecord;
    }
    
    const ans = await Promise.all([getData(), getRecord()]);
    console.log(ans);
    if (latestRecord[latestRecord.length -1]?.date ===  ownTool.getYearMonthDate()) {
        data.flagArray = latestRecord[latestRecord.length -1].flagArray;
        data.isMarked = true;
    } else {
        //  如果没有打卡记录，根据模板生成全false的记录
        let targetTemplate = data.templateArray.filter(item => item.name === data.preferTemplate)[0] || {itemArray: []};
        data.flagArray = targetTemplate.itemArray.map(item => ({name: item, value: false}));
    }
    data.record = latestRecord;
    return {
        data: data,
        userName: cookie?.userName || parseCookie().userName
    };
}

export default {
    flag: getFlagData,
    login: () => ({}),
    register: () => ({})
}