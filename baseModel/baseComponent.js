import React, {Component} from 'react';
class BaseComponent extends Component {
    get store() {
        return this.props.dataStore;
    }
} 

module.exports = BaseComponent;