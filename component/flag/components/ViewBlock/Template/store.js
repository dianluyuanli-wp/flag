import { observable } from 'mobx';
//import ComponentStore from '../../../baseStructure/componentStore';

class TemplateStore {
    @observable flagType;
    @observable flagArray;
    @observable flagContent;
    @observable isMarked;
    constructor(opts) {
        this.flagType = opts?.flagType || 'single';
        this.flagArray = opts?.flagArray || [];
        this.flagContent = opts?.flagContent || '';
        this.templateName = opts?.templateName || '';
        this.record = opts?.record || [];
    }
}

export default TemplateStore;