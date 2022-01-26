const mongoose = require("mongoose")

require('dotenv').config();

const connect = async () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Database Connected'));
}

module.exports = connect

