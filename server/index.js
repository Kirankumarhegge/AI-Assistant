const express = require('express');
const cors = require('cors');
const { mongoDBConnection } = require('./utils/databaseConnection.js');
const authRoute = require("./routes/authRoute.js");
const chatRoute = require("./routes/chatRoute.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoDBConnection();

app.use('/auth', authRoute);
app.use('/chat', chatRoute);

app.listen(3001, () => {
    console.log("Server is running on port : 3001");
})
