const express = require('express');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const routes = require("./routes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(routes);


const connectionStringURI = `mongodb://localhost/`;
const dbName = 'socialNetwork';


mongoose.connect(process.env.MONGODB_URI || connectionStringURI+dbName, {
    useFindAndModify: false,
    useNewUrlParser: true,
    userUnifiedTopology: true
});

mongoose.set('debug', true)

app.listen(PORT, ()=> console.log(`Server connected to localhost:${PORT}`));