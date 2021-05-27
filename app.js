const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const https = require("https");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "&APPID=0eba3a35cf34ac6c76f87782ab489e44";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "," +
    apiKey +
    "&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const weatherdesc = weatherdata.weather[0].main;
      console.log(temp); //we can only have one res.write
      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The weather is currently " + weatherdesc + "</h1>");
      res.write(
        "<h2>The temperature in " +
          query +
          " is " +
          temp +
          " degree Celcius</h2>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
