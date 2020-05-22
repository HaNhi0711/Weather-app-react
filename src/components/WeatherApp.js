import React, { Component } from 'react'
import Moment from 'react-moment'
import {Grid, CardContent, Toolbar, AppBar, Typography, Card, Container} from '@material-ui/core'
import CurrentWeather from './CurrentWeather'
import { CircularProgress } from '@material-ui/core'
import WeatherHourDate from './WeatherHourDate'


// import MenuIcon from '@material-ui/icons/Menu'
export default class WeatherApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: {},
        };
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.getWeatherDate()
        // }, 2000);
        this.getWeatherDate()
    }

    getWeatherDate = async () =>  {
        try {
        const url =
        'https://api.openweathermap.org/data/2.5/onecall?lat=10.75&lon=106.6667&units=metric&lang=vi&appid=4451f0cc1d6e5960079c7eb4634f7df8&fbclid=IwAR0dKV3uaWtu1PK03qwdnKjg9MBuefgIamsQPj331Ti7LgHaHDQAmU4F0rI';
        const response = await fetch(url);
        const responseJSON = await response.json();
        console.log(responseJSON);
        this.setState({
            weatherData: responseJSON,
        });
    } catch(error) {
        console.log(error);
    }
    };

    // renderCurrentWeather =() => {
    //     if(this.state.weatherData.current) {
    //         // const { current } = this.state.weatherData;
    //         // // let nowDate = new Date();
    //         // const imgCur = `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;
    //     //     return (
    //     //         <CardContent>
    //     //             <Grid
    //     //                 container
    //     //                 direction="row"
    //     //             >

    //     //                 <Grid 
    //     //                     item
    //     //                     xs={4}
    //     //                 >
    //     //                     <img src={imgCur} style={{width: "300px"}} alt="" />
    //     //                 </Grid>
    //     //                 <Grid 
    //     //                     item
    //     //                     xs={8}
    //     //                 >
                            
    //     //                     <h3><Moment format="HH:mm DD/MM/YYYY">{current.dt*1000}</Moment></h3>
    //     //                     <h1>{current.temp}°C</h1>
    //     //                     <h2 style={{textTransform:"capitalize"}}>{current.weather[0].description}</h2>
    //     //                     <p>Cảm giác: {current.feels_like}°C</p>
    //     //                     <p>Do am: {current.humidity}%</p>
    //     //                     <p>Toc  do gio: {current.wind_speed} m/s</p>
    //     //                     <p>Ap suat: {current.pressure} hpa</p>
    //     //                     <p>Binh Minh: <Moment format="HH:mm">{current.sunrise*1000}</Moment></p>
    //     //                     <p>Hoang Hon: <Moment format="HH:mm">{current.sunset*1000}</Moment></p>
                        
    //     //                 </Grid>
    //     //             </Grid>
    //     //         </CardContent>
    //     // )
    //     }
        
    // }

    // renderWeatherHourDate = () => {
    //     if(this.state.weatherData.current) {
    //         const { daily } = this.state.weatherData;
    //         return daily.map((el, index) => {
    //             const imageUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@4x.png`;
    //             return (
    //                 <Grid item xs={3} key={index}>
    //                     <Card>
    //                         <CardContent style={{textAlign:"center"}}>
    //                             <h4><Moment format="DD/MM">{el.dt*1000}</Moment></h4>
    //                             <h3>{el.temp.min}°C - {el.temp.max}°C</h3>
    //                             <img src={imageUrl} alt="" style={{width: "150px"}}/>
    //                             <h3 style={{textTransform:"capitalize"}}>{el.weather[0].description}</h3>
    //                         </CardContent>
    //                     </Card>
    //                 </Grid>
    //             );
    //         });
            
    //     }
    // }

    renderContent = () => {
        if(this.state.weatherData.current) {
            return (
                <React.Fragment>
                    <CurrentWeather current = {this.state.weatherData.current}/>
                </React.Fragment>
            );
        }

        else {
            return <CircularProgress/>;
        }
    }

    renderListHourDate = () => {
        if(this.state.weatherData.daily) {
            return (
                <React.Fragment>
                    <WeatherHourDate daily = {this.state.weatherData.daily}/>
                </React.Fragment>
            );
        }

        else {
            return <CircularProgress/>;
        }
    }


    render() {
        return (
            <div>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6">
                        MindX WeatherApp - Ho Chi Minh City
                        </Typography>
                    </Toolbar>
                    </AppBar>
                <Grid container direction="row" justify="center"  alignItems="center">
                    <Grid item xs={10} >
                        <Container>
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                        >   
                            <Grid item xs={12}>
                                <Card style={{marginTop:"20px"}}>
                                    {/* {this.renderCurrentWeather()}  */}
                                    {this.renderContent()}
                          

                                </Card>
                            </Grid>   
                            {this.renderListHourDate()}
                        </Grid>
                        </Container>
                    </Grid>
            
                </Grid>
            </div>
        )
    }
}
