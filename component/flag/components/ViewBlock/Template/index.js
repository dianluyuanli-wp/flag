import React from 'react'; //Select
import { Button, Row, Col, Card, Select, Checkbox, Input, Form } from 'antd';
import BaseViewComponent from '../../../baseStructure/baseViewComponent';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import network from '../../../../../utils/network';
import './index.scss';

const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
        xs: { span: 2 }
    },
    wrapperCol: {
        sm: { span: 6 },
        xs: { span: 2 }
    }
};
//onChange={this.changeSelect.bind(this, '')
@inject('flagStore')
@observer
class Template extends BaseViewComponent {
    getOption = () => {
        const options = [
            { name: '单项flag', value: 'singleCheck'},
            { name: '组团flag', value: 'groupCheck'}
        ];
        return options.map((item, index) => {
            return (
                <Option key={index} value={item.value}>{item.name}</Option>
            )
        })
    }
    addCheckArray = () => {
        console.log(this.store.flagContent);
        this.store.flagArray.push({name: this.store.flagContent});
    }
    getCheckBoxView = () => {
        return this.store.flagArray.map((item, index) => {
            return (
                <Checkbox className='check-box' key={index}>{item.name}</Checkbox>
            )
        })
    }
    test = async () => {
        const res = await network.post('readTemplate', {
            templateName: '模板'
        },{});
        console.log(res)
    }
    submitTemplate = async () => {
        console.log('1111111111', toJS(this.store.flagArray));
        const res = await network.post('addTemplate', {
            templateName: this.store.templateName,
            flagArray: toJS(this.store.flagArray)
        },{});
        console.log(res, 'ccccc');
    }
    // extra={<Button type="dashed" onClick={this.submitTemplate}>提交</Button>}
    render() {
        return (
            <React.Fragment>
                <Card title={'模板编辑'} className='body-card' extra={<Button type="dashed" onClick={this.submitTemplate.bind(this)}>提交</Button>}>
                    <Row>
                        <Col span={12}>
                            <Select 
                                style={{ width: '1.5rem' }}
                                onChange={this.changeSelect.bind(this, 'flagType')} 
                                placeholder={'请选择flag模块'} >
                                {this.getOption()}
                            </Select>
                        </Col>
                        <Col span={4} offset={4}>
                            <Button onClick={this.addCheckArray}>添加</Button>
                        </Col>
                    </Row>
                    <FormItem {...formItemLayout} label={'模板名称'}>
                        <Input placeholder={'请输入内容'} onChange={this.changeInput.bind(this, 'templateName')}/>
                    </FormItem>
                    <FormItem {...formItemLayout} label={'填充内容'}>
                        <Input placeholder={'请输入内容'} onChange={this.changeInput.bind(this, 'flagContent')}/>
                    </FormItem>
                </Card>
                <Card className='body-card' title={'展示区域'} extra={<Button type="dashed" onClick={this.test.bind(this)}>测试</Button>}>
                    {this.getCheckBoxView()}
                </Card>
            </React.Fragment>
        )
    }
}

export default Template;