import React,{Component}from "react";
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import Clock from 'react-live-clock';
import Icon from "./Icon";

const Time = () =>{
  let currentDate = Date.now();
  return(<span>{currentDate}</span>)
}

class HourleyWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenLocation: "Miami, US",
      weather:[],
    };
  }

  fetchData = () => {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.givenLocation}&APPID=b292bd2a578c27b2e97bbb03b7515a95&units=metric`;

    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });

      const weather = [];

      for (let i = 0; i < this.state.data.list.length; i = i + 1) {
          weather.push({
          dateTime:this.state.data.list[i].dt,
          temp:Math.round(this.state.data.list[i].main.temp),
          minTemp: Math.round(this.state.data.list[i].main.temp_min),
          maxTemp : Math.round(this.state.data.list[i].main.temp_max),
          humidity : this.state.data.list[i].main.humidity,
          pressure : this.state.data.list[i].main.pressure,
          wind: this.state.data.list[i].wind.speed,
          description: this.state.data.list[i].weather[0].description,
          icons: this.state.data.list[i].weather[0].icon
        })
      }
      
      //console.log(this.state.data);

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
    const newLocation = this.newInputLocation.value;
    this.setState(
      {
        givenLocation: newLocation
      },
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const {weather,givenLocation,city, country,} = this.state;
    return (
      <div className="main">
       <div><h1>5 Day / 3 Hour Weather Forecast</h1></div> 
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
        </form><hr/>
        <div className="table-body">
          <table className="table">  
            <thead>
              <tr className="text-center">
                <th scope="col">Date Time</th>
                <th scope="col">Temperature</th>
                <th scope="col">Icon</th>
                <th scope="col">Description</th>
                <th scope="col">High / Low</th>
                <th scope="col">Humidity</th>
                <th scope="col">Pressure</th>
                <th scope="col">Wind</th>
              </tr>
            </thead>
            {weather.map(item => {
            return (
            <tbody key= {item.dateTime}>
              <tr>
                <td scope="row"><Moment unix format="dddd MMMM Do YYYY hA ">{item.dateTime}</Moment></td>
                <td>{item.temp}°C</td>
                <td ><Icon icon={item.icons}/></td>
                <td>{item.description}</td>
                <td>{item.maxTemp}°C / {item.minTemp}°C</td>
                <td>{item.humidity}%</td>
                <td>{item.pressure}hpa</td>
                <td>{item.wind}m/s</td>
              </tr>
            </tbody>
                
            );
            })} 
          </table>
              <div className="made-with-love">Made with <i>♥</i> by Mirza</div>
          </div>
      </div>
    );
  }
}
export default HourleyWeather;