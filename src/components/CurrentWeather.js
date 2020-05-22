import React, { Component } from 'react'
import Moment from 'react-moment'
import { Grid, CardContent } from '@material-ui/core'

export default class CurrentWeather extends Component {



    render() {

        const {current} = this.props;
        const imgCur = `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;
        return (

            <CardContent>
            <Grid
                container
                direction="row"
            >

                <Grid 
                    item
                    xs={4}
                >
                    <img src={imgCur} style={{width: "300px"}} alt="" />
                </Grid>
                <Grid 
                    item
                    xs={8}
                >
                    
                    <h3><Moment format="HH:mm DD/MM/YYYY">{current.dt*1000}</Moment></h3>
                    <h1>{current.temp}°C</h1>
                    <h2 style={{textTransform:"capitalize"}}>{current.weather[0].description}</h2>
                    <p>Cảm giác: {current.feels_like}°C</p>
                    <p>Do am: {current.humidity}%</p>
                    <p>Toc  do gio: {current.wind_speed} m/s</p>
                    <p>Ap suat: {current.pressure} hpa</p>
                    <p>Binh Minh: <Moment format="HH:mm">{current.sunrise*1000}</Moment></p>
                    <p>Hoang Hon: <Moment format="HH:mm">{current.sunset*1000}</Moment></p>
                
                </Grid>
            </Grid>
        </CardContent>

        );

    }
}
