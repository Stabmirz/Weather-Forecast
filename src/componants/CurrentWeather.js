
import React,{Component}from "react";
import axios from 'axios';
import '../App.css';
import Moment from 'react-moment';
import 'moment-timezone';
import Clock from 'react-live-clock';
import Icon from "./Icon";

const Time = () => {
  let currentDate = Date.now();
  return (<span>{currentDate}</span>);
}

class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenLocation: "Miami,US",
    };
  }

  fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.givenLocation}&APPID=b292bd2a578c27b2e97bbb03b7515a95&units=metric`;
   
    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });
       console.log(this.state.data);


      this.setState({
        city: this.state.data.name,
        country: this.state.data.sys.country,
        date: this.state.data.dt,
        temperature: Math.round(this.state.data.main.temp),
        max_temperature: Math.round(this.state.data.main.temp_max),
        min_temperature: Math.round(this.state.data.main.temp_min),
        description: this.state.data.weather[0].description,
        wind: this.state.data.wind.speed,
        humidity: this.state.data.main.humidity,
        pressure: this.state.data.main.pressure,
        icon: this.state.data.weather[0].icon
      });
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  newLocation = event => {
    event.preventDefault();
    const newLocationValue = this.newInputLocation.value;
    this.setState(
      {
        givenLocation: newLocationValue
      },
      () => {
        this.fetchData();
      }
    );
  };



  render(){
    const{city,country,temperature,max_temperature,min_temperature,icon,date,humidity,pressure,wind,description,givenLocation}=this.state;
    return (
      <div className="main">
        <div><h1>Current Weather Forecast</h1></div>
        <div className="location"><strong><span>{city}, </span><span>{country}</span></strong></div>
        <div className="">
          <Moment format="ddd MMMM Do YYYY"><Time/></Moment>
          <p className="clock"><Clock format={'HH:mm:ss'} ticking={true} /></p>
        </div>
        <form className="form" onSubmit={this.newLocation}>
          <div>
          <span className="location-input">Enter Location : </span>
          <input className="input"
            defaultValue={givenLocation}
            type="text"
            ref={input => (this.newInputLocation = input)}
          />
          <button className="btn action">Get Weather</button>
          </div>
        </form>
        <hr/>
        <div className="current-day action">
          <div className="details" key= {date}>
             <div><p className="current-day-temp"><b>Current Temperature : </b>{temperature}°C</p><span><Icon icon={icon}/></span></div>
            <div>
              <p><b>Max Temp. : </b>{max_temperature}°C</p>
              <p><b>Min Temp. : </b>{min_temperature}°C</p>
              <p><b>Humidity : </b>{humidity}%</p>
              <p><b>Pressure : </b>{pressure}hpa</p>
              <p><b>Wind : </b>{wind}m/s</p>
              <p><b>Description : </b><span className="description">{description}</span></p>
              <p></p>
            </div>
          </div>
        </div><hr/>
        <div className="made-with-love">Made with <i>♥</i> by Mirza</div>
      </div>
    );
  }
}
export default CurrentWeather;
