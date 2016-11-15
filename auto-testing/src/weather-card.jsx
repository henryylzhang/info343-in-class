import React from 'react';

import moment from "moment";

export default class extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.data.weather) {				
			return (
				<div className="mdl-card mdl-shadow--2dp weather-card">
				    <div className="mdl-card__supporting-text">
				    	<h2 className="weather-text center-text city-name">{this.props.data.name}</h2>
				    	<p className="weather-text center-text">{moment().format('dddd, h:mm a')}</p>
				    	<p className="weather-text center-text weather-description">{this.props.data.weather[0].description}</p>					    	
				    	<h2 className="weather-temp center-text">
				    		<img className="weather-img" src={"http://openweathermap.org/img/w/" + this.props.data.weather[0].icon + ".png"} alt="" />
				    		<span className="weather-temp">{this.props.data.main.temp} &#176;{this.props.fahrenheit ? 'F' : 'C'}</span>
				    	</h2>
				    </div>
				</div>
			);
		}
		return <p className="center-text loading-text">Loading</p>;
	}
	//whne someone it trying to get a propTypes. T
	static get propTypes() {
		return {
			// checks to make sure this prop is of type boolean
			farenheit: React.PropTypes.bool,
			data: React.PropTypes.shape({
				name: React.PropTypes.string,
				main: React.PropTypes.shape({
					// every time you use shape, can define a subclass
					temp: React.PropTypes.number
				}),
				weather: React.PropTypes.arrayOf(React.PropTypes.shape({
					description: React.PropTypes.string
				}))
			})
		}
	}
}
		