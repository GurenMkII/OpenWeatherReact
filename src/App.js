import React, { Component } from 'react';
import moment from "moment";
import "moment-timezone";
import "zipcode-to-timezone";
import './App.css';



class App extends Component {
  state = {  }

  
  
  getWeather = () => {
    let zipInput = document.getElementById('zipInput').value;
    fetch("https://api.openweathermap.org/data/2.5/weather?zip="+zipInput+",us&units=imperial&appid=" + process.env.REACT_APP_API_KEY)
    .then(
      (response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
          response.status);
          return;
        }
        
        response.json().then((data) => {
          console.log(data);
          console.log(this);
          this.setState({
            city: data.name,
            temp: Math.round(data.main.temp)+String.fromCharCode(176),
            humidity: data.main.humidity,
            weather: data.weather[0].description,
          });
        });
        this.getTime();
      }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    };

  getTime = () => {
    let zipInput = document.getElementById('zipInput').value;
    var zipcode_to_timezone = require('zipcode-to-timezone');
    var tz = zipcode_to_timezone.lookup(zipInput);
    this.setState({
      time: moment().tz(tz).format('h:mm a'),
      day: moment().tz(tz).format('dddd'),
      date: moment().tz(tz).format('MMMM DD'),
    });
    document.getElementById('zipInput').value='';
    return false;
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.getWeather();
      // console.log('ENTER was pressed');
    }
  };
  
  
    
    render() { 
      return (
        
        <div className="container">
        <div className="row">
          <div className='col-lg-3'>

          </div>
          <div className='col-lg-6' id='searchfield'>
            <div className='row'>
              <div className='col-lg-12'>
                <input onKeyPress={this.handleKeyPress} id='zipInput'  placeholder='Enter Zip Code' ></input>
              </div>  
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <button onClick={this.getWeather} id='zipBtn'>OK</button>
              </div>  
            </div>
          </div>
          <div className='col-lg-3'>

          </div>
        </div>
        <div className="row">
          <div className='col-lg-3'>

          </div>
          <div className='col-lg-6'>
            <h2 id='city'>
              {this.state.city}
            </h2>
            <h1 id='temp'>
              {this.state.temp}
            </h1>
            <h3 id='weather'>
              {this.state.weather}
            </h3>
          </div>
          <div className='col-lg-3'>

          </div>
        </div>
        <div className="row">
          <div className='col-lg-3'>

          </div>
          <div className='col-lg-6'>
            <p id='time'>{this.state.time}</p>
            <p id='day'>{this.state.day}</p>
            <p id='date'>{this.state.date}</p>
          </div>
          <div className='col-lg-3'>

          </div>
        </div>

      </div>
    );
  }
}
 
export default App;