import { observable } from 'mobx';
//import ComponentStore from '../../../baseStructure/componentStore';

class TemplateStore {
    @observable flagType;
    @observable flagArray;
    @observable flagContent;
    @observable isMarked;
    @observable templateArray;
    @observable preferTemplate;
    constructor(opts) {
        this.flagType = opts?.flagType || 'single';
        this.flagArray = opts?.flagArray || [];
        this.flagContent = opts?.flagContent || '';
        this.templateName = opts?.templateName || '';
        this.record = opts?.record || [];
        this.templateArray = opts?.templateArray || [];
        this.preferTemplate = opts?.preferTemplate || '';
    }
}

export default TemplateStore;