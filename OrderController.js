const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');

const order = async (req, res) => {
    const conn = await mariadb.createConnection({ // 자기가 만들어서 사용중
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'Bookshop',
        dateStrings : true
    })
    //delivery 테이블 삽입
    const {items, delivery, totalCount, totalPrice, userId, firstBookTitle} = req.body
    //delivery랑 items 둘다 json형태로 날아옴
    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES
    (?, ?, ?)`
    let values = [delivery.address, delivery.receiver, delivery.contact]
    let [results] = await conn.execute(sql, values) //근데 query는 매개변수가 두개 받기로 되었으니 콜백함수가 안 들어감
    let delivery_id = results.insertId
    sql = `INSERT INTO orders (book_title, total_count, total_price, user_id, delivery_id)
    -> VALUES (?, ?, ?, ?, ?)`;
    values = [firstBookTitle, totalCount, totalPrice, userId, delivery_id]
    [results] = await conn.execute(sql, values)
    let order_id = results.insertId
    console.log(results)

    //items를 가지고 장바구니에서 bookId, count를 조회
    sql = `SELECT bookId, count FROM cart WHERE id IN (?)`
    let [orderItems, fields] = await conn.query(sql, [items])
    //query가 배열의 순서에 맞게 반환해주고 있어서 orderItems라고 써도됨
    //조회한 걸 가지고 orderedBook에 넣어줌
    sql = `INSERT INTO orderedBook (order_id, bookId, count) VALUES ?`
    //이차원 배열을 넣을거라 그냥 ?하나만 씀
    //items.. 배열 : 요소들을 하나씩 꺼내서 (foreach문 돌려서)
    values = []
    orderItems.forEach((item) => {//이차원 배열의 형태로 들어감
    values.push([order_id, item.bookId, item.count])
    })
    results = await conn.query(sql, [values]) // 얘는 이중배열이라 execute말고 query로 하기

    let result = await deleteCartItems(conn, items)
    //얘는 delete한 결과물이 나옴
    return res.status(StatusCodes.OK).json(result)
}
const deleteCartItems = async (conn, items) => { //모듈을 만들었으니까 orders안에서 불러다 써야함
    let sql = `DELETE FROM cart WHERE id IN (?)`
    //promise 반환함 async로 감싸져 있어서
    //item에서 cartItemId꺼내서 values에 넣어줘야됨 => api 뜯어고치기
    //
    //conn은 order라는 함수 안에 포함, 이 모듈안에는 없음
    return await conn.query(sql, [items]) //await인 promise안이니까 execute써야함
    //호출하는 쪽에 result주고 싶으니까 return 해줌
    //execute 안 먹어서 query로 바꿔줘야 함
}
const getOrders= async (req, res) => {
    const conn = await mariadb.createConnection({ // 자기가 만들어서 사용중
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'Bookshop',
        dateStrings : true
    })
    let sql = `SELECT id, book_title, total_count, total_price, created_at, address, receiver, contact 
FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id `
//select의 결괏값은 [rows, fileds] 이렇게 나옴
    let [rows, fields] = await conn.query(sql)
    return res.status(StatusCodes.OK).json(rows)

}
const getOrderDetail = async (req, res) => {
    const {id} = req.params
    const conn = await mariadb.createConnection({ // 자기가 만들어서 사용중
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'Bookshop',
        dateStrings : true
    })

    let sql = `SELECT bookId, bookTitle, author, price, count FROM orderedBook LEFT 
    JOIN books ON books.id = orderedBook.bookId WHERE order_id = ?`

    let [rows, fileds] = await conn.query(sql, [id])
    return res.status(StatusCodes.OK).json(rows)
}

module.exports = {order, getOrders, getOrderDetail}