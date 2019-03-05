import {observable, action} from 'mobx';

class appStore {
    constructor(opts) {
        //this.initStore(opts);
    }
    @action initStore = (opts) =>{
        if(opts){
            console.log(opts)
            //Object.assign(this,opts);
        }
        console.log(this,'init')
    }
} 

export default appStore;