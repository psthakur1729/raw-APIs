const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var city = req.body.city;
    city = city.toUpperCase();
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=83fc24ea8e63cdc8ac837f8047f61f72&units=metric";

    https.get(url, function(APIres) {
        // console.log(APIres.statusCode);
        APIres.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>Temperature of " + city + " in degree Celcius is: " + temp + "</h1>");
            res.write("<h1>Its " + weatherDescription + " out there</h1>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        });
    });
});

//REMEMBER res.send IS THE FINAL THING THAT HAPPENS IT ONLY HAPPENS ONCE but we can use res.write as a workaround to send multi responses

app.listen(4040, function() {
    console.log("Server started on port 4040...");
});