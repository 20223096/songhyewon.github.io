const express = require('express')
const app = express()

const port = 1234
/*
app.get('/', function(req, res) {
    res.send('hello world')
})
app.post('/test', function(req,res) {
    res.send('Hello Post')
})
    */
app.listen(port, () => {
    console.log(`Example app liestening on port ${port}`)
}) //서버가 구동된 뒤에 console찍어줘서 조금의 시간 차가 있음
//port설정할 때 콜백함수 불러서 console찍게 해줌

app.use(express.json()) // 다른모듈들을 사용하는 방법 중 하나가 use고
//json모듈을 가져오면 request날아오는 body값을 json으로 읽을 수 있음
//백엔드에서 응답을 json으로 처리하니까 프론트에서도 백엔드에 json으로 보내야함
app.post('/test', function(req, res) {
    //body에 숨겨져서 들어온 데이터를 화면에 뿌리기
    console.log(req.body.message) // 이러면 키 값이 message인 value값만 나옴
    //만약 message : post라면 post만 나오는 것임
    res.json(req.body.message)
})