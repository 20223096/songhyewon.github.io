const express = require('express')
const app = express()

app.listen(1234)
//rest api설계

app.get('/youtubers', function(req, res) {
    res.json(db) //
}) // 다른 틀에서 사용하던 문자를 그대로 보
app.get('/youtuber/:id', function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    const youtuber = db.get(id) // 코드의 편의성을 위해 중복되는 결 변수로 따로 뺌
    if (youtuber == undefined) {
        res.json({
            message : "아무것도 아님"
        })
    } else {
        res.json(youtuber)
    }
})
app.use(express.json())
app.post('/youtuber', (req, res) => {
    console.log(req.body)

    //우리는 이렇게 들어온 데이터를 등록하고 싶음 즉 Map(db)에 저장(set) 해줘야 함
    db.set(id++, req.body) // value값에 json형태로 넣어줘도 내용이 잘 들어감
    res.json({
        //여기 안에 그냥 id라고 쓰면 set을 했을 때 1번째에 req.body받고 id는 2가 된 상태임
        //근데 그때 get을 하는 거라서 id라고 적으면 2번째가 나오게 됨 따라서 id-1d을 해줘야함
        message : db.get(id-1).channelTitle + "님, 유튜버 생활을 응원합니다"
        //고도화하면서 +쓰지 않기로 함
        //message : `${db.get(4).channelTitle}님, 유튜버 생활을 응원합니다!`
    })
})


let db = new Map()

let youtuber1 = {
    channelTitle : "십오야",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "침착맨",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "테오",
    sub : "54.8만명",
    videoNum : "726개"
}
var id = 1; // map은 json이랑 비슷하게 생김
//일단 우리는 등록을 할때 숫자가 계속 증가해야함 그래서 id++을 해줄건데
//이때 let은 블록스코프라서 함수에는 적용이 안됨 그래서 var로 써줌
db.set(id++, youtuber1)
db.set(id++, youtuber2)
db.set(id++, youtuber3)
