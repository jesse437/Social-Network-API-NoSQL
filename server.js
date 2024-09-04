const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');


//sets up the express app
const app = express();
const port = process.env.PORT || 3001;


//middleware to handle json and url-encoded (form) data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//middleware for handling routes
app.use(routes);


//connects to database and then starts listening
db.once('open', () => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
    });
  });





