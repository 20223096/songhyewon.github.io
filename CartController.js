const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
//장바구니 담기
const addToCart = (req, res) => {
    const {bookId, user_id, count} = req.body
    let sql = `INSERT INTO cart (bookId, count, user_id) VALUES(?, ?, ?)`
    let values = [bookId, user_id, count]
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end()
        } else {
            return res.status(StatusCodes.OK).json(results)
        }
    })

}
//장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
    const {user_id, selected} = req.body // selected = [1,3]

    let sql = `SELECT cart.id, bookId, title, summary, count, price 
    FROM cart LEFT JOIN books 
    ON cart.bookId = books.id WHERE user_id=? AND cart.id IN (?)`
    let values = [user_id, selected]
    conn.query(sql, values, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end()
        } else {
            return res.status(StatusCodes.OK).json(results)
        }
    })
}
//장바구니 도서 삭제
const removeCartItem = (req, res) => {
    let bookId = req.params.id
    bookId = parseInt(bookId)
    let sql = `DELETE FROM cart WHERE bookId = ?`
    conn.query(sql, bookId, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        return res.status(StatusCodes.OK).json(results)
    })
}

module.exports = { addToCart, getCartItems, removeCartItem
}