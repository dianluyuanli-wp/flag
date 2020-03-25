import React from 'react';
import { inject, observer } from 'mobx-react';
import { Checkbox, Card, Button, Timeline, Popover, Form, Select } from 'antd';
import network from '@network';
import BaseViewComponent from '../../../../baseStructure/baseViewComponent';
import './index.scss';
import { getYearMonthDate } from 'xiaohuli-package';
import { toJS, runInAction } from 'mobx';

const TimeItem = Timeline.Item;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        sm: { span: 6 },
        //xs: { span: 2 }
    },
    wrapperCol: {
        sm: { span: 6 },
        //xs: { span: 2 }
    }
};
@inject("flagStore")
@observer
class ShowPanel extends BaseViewComponent {
    attendance = async() => {
        const res = await network.post('attendance', {
            ansArray: toJS(this.props.store.flagArray),
            date: new Date().toLocaleDateString()
        },{});
        const res2 = await network.post('addOrUpdateTemplate', {
            preferTemplate: this.store.preferTemplate,
            templateArray: toJS(this.store.templateArray)
        },{});
    }
    changeOwnSelect = (name, check) => {
        this.changeSelect(name, check);
        let targetTemplate = this.store.templateArray.filter(item => item.name === this.store.preferTemplate)[0];
        runInAction(() => {
            this.props.store.flagArray = targetTemplate.itemArray.map(item => ({name: item, value: false}));
        })
    }
    getCheckoutBox = () => {
        const showCard = (content, date = '今日flag', show = false, disable = true, className = 'body-card', showSelcetor = false) => {
            return (<Card title={date} className={className} 
                    extra={show && <Button type="dashed" onClick={this.attendance.bind(this)}>保存</Button>}>
                    {content.map((item, index) => {
                        return (
                            <Checkbox className='check-box' checked = {item.value} disabled={disable} onChange={this.changeCheck.bind(this, item, 'value')} key={index}>
                                {item.name}
                            </Checkbox>
                        )})}
                    {showSelcetor &&             
                        <FormItem {...formItemLayout} label='选择偏好模板'>
                            <Select 
                                style={{ width: '1.5rem' }}
                                defaultValue={this.store.preferTemplate}
                                onChange={(check) => {this.changeOwnSelect('preferTemplate', check)}}
                                placeholder={'选择首选flag模板'} >
                                {this.store.templateArray.map((item, index) => <Option key={index} value={item.name}>{item.name}</Option>)}
                            </Select>
                        </FormItem>
                    }
                </Card>
            )
        };
        const timeLineItem = this.store.record.map((item, index) => {
            const percent = 100 * item.flagArray.filter( item => item.value === true).length / item.flagArray.length
            return (
                <TimeItem key={index}>
                    <Popover content={showCard(item.flagArray, item.date, false, true, 'small-card')} trigger='click'>
                        {item.date + ' ' + '完成度' + percent + '%'}
                    </Popover>
                </TimeItem> 
            )
        })
        return (
            <React.Fragment>
                {showCard(this.props.store.flagArray, '今日flag', true, false, undefined, true)}
                <Card title='历史记录' className='body-card card-2'>
                    <Timeline className='time'>
                        {timeLineItem}
                    </Timeline>
                </Card>
            </React.Fragment>
        )
    }
    render() {
        return (
            <React.Fragment>
                {this.getCheckoutBox()}
            </React.Fragment>
        )
    }
}
export default ShowPanel;