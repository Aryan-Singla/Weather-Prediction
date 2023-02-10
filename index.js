var express = require("express");
var bodyParser = require("body-parser");
var https = require("https");
const ejs = require("ejs");
require("dotenv").config();

var app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function(){
    console.log("The server is successfully started at port 3000.");
})
app.get("/", function (req, res) {
    res.render("home");
})
app.post("/", function (req, res) {
    var cityName = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid="+process.env.API_KEY+"&units=metric";
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.render("post",{
                cityName: cityName,
                temp:temp,
                description:description,
                iconURL: iconUrl,
            })
        })
    })
    
})


//api key
// adffdad8c3acc032e3b7faec47406b5b