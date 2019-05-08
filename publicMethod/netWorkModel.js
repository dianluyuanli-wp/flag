import {apiRequest  as fetchData } from './fetchData';
import apiMap from '../maps/api';

let apiRequestModel = class Model {
    constructor(options) {
        this.name = options.name || '';
        this.path = options.path;
        this.params = options.params || {};
        this.nodeCookie = options.cookie || '';
    }

    dealPath() {
        this.path = this.path || apiMap.get(this.name) || '';
    }

    requestData(method) {
        this.dealPath();
        const me = this;

        if (method === 'GET') {
            const params = [];
            for (const key in me.params) {
                if (me.params.hasOwnProperty(key)) {
                    params.push([key, me.params[key]].join('='));
                }
            }
            if (params.length) {
                if (me.path.indexOf('?') !== -1) {
                    me.path = [me.path, params.join('&')].join('&');
                } else {
                    me.path = [me.path, params.join('&')].join('?');
                }
            }
            me.params = null;
        }
        const promise = new Promise(function (resolve, reject) {
            fetchData(method, me.path, me.params, function (data) {
                resolve(data);
            }, function (errorCode, data) {
                reject({
                    errorCode,
                    data
                });
            }, me.nodeCookie);
        });
        return promise;
    }
}

export default apiRequestModel;