import { observable } from 'mobx';

// "babel-core": "^6.26.3",
class flagStore {
    @observable funcType ;
    constructor(opts) {
        //super(opts);
        this.funcType = opts?.funcType || 'show-panel';
    }
}

export default flagStore;
