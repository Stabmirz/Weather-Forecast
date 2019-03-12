
import React,{Component}from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Moment from 'react-moment';
import 'moment-timezone';
import Clock from 'react-live-clock';
import Icon from "./componants/Icon";

const Time = () => {
  let currentDate = Date.now();
  return (<span>{currentDate}</span>);
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenLocation: "Miami,US",
      city:undefined,
      country:undefined,
      weather:[]
    };
  }

  fetchData = () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.givenLocation}&APPID=fbf712a5a83d7305c3cda4ca8fe7ef29&units=metric&cnt=16`;
   
    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });

      const  weather = [];

      for (let i = 0; i < this.state.data.list.length; i = i+1) {
        weather.push({
        days: this.state.data.list[i].dt,
        dayTemp: Math.round(this.state.data.list[i].temp.day),
        nightTemp : Math.round(this.state.data.list[i].temp.night),
        minTemp: Math.round(this.state.data.list[i].temp.min),
        maxTemp : Math.round(this.state.data.list[i].temp.max),
        humidity: Math.round(this.state.data.list[i].humidity),
        pressure: Math.round(this.state.data.list[i].pressure),
        wind: Math.round(this.state.data.list[i].speed),
        description: this.state.data.list[i].weather[0].description,
        icons: this.state.data.list[i].weather[0].icon
      })
      }
      //  console.log(this.state.data);

      this.setState({
        city: this.state.data.city.name,
        country: this.state.data.city.country,
        weather,
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
    const {weather, givenLocation, city, country,} = this.state;
    return (
      <div className="main">
       <div><h1>16 Days Weather Forecast</h1></div>
        <div className="location"><strong><span>{city}, </span><span>{country}</span></strong></div>
        <div className="date">
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
        <div className="body">
         {weather.map(item => {
              return (
                <Link key= {item.days} to="/hourley-updates" style={{ textDecoration: 'none'}}>
                <div className="days action">
                  <div className="date-time"><Moment unix format="dddd MMMM Do YYYY">{item.days}</Moment></div>
                  <div className="day-night-temp">
                      <div><b>Day : </b> {item.dayTemp}°C</div>
                      <div><b>Night : </b>{item.nightTemp}°C</div>
                    </div>
                    <div><Icon icon={item.icons}/></div>
                    <div className="max-min-temp">
                      <div><b>Max. : </b>{item.maxTemp}°C</div>
                      <div><b>Min. : </b>{item.minTemp}°C</div>
                    </div>
                    <div>
                      <p><b>Wind : </b>{item.wind}m/s</p>
                      <p><b>Humidity : </b>{item.humidity}%</p>
                      <p><b>Pressure : </b>{item.pressure}hpa</p>
                      <p><b>Description : </b><span className="description">{item.description}</span></p>
                      <p></p>
                    </div>
                  </div>
                </Link>
                );
            })}
          </div>
          <hr/>
          <div className="made-with-love">Made with <i>♥</i> by Mirza</div>
      </div>
    );
  }
}
export default App;
