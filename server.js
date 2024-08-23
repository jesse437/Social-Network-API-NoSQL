const express = require("express");
const mongodb = require("mongodb").MongoClient;
// We import the ObjectId class from mongodb
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

let db;

const dbName = "";
