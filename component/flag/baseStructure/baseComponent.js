import React from 'react';
import { action } from 'mobx';

class BaseComponent extends React.Component {
    get baseStore () {
        return this.props.flagStore;
    }

    get store () {
        return this.props.store;
    }

    @action changeRadio = (propertyName, event) => {
        this.baseStore[propertyName] = event.target.value;
    }

    @action changeSelect = (propertyName, checked) => {
        this.baseStore[propertyName] = checked;
    }
}

export default BaseComponent;