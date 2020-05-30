import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom'
import WeatherApp from './containers/WeatherApp'
import ToDoApp from './containers/ToDoApp'
import './containers/App.css'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';




export default class App extends Component {
      
    
    render() {
        return (
            <Router>
                <div>
                <nav>
                    <div className="app-bar">
     
                        <ul className="links-fl">
                 
                                <li>
                                    <NavLink activeClassName="active" className="link" to='/'>Home</NavLink>
                                    </li>
                                <li>
                                <NavLink activeClassName="active" className="link" to='/to-do'>ToDo App</NavLink>
                                </li>
                                <li>
                                <NavLink activeClassName="active" className="link" to='/weather'>WeatherApp</NavLink>
                                </li>
                            
                            
                        </ul>
                        
                        <div  style = { {borderRadius: 'borderRadius'} } className= "content-search">
                            
                            <SearchIcon className="search-icon"/>
                
                        
                            <InputBase className="search"
                                placeholder="Search…" 
                                onChange = {(e)=> {
                                    this.setState({
                                        searchText: e.target.value,
                                    });
                                }}
                                onKeyDown = { (e) => {
                                    if(e.key === "Enter") {
                                        console.log(this.props.history);
                                        this.props.history.push(`/weather?name=${this.state.searchText}`)
                                    }
                                }}
                                />


                        </div>




                    </div>

                </nav>
                <Switch>
                    <Route path='/to-do' render={ (props) => <ToDoApp /> }>
                        
                    </Route>
                    <Route path='/weather/:name' render={ (props) => <WeatherApp /> }>
                        
                    </Route>
                </Switch>
                </div>
            </Router>
            
        )
    }
}
