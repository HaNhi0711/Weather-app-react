import React, { Component } from 'react'
import Moment from 'react-moment'
import 'moment-timezone'
import {Grid, CardContent, Toolbar, AppBar, Typography, Card, Container, TextField} from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'
export default class WeatherApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weatherData: {},
            location : {
                lat : null,
                lon : null,
            },
            searched : false
            
        };
        // this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            weatherData: {}
        });
        this.getWeatherDate((this.state.location.lat)?this.state.location.lat:null, (this.state.location.lon)?this.state.location.lon:null);
    }

    getWeatherDate = async (lat,lon) =>  {
        if(lat && lon){
            try {
                const url =
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=vi&appid=4451f0cc1d6e5960079c7eb4634f7df8&fbclid=IwAR0dKV3uaWtu1PK03qwdnKjg9MBuefgIamsQPj331Ti7LgHaHDQAmU4F0rI`;
                const response = await fetch(url);
                const responseJSON = await response.json();
                console.log(responseJSON);
                this.setState({
                    weatherData: responseJSON,
                });
                // console.log(this.state.weatherData)
            } catch(error) {
                console.log(error);
            }
        }

        
    };

    getLocationCity = async (cityName) =>  {
        try {
        const url =
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4451f0cc1d6e5960079c7eb4634f7df8&fbclid=IwAR0dKV3uaWtu1PK03qwdnKjg9MBuefgIamsQPj331Ti7LgHaHDQAmU4F0rI`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        console.log(responseJSON);
        if(responseJSON.cod === '404')
        {
            this.setState({
                searched: true,
                location : {
                    lat : null,
                    lon : null
                }
            });
            document.getElementById('city-name').innerHTML = '- Không Tồn Tại'
            this.componentDidMount();
            return responseJSON.message;

        }else{
            this.setState({
                location: responseJSON.coord,
                searched: true
            });
            this.componentDidMount();
            document.getElementById('city-name').innerHTML = '- ' + responseJSON.name
            return responseJSON.name;
        }

    } catch(error) {
        console.log(error);
    }
    };

    updateInputValue = (e) => 
    {

            if (e.key === 'Enter') {
                this.getLocationCity(document.getElementById('search-city').value);
            }
        
        
    }

    renderCurrentWeather =() => {
        if(this.state.weatherData.current) {
            const { current } = this.state.weatherData;
            // let nowDate = new Date();
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
                            
                            <h3><Moment format="HH:mm DD/MM/YYYY" tz={this.state.weatherData.timezone}>{current.dt*1000}</Moment></h3>
                            <h1>{current.temp}°C</h1>
                            <h2 style={{textTransform:"capitalize"}}>{current.weather[0].description}</h2>
                            <p>Cảm giác: {current.feels_like}°C</p>
                            <p>Độ ẩm: {current.humidity}%</p>
                            <p>Tốc độ gió: {current.wind_speed} m/s</p>
                            <p>Áp suất: {current.pressure} hpa</p>
                            <p>Bình minh: <Moment format="HH:mm" tz={this.state.weatherData.timezone}>{current.sunrise*1000}</Moment></p>
                            <p>Hoàng hôn: <Moment format="HH:mm" tz={this.state.weatherData.timezone}>{current.sunset*1000}</Moment></p>
                        
                        </Grid>
                    </Grid>
                </CardContent>
        )
        } else{
            if(this.state.searched)
            {
                return (
                    <CardContent>
                        <h3>Thành Phố Không Tồn Tại</h3>
                    </CardContent>
                )
            }

        }
        
    }

    renderWeatherHourDate = () => {
        if(this.state.weatherData.current) {
            const { daily } = this.state.weatherData;
            return daily.map((el, index) => {
                const imageUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@4x.png`;
                return (
                    <Grid item xs={3} key={index}>
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
            });
            
        }
    }

    render() {
        return (
            <div>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6">
                        MindX WeatherApp <span id="city-name"></span>
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
                                <Card style={{marginTop:"20px",padding: '30px'}}>
                                    <TextField id="search-city" fullWidth label="Tên Thành Phố" type="search" 
                                        onKeyDown={this.updateInputValue}
                                    />
                                </Card>
                            </Grid>                          
                            <Grid item xs={12}>
                                <Card style={{marginTop:"20px"}}>
                                    {this.renderCurrentWeather()} 
                                </Card>
                            </Grid>   
                            {this.renderWeatherHourDate()}
                        </Grid>
                        </Container>
                    </Grid>
            
                </Grid>
            </div>
        )
    }
}
