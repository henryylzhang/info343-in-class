import React from 'react';
import 'whatwg-fetch'; // A Fetch polyfill
import "./css/main.css";

const url = 'http://api.openweathermap.org/data/2.5/weather?q=';
// Put your key after the '='
const key = "&appid=ae34e676a942c08ed538f3636733ae16";
const tempCity = "Seattle";
const imperial = "&units=imperial"
const SEATTLEWEATHER = url + tempCity + key + imperial;


export default class extends React.Component {
    constructor(props) {
        super(props);

		this.state = {};
    }
	
	componentDidMount() {
		fetch(SEATTLEWEATHER)
			.then(response => response.json())
			.then(data => this.setState({weather: data}));
	}
	// This function is for part 2. It looks at the state property for Fahrenheit (which you will have to define)
	// and converts the initial temperature from Kelvin to either Fahrenheit or Celsius. 
	// Returns the value with no decimal points.
	// 
	// convert(temp) {
	// 	if (this.state.fahrenheit) {
	// 		return (temp * (9 / 5) - 459.67).toFixed(0);
	// 	} else {
	// 		return (temp -  273.15).toFixed(0);
	// 	}
	// }

    render() {
		var currentTemp;
		var currentCity;
		if (this.state.weather) {
			currentTemp = (<div>{this.state.weather.main.temp}</div>);
			currentCity = (<div>{this.state.weather.name}</div>);
		}

		return(
			<div className = "center-text">
				{currentTemp}
				{currentCity}
			</div>
		);
	}
}