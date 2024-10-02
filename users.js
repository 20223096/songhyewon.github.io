const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes'); //status code 모듈
router.use(express.json());
const conn = require('../mariadb');
const jwt = require('jsonWebtoken')
const {join, login, passwordResetRequest, passwordReset} = require('../controller/UserController')
const dotenv = require('dotenv')
dotenv.config()
const {body, param, validationResult} = require('express-validator')

const validate = (req, res, next) => {
    const err = validationResult(req)
    if (err.isEmpty()) {
        return next();
    } else {
        return res.status(400).json(err.array())
    }
}

router.post('/join', join)

router.post('/', login)

router.post('/reset', passwordResetRequest)

router.put('/reset', passwordReset)

module.exports = router;
