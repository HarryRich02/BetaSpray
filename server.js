const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(express.static('static'));

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`),
);
