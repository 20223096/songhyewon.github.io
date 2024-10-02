const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes');
const crypto = require('crypto') // crptyo 모듈 : 암호화 담당
//콜백함수만 가져와서 변수에 담아준 후 모듈화 함
const join = (req, res) => {
    const {email, password} = req.body
    let sql = `INSERT INTO users (email, password, salt) VALUES (?, ?, ?)`;
    //비밀번호 암호화
    //암호화된 비번과 salt값을 같이 db에 저장
    const salt = crypto.randomBytes(64).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')

    //hashing은 문자를 암호화하고 싶을 때 사용하기도 함
    let values = [email, hashPassword, salt]

    conn.query(sql, values,
        (err, results) => {
            if (err) { //db상의 에러가 나지 않으면
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end(); //BAD REQUEST로 끝
            }
            return res.status(StatusCodes.CREATED).json(results) //GOOD REQUEST로 끝
        }
    )
}
const login = (req, res) => {
    const {email, password} = req.body
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(sql, email,
        function (err, results) {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end()
            }

            var loginUser = results[0]
            //로그인 시 이메일& 비밀번호 (날 것) => salt값 꺼내서 비밀번호 암호화 해보고
            const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64')
            //디비 비밀번호랑 비교

            if (loginUser && loginUser.password == hashPassword) {
                const token = jwt.sign({
                    email : loginUser.email,
                }, process.env.PRIVATE_KEY,{
                    expiresIn : '30m', issuer : "songa"
                })
                res.cookie("token", token, {httpOnly : true})
                //토큰 발행해서 cookie에 넣어주기 httpOnly라는 설정으로 보내줌
                return res.status(StatusCodes.OK).json({
                    message : "환영합니다."
                })
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end()
                //403이 forbidden임 금지됨 (접근 권리 없음), unauthorized는 말 그대로 미인증을 의미
            }
        })
};
const passwordResetRequest = (req, res) => {
    const {email} = req.body
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(sql, email,
        (err, results) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
            const user = results[0]
            if(user) {
                return res.status(StatusCodes.OK).json({ email : email})
            } else {
                return res.status(StatusCodes.UNAUTHORIZED).end()
            }
        }
    )
}
const passwordReset = (req, res) => {
    const {password, email} = req.body

    let sql = `UPDATE users SET password = ?, salt = ? WHERE email=?`

    const salt = crypto.randomBytes(10).toString('base64')
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64')
    let values = [hashPassword, salt, email]
    conn.query(sql, values,
        (err, results) => {
            if (err) {
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
            if(results.affectedRows == 0) { // 업데이트가 안 된 거임
                return res.status(StatusCodes.BAD_REQUEST).end()
            }
            return res.status(StatusCodes.OK).json(results)
        }
    
    )
}
module.exports = {
    join, login, passwordResetRequest,  passwordReset
} //json써서 모듈 다 보내기
