import React, {Component} from 'react';
import WeatherSelecter from '../WeatherSlecter';
import WeatherPanel from '../WeatherPanel';
import arrLocationGroup from './WeatherLocationGroup';
import Loadable from 'react-loadable';
import fuc from 'xiaohuli-package';
import network from '../../utils/network';
import { Button } from 'antd';
const Load = Loadable({
    loader: () => import('./split-code'),
    loading: () => <div>...Loading</div>
});
class WeatherApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLocation: 'undefined'
        }

        this.locationUpdate = this.locationUpdate.bind(this)
    }
    locationUpdate(locationName){
        this.setState({
            selectedLocation: locationName
        })
    }
    forceUpdate = () => {
        this.setState({
            selectedLocation: 'unknown'
        })
    }

    getData = async () => {
        console.log('ddddddd');
        fuc();
        const res = await network.get('promoSpikeNew', {
            page: 1,
            type: 10004,
            size: 40,
            pdduid: '0',
            list_id: 'd34ffdc56c'
        },{})
        console.log('return');
        console.log(res, 'answer');
    }
    render() {
        return (
            <div>
                <WeatherSelecter LocationGroup={arrLocationGroup} locationUpdate={this.locationUpdate}/>
                <WeatherPanel location={this.state.selectedLocation} />
                <Button onClick={()=>{this.forceUpdate()}}>111333制更新</Button>
                <Button onClick={this.getData.bind(this)}>获取数据</Button>
                {/* <Load /> */}
                {this.state.selectedLocation === 'unknown' && <Load />}
            </div>
        )
    }
}

export default WeatherApp;