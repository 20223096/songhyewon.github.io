/*
1. IIFE (즉시 실행 함수)
2. 재귀함수
3. 중첩함수
4. 콜백함수
*/
//1
(function foo() {
    console.log('foo')
})() //=> 이렇게 하면 호출하지 않고도 만들자마자 바로 실행됨
//2
function foo(arg) {
    if (arg === 3) return //=> 종료시키기 위한 조건문
    console.log(arg)
    foo(arg + 1)
}
foo(1)
//3 내부 함수라고도 하고 중첩함수라고도 함
function foo(arg) {
    function bar() {
        console.log(arg)
    }
    bar()
}
foo(1)
//4
function foo(arg) {
    arg()
}
foo(() => {console.log(1)})
//foo 함수가 호출되고 인자로 () => {console.log(1);}이 전달됨
//foo 함수 안에서 arg()가 실행되는데 이때 arg는 전달된 화살표 함수입니다.
//따라서 console.log(1)이 실행되어 숫자1이출력됨