const express = require('express');
const fs = require('fs');

const app = express();

const climbs = require('./data/climbs.json');
const comments = require('./data/comments.json');

app.use(express.json());
app.use(express.static('static'));

app.get('/api/climb/get', (req, resp) => {
    const index = parseInt(req.query.i, 10);
    resp.send(climbs[index]);
});

app.post('/api/climb/add', (req, resp) => {
    const name = req.body.floatingName;
    const diff = req.body.floatingDifficulty;
    const imgURL = req.body.floatingImageURL;

    const newClimb = { name: name, difficulty: diff, imgURL: imgURL };
    console.log('new climb');
    console.log(newClimb);
    climbs.push(newClimb);

    const climbsText = JSON.stringify(climbs);
    fs.writeFileSync('./data/climbs.json', climbsText);
    resp.send(200);
});

app.get('/api/comment/get', (req, resp) => {
    const { name } = req.query;

    resp.send(
        comments
            .filter((climb) => climb.name === name)
            .map((climb) => climb.text),
    );
});

app.post('/api/comment/add', (req, resp) => {
    const { climb } = req.query;
    const text = req.body.commentText;

    const newComment = { climb: climb, text: text };
    console.log('new comment');
    console.log(newComment);
    comments.push(newComment);

    const commentsText = JSON.stringify(comments);
    fs.writeFileSync('./data/comments.json', commentsText);
    resp.send(200);
});

module.exports = app;
