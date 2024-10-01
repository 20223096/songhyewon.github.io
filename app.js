//express 모듈
const express = require('express');
const app = express();

//dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

app.listen(1234);
//유의미한 포트 번호 지정

const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const cartRouter = require('./routes/cart');
const likesRouter = require('./routes/likes');
const ordersRouter = require('./routes/orders');

app.use("/users", userRouter);
app.use("/books", booksRouter);
app.use("/likes", likesRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
