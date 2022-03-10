const express = require("express");
const https  = require("https");
const bodyParser = require("body-parser"); //necessary module to get variable from html page

const app = express();

app.use(bodyParser.urlencoded({extended: true})); //necessary code for using bodyParser method

app.get("/", function(req, res){
  
res.sendFile(__dirname + "/index.html");
        
    });
   
app.post("/", function(req, res){
    
 const query = req.body.cityName;
const apiKey = "ce196cd8df8fc942898f8957ec9e2c60";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units="+ unit;

https.get(url, function(response){

    console.log(response.statusCode);

response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const cityName = weatherData.name;
    const temp = weatherData.main.temp;
    const feelLikeTemp = weatherData.main.feels_like;
    const desc = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
    res.write("<p>Feels Like " + feelLikeTemp + "</p>");
    res.write("<p>The weather is currently " + desc + "</p>");
    res.write("<img src=" + imageURL + ">");
   
    res.send();
});
  
}); 


});











app.listen(3000, function(){
    console.log("server is running on 30000");
});