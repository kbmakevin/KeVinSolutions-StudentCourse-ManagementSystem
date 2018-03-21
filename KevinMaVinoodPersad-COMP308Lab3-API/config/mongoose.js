/**
 * 
 * @file        mongoose.js
 * @description this file configures mongoose and registers our different models
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */

const config = require("./config");
const mongoose = require("mongoose");

mongoose.connect(config.db);
const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'connection error:'));
mongoDB.once('open', () => {
    console.log(`Connected to MongoDB at ${config.db}`);
});

module.exports = mongoDB;