import netWorkModel from '../publicMethod/netWorkModel';

const requestModel = {
    request(name = '', params = {}, opts = {}, method = 'GET') {
        opts.name = name;
        opts.params = params;
        const model = new netWorkModel(opts);

        return model.requestData(method);
    },

    get(name, params, opts) {
        return this.request(name, params, opts, 'GET');
    },
    post(name, params, opts) {
        return this. request(name,params, opts, 'POST');
    }
}

export default requestModel;