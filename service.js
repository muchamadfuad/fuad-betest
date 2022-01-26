const express = require("express")
const route = require("./app/route")
const cors = require("cors")
const consume = require("./app/utils/kafka")
const connect = require("./app/utils/database")
const app = express();


app.use(cors());
app.use(express.json());
app.use('/', route);

consume();
connect();

app.listen('3000', () => console.log('Server Running at port: 3000'));
