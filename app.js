const express = require('express');
const fs = require('fs');

const app = express ();

let climbs = require("./data/climbs.json");
let comments = require("./data/comments.json");

app.use(express.json());
app.use(express.static('static'));

