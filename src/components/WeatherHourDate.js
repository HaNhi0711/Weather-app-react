import React, { Component } from 'react'
import WeatherListItem from './WeatherListItem'

export default class WeatherHourDate extends Component {

    render() {
        const { daily } = this.props;
            return daily.map((el, index) => {
               return <WeatherListItem listItem = {el}/>
            });

    }
}
