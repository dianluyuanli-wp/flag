import { observable } from 'mobx';

// "babel-core": "^6.26.3",
class flagStore {
    @observable funcType ;
    @observable userName ;
    constructor(opts) {
        //super(opts);
        this.funcType = opts?.funcType || 'show-panel';
        this.userName = opts?.userName || 'needLogin';

    }
}

export default flagStore;
