import React, {Component} from 'react';
import {TestContext} from '../WeatherApp/context'

class WeatherSelecter extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log('component WeatherSelecter WillMount')
      }
    componentDidMount() {
        console.log('component WeatherSelecter DidMount')
    }

    render() {
        const {LocationGroup, locationUpdate} = this.props;
        console.log('WeatherSelecter render')
        return (
            <div className='weather-selecter'>
                <select onChange={(event) => {locationUpdate(event.target.value)}}>
                    {LocationGroup.map((locationObj) => {
                        return <option key={locationObj.key}>{locationObj.name}</option>
                    })}
                </select>
                <TestContext.Consumer>
                    {value => <div>{value}</div>}
                </TestContext.Consumer>
            </div>

        )
    }
}

export default WeatherSelecter;