import React from 'react';
import 'whatwg-fetch'; // A Fetch polyfill
import "./css/main.css";

import WeatherCard from './WeatherCard.jsx';
import SearchCity from './SearchCity.jsx';

// We will be fetching weather data with a city name. For more information visit:
// http://openweathermap.org/current ('By city name' is the first option)
// Use the Fetch api to make your calls : https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// Familiarize yourself with React's lifecycle methods : https://facebook.github.io/react/docs/react-component.html


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        	<div>
				<h1 className="center-text">Current Weather</h1>
	        	<SearchCity />
	        	<WeatherCard />
	        </div>
        );
    }
}
