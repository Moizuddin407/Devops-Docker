require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./routes/login.route');
const conferencecreate= require('./routes/conferencecreate.route');

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/api/conferences', conferencecreate);

app.listen(port, () => {
    console.log(`Server running on: ${port}`);
});