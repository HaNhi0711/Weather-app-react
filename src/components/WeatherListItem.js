import React, { Component } from 'react'
import Moment from 'react-moment'
import { Card, Grid, CardContent } from '@material-ui/core'

export default class WeatherListItem  extends Component {
    



    render() {
        const el= this.props.listItem;
        const imageUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@4x.png`;
        return (
            <Grid  item xs={3} >
                <Card>
                    <CardContent style={{textAlign:"center"}}>
                        <h4><Moment format="DD/MM">{el.dt*1000}</Moment></h4>
                        <h3>{el.temp.min}°C - {el.temp.max}°C</h3>
                        <img src={imageUrl} alt="" style={{width: "150px"}}/>
                        <h3 style={{textTransform:"capitalize"}}>{el.weather[0].description}</h3>
                    </CardContent>
                </Card>
            </Grid>
        );
    }
}
