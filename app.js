import 'dotenv/config';
import express from 'express';
import connectDB from './db/connect.js';
// finish import

const app = express();
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });

  } catch (err) {
    console.log(err);
  }
};

start();
