const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/auth');
const authenticationMiddleware = require('./middleware/authenticate');

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.ORIGIN, 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use('/api/v1', authRouter);
app.use(authenticationMiddleware);
app.use('/api/v1/users', userRouter);

app.use((req, res, next) => res.status(404).json({ message: 'Resource not found!' }));

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.ORIGIN}`);
});
