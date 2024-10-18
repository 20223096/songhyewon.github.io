/*
1. 함수 선언문
2. 함수 표현식
3. Function 생성자 함수
4. 화살표 함수 표현식
*/
//1
function foo() {
    console.log('foo');
}
foo();
//2
const foo = function() {
    console.log('foo')
}
foo()
//3
const foo = new Function("console.log('foo3')")
foo()
//foo3이 출력됨
//4
const foo = () => {
    console.log('foo4')
}
foo()