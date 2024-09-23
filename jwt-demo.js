var jwt = require('jsonwebtoken'); //jwt 모듈 소환
var dotenv = require('dotenv');

dotenv.config(); //.env라는 설정 사용하겠다고 얘기함
var token = jwt.sign({foo : 'bar'}, process.env.PRIVATE_KEY);
//token 생성 = jwt서명을 했다. 첫번째 변수 foo는 payload고 두번째 매개변수는 privatekey
//privatekey는 jwt에다가 나만의 알고리즘 키를 하나 더 해서 넣는 것(안전하게 하려고)
//즉 서명할 때는 payload와 나만의 암호키가 필요함 + 알고리즘은 SHA256(우리가 만드는 게 아니라 정해져있음)
//서명 = 토큰 발행

console.log(token);

//검증
//만약 검증에 성공하면 페이로드 값을 확인할 수 있음
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);
//토큰 발행 잘 됐고 json으로 console에 값이 찍힘
//토큰이 발행된 시간을 초형태로 나타낸 게 iat임