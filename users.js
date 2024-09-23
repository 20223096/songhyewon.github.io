const express = require('express')
const router = express.Router()
const conn = require('../db-demo')
router.use(express.json())
const {body, param, validationResult} = require('express-validator')
//jwt모듈
const jwt = require('jsonwebtoken')
//dotenv 모듈
const dotenv = require('dotenv')
dotenv.config()

const validate = (req,res,next) => {
    const err = validationResult(req)
    if (err.isEmpty()) {
        return next()
    } else{
        return res.status(400).json(arr.array())
    }
}

router.post('/login',
    [
        body('email').notEmpty().isEmail().withMessage('이메일 입력 잘못됨'),
        body('password').notEmpty().isInt().withMessage('비밀번호 입력 잘못됨'),
        validate
    ]
    ,function(req, res, next) {
    const {email, password} = req.body
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(
        sql, email,
        function (err, results) {
            if(err) {
                return res.status(400).end()
            }
            
            var loginUser = results[0]
            if (loginUser && loginUser.password == password){
                //token발급
                const token = jwt.sign({
                    email : loginUser.email,
                    name : loginUser.name
                }, process.env.PRIVATE_KEY, {
                    expiresIn : '30m', issuer : "songa" //유효기간 설정
                });

                res.cookie("token", token, {httpOnly : true}) //token이라는 상자 마련해서 그 안에 token넣어줌
                    //cookie에는 여러가지 값을 담아줄 수 있음
                res.status(200).json({
                    message : `${loginUser.name}님 로그인 되었습니다.`,
                })
            }
            else
                res.status(403).json({
                    message : "이메일 또는 비밀번호가 잘못됐습니다."
                })
        }
    );
})
//회원가입
router.post('/join',
    [
        body('email').notEmpty().isEmail().withMessage('이메일이 유효해야함'),
        body('name').notEmpty().isString().withMessage('이름이 유효해야함'),
        body('password').notEmpty().isInt().withMessage('비밀번호가 유효해야함'),
        body('phone').isString().withMessage('전화번호 유효해야함'),
        validate
    ]
    ,function(req, res, next) {
        const {email, name, password, phone} = req.body
        let sql = `INSERT INTO users (email, name, password, phone)
                VALUES (?, ?, ?, ?)`
        let values = [email, name, password, phone]
        conn.query(sql, values,
            function (err, results) {
                if (err) {
                    return res.status(400).end()
                }
                res.status(201).json(results)
            }
        )
    }
)
router
    .route('/users')
    .get(
        [
            body('email').notEmpty().isEmail().withMessage('이메일이 유효하지 않음'),
            validate
        ]
        ,function(req, res ,next) {
        let {email} = req.body
        let sql = `SELECT * FROM users WHERE email = ?`
        conn.query(sql, email,
            function (err, results) {
                if (err) {
                    return res.status(400).end()
                }
                
                res.status(200).json(results)
            }
        );
    })
    .delete(
        [
            body('email').notEmpty().isEmail().withMessage('이메일이 유효하지 않음'),
            validate
        ]
        ,function(req, res, next) {
        var {email} = req.body
            let sql = `DELETE FROM users WHERE email = ?`
            conn.query(sql, email,
                function(err, results, fields) {
                    if (err) {
                        return res.status(400).end()
                    }

                    if (results.affectedRows == 0) {
                        return res.status(400).end()
                    } else {
                        res.status(200).json(results)
                    }
                }
            );
        }
    )

module.exports = router
//다른 파일에서 사용할 수 있도록 모듈화하는 부분