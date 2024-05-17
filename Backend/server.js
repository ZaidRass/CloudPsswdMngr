const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer();

const app = express();

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/auth');
const authenticationMiddleware = require('./middleware/authenticate');

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.ORIGIN || 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use('/api/v1', authRouter);
app.use(authenticationMiddleware);
app.use('/api/v1/users', userRouter);

// Middleware for parsing file uploads
app.use(upload.single('file'));

app.use((req, res, next) => res.status(404).json({ message: 'Resource not found!' }));

app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server running at ${process.env.ORIGIN}`);
});
