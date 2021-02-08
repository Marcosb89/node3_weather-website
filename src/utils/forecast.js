const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
	const weatherKey = "10c7df97e7c132691e40cc0a794b94d8";
	const url = `http://api.weatherstack.com/current?access_key=${weatherKey}&query=${latitude},${longitude}}`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("Unable to connect to weather service.", undefined);
		} else if (body.error) {
			callback("Unable to find location.", undefined);
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${body.current.humidity}%.`
			);
		}
	});
};

module.exports = forecast;
