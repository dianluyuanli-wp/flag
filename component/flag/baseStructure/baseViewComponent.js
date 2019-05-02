import React from 'react';
import { action } from 'mobx';

class BaseViewComponent extends React.Component {
    get store () {
        return this.props.store;
    }

    @action changeSelect = (propertyName, checked) => {
        this.store[propertyName] = checked;
    }

    @action.bound changeInput = (props, event) => {
        this.store[props] = event.target.value;
    }
    @action.bound changeTargetInput = (obj, props, event) => {
        obj[props] = event.target.value;
    }

    @action.bound changeCheck = (item, props, event) => {
        item[props] = event.target.checked;
    }
}

export default BaseViewComponent;