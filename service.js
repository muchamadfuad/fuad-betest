const express = require("express")
const mongoose = require("mongoose")
const route = require("./app/route")
const cors = require("cors")
const consume = require("./app/utils/kafka")
const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

app.use(cors());
app.use(express.json());
app.use('/',route);


consume().catch((err) => {
  console.error("error in consumer: ", err)
})

app.listen('3000',()=> console.log('Server Running at port: 3000'));
