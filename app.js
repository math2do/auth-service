const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv/config');
const express = require('express');
require('express-async-errors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');

// database
const connectDB = require('./db/connect.js');

//  routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

const app = express();

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(`Error starting server`, err);
  }
};

start();
