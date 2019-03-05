import React, {Component} from 'react';

class WeatherPanel extends Component {
    constructor(props){
        super(props)

        this.state = {
            temperature: 'NA'
        }

        this.getTemperature = this.getTemperature.bind(this)
    }
    componentWillMount() {
        console.log('component WeatherPanel WillMount')
      }
    componentDidMount() {
        console.log('component WeatherPanel DidMount')
    }
    shouldComponentUpdate(nextProps,nextState){
        return (nextProps.location !== this.props.location) ||
        (nextState.temperature !== this.state.temperature);
    }

    getTemperature () {
        const mockTemperature = Math.random() * 100;
        this.setState({
            temperature: mockTemperature
        })
    }

    render() {
        const {location} = this.props;
        console.log('WeatherPanel render')
        return (
            <div className='weather-panel'>
                <div>
                    {location}的温度是22?： {this.state.temperature}
                </div>
                <button onClick = {this.getTemperature}>Get temperature</button>
            </div>
        )
    }
}

export default WeatherPanel;