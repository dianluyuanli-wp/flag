import React from 'react';
import { inject, observer } from 'mobx-react';
import BaseComponent from '../../../baseStructure/baseComponent';
import showPanel from '../ViewBlock/showPanel';
import template from '../ViewBlock/Template';
import TemplateStore from '../ViewBlock/Template/store';

@inject('flagStore')
@observer
class BodyPanel extends BaseComponent {
    render() {
        const PanelContent = {
            'show-panel': showPanel,
            'compile-panel': template
        }
        const templateStore = new TemplateStore(this.props.originData);
        this.baseStore.templateStore = templateStore;
        const ShowContent = PanelContent[this.baseStore.funcType];
        return (
            <React.Fragment>
                <ShowContent store={templateStore}/>
            </React.Fragment>
        )
    }
}

export default BodyPanel;