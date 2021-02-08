const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Setup paths for Express config. For viewsPath, if not selected, the default folder is views. (here it's templates)
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

/*-------------------------------
-------------Routes--------------
-------------------------------*/

app.get("", (req, res) => {
	res.render("index", {
		title: "Weather",
		name: "Andrew Mead",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About me",
		name: "Andrew Mead",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help",
		helpText: "Example message",
		name: "Andrew Mead",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.adress) {
		return res.send({ error: "You must provide an adress." });
	}

	geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
		if (!location) {
			return res.send({ error: "You must provide a valid location." });
		} else if (error) {
			return res.send({ error: error });
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error: error });
			}
			res.send({
				forecast: forecastData,
				location: location,
				address: req.query.adress,
			});
		});
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Andrew Mead",
		errorMessage: "Help article not found",
	});
});

app.get("*", (req, res) => {
	res.render("404", {
		title: "404",
		name: "Andrew Mead",
		errorMessage: "Page not found",
	});
});

//-----------------------------------------------

app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
