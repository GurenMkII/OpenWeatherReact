import React, { Component } from 'react';
import moment from "moment";
import "moment-timezone";
import "zipcode-to-timezone";
import './App.css';



class App extends Component {
  state = {  }

  
  getTime = () => {
    let zipInput = document.getElementById('zipInput').value;
    let zipcode_to_timezone = require( 'zipcode-to-timezone' );
    let tz = zipcode_to_timezone.lookup(zipInput);
    let time = moment().tz(tz).format('MMMM DD, YYYY, h:mm a');
    // let time = moment().tz(tz).format('dddd');
    this.setState({
      moment: {
        time: moment().tz(tz).format('h:mm a'),
        day: moment().tz(tz).format('dddd'),
        date: moment().tz(tz).format('MMMM DD'),
      }
    })
    console.log(time);
  }
  
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
        
        // Examine the text in the response
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
      }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
      this.getTime();
      document.getElementById('zipInput').value='';
      return false;
    }
    
    render() { 
      return (
        
        <div className="container">
        <div className="row">
          <div className='col-lg-3'>

          </div>
          <div className='col-lg-6' id='searchfield'>
            <input id='zipInput'  placeholder='Enter Zip Code' ></input>
            <button onClick={this.getWeather} id='zipBtn'>OK</button>
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
            {/* <p id='time'>{this.state.name}</p> */}
            {/* <p id='day'>{this.state.moment.day}</p>
            <p id='date'>{this.state.moment.date}</p> */}
          </div>
          <div className='col-lg-3'>

          </div>
        </div>

      </div>
    );
  }
}
 
export default App;