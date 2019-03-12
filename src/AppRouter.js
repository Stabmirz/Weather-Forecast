import React from "react";
import App from './App';
import CurrentWeather from './componants/CurrentWeather';
import HourleyWeather from './componants/HourleyWeather';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
        <Link to="/"><button className="action">Current Forecast</button></Link>
        <Link to="/daily-forecast"><button className="action">Daily Forecast</button></Link>           
        <Link to="/hourley-forecast"><button className="action">Hourly Forecast</button></Link>
        </nav>

        <Route path="/" exact component={CurrentWeather} />
        <Route path="/daily-forecast"  component={App} />
        <Route path="/hourley-forecast" component={HourleyWeather} />
      </div>
    </Router>
  );
}

export default AppRouter;

