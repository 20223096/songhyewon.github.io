const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const router = express.Router()
const express = require('express')
// {카테고리 별, 신간 여부} 전체 도서 목록 조회
const allBooks = (req, res) => {
    let {category_id, news, currentPage, limit} = req.query
    //limit : 페이지 당 도서 수
    //currentPage : 현재 몇 페이지인지
    let offset = limit * (currentPage - 1)
    let sql = `SELECT * FROM books`
    let values = []
    //offset과 limit은 문자면 오류가 남 숫자로 바꿔줘야함
    if (category_id && news) {
        sql+= "WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()"
        values.push(category_id)
    }
    else if (category_id) {
        sql += "WHERE category_id=?"
        values.push(category_id)
    } else if (news) {
        sql += "WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()"
    }
    sql += "LIMIT ? OFFSET ?"
    values.push(parseInt(limit), parseInt(offset))
    
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                    return res.status(Statuscodes.BAD_REQUEST).end()
                }
                if (results.length) {
                    return res.status(StatusCodes.OK).json(results)
                } else {
                    return res.status(StatusCodes.NOT_FOUND).end()
                }
            }
        )
    }

const bookDetail = (req, res) => {
    var {id} = req.params //req.params가 json형태이기 때문에 비구조화로 왼쪽에 값이 들어갈 수 있음 근데
    //var {id} = parseInt(req.params) 이렇게 한 줄로 줄여버리면 들어갈 수가 없음 req.params가 json이 아니게 되기 때문에
    id = parseInt(id)
    let sql = `SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?`
    conn.query(sql, id, (err, results) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        if (results[0]) {
            return res.status(StatusCodes.OK).json(results[0])
            //results라고 보내면 도서는 한 권인데 배열로 날아감 그래서 results[0]으로 보내주는 게 좋음
        } else {
            return res.status(StatusCodes.NOT_FOUND).end()
        }
    })
}

module.exports = {bookDetail, booksByCategory, allBooks}