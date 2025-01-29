const express = require('express');
const fs = require('fs');

const app = express ();

let climbs = require("./data/climbs.json");
let comments = require("./data/comments.json");

app.use(express.json());
app.use(express.static('static'));

app.get("/api/climb/get", function(req, resp){
    const index = parseInt(req.query.i);
    resp.send(climbs[index]);
});

app.post("/api/climb/add", function(req, resp){
    let name = req.body.floatingName;
    let diff = req.body.floatingDifficulty;
    let imgURL = req.body.floatingImageURL;

    let newClimb = {"name": name, "difficulty": diff, "imgURL": imgURL};
    console.log("new climb");
    console.log(newClimb);
    climbs.push(newClimb);

    let climbsText = JSON.stringify(climbs);
    fs.writeFileSync("./data/climbs.json", climbsText);
    resp.send(200);
});

app.get("/api/comment/get", function(req, resp){
    const name = req.query.name;

    resp.send(comments
        .filter(climb => climb.name === name)
        .map(climb => climb.text)
    );
});

app.post("/api/comment/add", function(req, resp){
    const climb = document.getElementById("climbName").innerHTML
    let text = req.body.commentText;

    let newComment = {"climb": climb, "text": text};
    console.log("new comment");
    console.log(newComment);
    comments.push(newComment);

    let commentsText = JSON.stringify(comments);
    fs.writeFileSync("./data/comments.json", commentsText);
    resp.send(200);
})

module.exports = app;