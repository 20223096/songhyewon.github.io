const conn = require('../mariadb')
const {StatusCodes} = require('http-status-codes')

const addLike = (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    //얘는 params에서 나올 때 id로 나옴 그래서 liked_book_id가 아니라
    //id로 받아야함
    const {user_id} = req.body
    //좋아요 추가
    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES
    (?, ?)`
    let values = [user_id, id]
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        return res.status(StatusCodes.OK).json(results)
    })
}
const removeLike = (req, res) => {
    let {id} = req.params
    id = parseInt(id)
    //얘는 params에서 나올 때 id로 나옴 그래서 liked_book_id가 아니라
    //id로 받아야함
    const {user_id} = req.body
    //좋아요 추가
    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id =?`
    let values = [user_id, id]
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        if(results.affectedRows == 0) {
            return res.status(StatusCodes.BAD_REQUEST).end()
        } else {
            return res.status(StatusCodes.OK).json(results)
        }
    })
}

module.exports = {addLike, removeLike}