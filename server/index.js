const express = require("express");
const app = express();
var request = require('request');
var cors = require('cors')

app.use(cors())
app.get("/get", (req, res) => {
    var options = {
        'method': 'GET',
        'url': 'http://newsapi.org/v2/everything?q=bitcoin&from=2020-11-30&sortBy=publishedAt&apiKey=9bd313e14c144e888df672a34a0b29a0',
        
      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body)
        res.send(response.body);
      });
});

app.listen(3005, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Listening open PORT 3005`);
    }
  });