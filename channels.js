const express = require('express')
const router = express.Router()

router.use(express.json())
const conn = require('../db-demo')
const {body, param, validationResult} = require('express-validator')

const validate = (req, res, next) => {
    const err = validationResult(req)
    if (err.isEmpty()) {
        return next();
    } else {
        return res.status(400).json(err.array())
    }
}

router
    .route('/')
    .get(
        [
            body('user_id').notEmpty().isInt().withMessage('숫자 입력 필요'),
            validate
        ]
        ,(req, res, next)=> {
            var {user_id} = req.body
            let sql = `SELECT * FROM posts WHERE user_id=?`
                    conn.query(sql,user_id,
                        function(err, results) {
                            if (err) {
                                return res.status(400).end()
                            }
                        if (results.length) {
                            res.status(200).json(results)
                        } else {
                            notFoundChannel(res)
                        }
                    })
        }
    )
    .post(
        [
            body('user_id').notEmpty().isInt().withMessage('user_id는 숫자여야함'),
            body('name').notEmpty().isString().withMessage('문자로 입력하자'),
            validate
        ]
        ,(req, res, next) => {
        const {name, user_id} = req.body
        let sql = `INSERT INTO posts (name, user_id) VALUES (?, ?)`
        let values = [name, user_id]
            conn.query(sql, values,
                function(err, results) {
                    if(err)
                        return res.status(400).end()
                    res.status(201).json(results)
                }
            )
        }
    )
router
    .route('/:id')
    .get(
        [
            param('id').notEmpty().withMessage('채널 id 필요'),
            validate
        ]
        ,(req, res, next) => {
            let {id} = req.params
            id = parseInt(id)
            let sql = `SELECT * FROM posts WHERE id =?`
            conn.query(sql, id,
                function(err, results) {
                    if (err) {
                        console.log(err)
                        return res.status(400).end()
                    }

                if (results.length) {
                    res.status(200).json(results)
                }
                else{
                    notFoundChannel(res)
                }
            }
        )
    })
    .put(
        [param('id').notEmpty().withMessage('채널 id 필요'),
        body('name').notEmpty().isString().withMessage('채널명 오류'),
        validate
        ]
        ,(req, res, next) => {
            
        let {id} = req.params
        id = parseInt(id)
        let {name} = req.body

        let sql = `UPDATE posts SET name=?
        WHERE id=?`
        let values = [name, id]
        conn.query(sql, values,
            function(err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }

                res.status(200).json(results)
            }
        )
    })
    .delete(
        [
        param('id').notEmpty().withMessage('채널id 필요'),
        validate
        ]
        ,(req, res, next) => {
        let {id} = req.params
        id = parseInt(id)
        let sql = `DELETE FROM posts WHERE id =?`
        conn.query(sql, id,
            function(err, results) {
                if (err) {
                    console.log(err)
                    return res.status(400).end()
                }
                if (results.affectedRows == 0) {
                    return res.status(400).end()
                } else {
                    res.status(200).json(results)
                }
            }
        )
    })
function notFoundChannel(res) {
    res.status(400).json ({
        message : "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router
