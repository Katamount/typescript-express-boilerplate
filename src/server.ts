import app from './app';
import mongoose = require("mongoose");

const PORT = process.env.PORT;

// logger.info(process.env.MONGO_URL);
const MONGODB_CONNECTION: string = "mongodb://" + process.env.MONGO_URL + "/" + process.env.DB_NAME;

app.listen(PORT, () => {
  mongoose.connect(MONGODB_CONNECTION);
  console.log('Express server listening on port ' + PORT);
})