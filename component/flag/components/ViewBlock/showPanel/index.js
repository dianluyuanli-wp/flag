import React from 'react';
import { inject, observer } from 'mobx-react';
import { Checkbox, Card, Button, Timeline, Popover } from 'antd';
import network from '../../../../../utils/network';
import BaseViewComponent from '../../../baseStructure/baseViewComponent';
import './index.scss';
import { getYearMonthDate } from 'xiaohuli-package';
import { toJS } from 'mobx';

const TimeItem = Timeline.Item;

@inject("flagStore")
@observer
class ShowPanel extends BaseViewComponent {
    attendance = async() => {
        const res = await network.post('attendance', {
            ansArray: toJS(this.props.store.flagArray),
            date: new Date().toLocaleDateString()
        },{});
    }
    getCheckoutBox = () => {
        const showCard = (content, date = '今日flag', show = false, disable = true, className = 'body-card') => {
            return (<Card title={date} className={className} 
                    extra={show && <Button type="dashed" onClick={this.attendance.bind(this)}>保存</Button>}>
                    {content.map((item, index) => {
                        return (
                            <Checkbox className='check-box' disabled={disable} onChange={this.changeCheck.bind(this, item, 'value')} defaultChecked={item.value} key={index}>
                                {item.name}
                            </Checkbox>
                        )})}
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
        console.log(this.props.store.flagArray, 'content');
        return (
            <React.Fragment>
                {showCard(this.props.store.flagArray, null, true, false)}
                <Card title='历史记录' className='body-card card-2'>
                    <Timeline className='time'>
                        {timeLineItem}
                    </Timeline>
                </Card>
            </React.Fragment>
        )
    }
    render() {
        console.log(getYearMonthDate(), 'package');
        return (
            <React.Fragment>
                {this.getCheckoutBox()}
            </React.Fragment>
        )
    }
}
export default ShowPanel;