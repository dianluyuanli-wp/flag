import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import BaseComponent from '../../baseModel/baseComponent'
import {Select, Form, Card} from 'antd';
import Store from './store';
import './index.scss';
const FormItem = Form.Item;
const Option = Select.Option;

const FromItemLayout = {
    labelCol: {
        sm: {span: 6}
    },
    wrapperCol: {
        sm: {span: 12}
    }
}

@inject('store')
@observer
class FirstCom extends BaseComponent{

    changeValue= (value) => {
        this.store.city = value;
    }
    render() {
        const positionType = {
            '北京': 1,
            '上海': 2,
            '武汉': 3,
            '贵阳': 4,
        };
        const optionArry = [];
        for(let key in positionType){
            optionArry.push(
                <Option value={positionType[key]} key={key}>{key}</Option>
            )
        }
        return(
            <Card>
                <div className='aaa'>wangpei</div>
                <Form>
                    <FormItem {...FromItemLayout} label='选择城市'>
                        <Select value={this.store.city} onChange={this.changeValue}>
                            {optionArry}
                        </Select>
                    </FormItem>
                </Form>
                <div>内容为{this.store.city}</div>
            </Card>
            
        )
    }
}

FirstCom.Store = Store;
module.exports = FirstCom;