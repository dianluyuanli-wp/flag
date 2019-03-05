import {observable, action} from 'mobx';

class BaseComponentStore {
    constructor(opts) {
        this.initStore(opts);
    }
    @action initStore = (opts) =>{
        if(opts){
            Object.assign(this,opts);
        }
    }
} 

module.exports = BaseComponentStore;