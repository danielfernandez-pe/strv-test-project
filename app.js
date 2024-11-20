const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');

app.use(authRoutes);

app.listen(3000);