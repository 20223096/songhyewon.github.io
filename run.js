/*
1. 자바스크립트 함수는 함수의 실제 매개변수가 될 수 있음
*/
function foo(arg) {
    arg()
}
function bar() {
    console.log('bar')
}
foo(bar)
/*
2. 자바스크립트 함수는 함수의 반환값이 될 수 있다.
*/
function foo(arg) {
    return arg
}
function bar() {
    console.log('bar')
}
foo(bar)()//함수를 중첩 실행
//즉 여기서 foo(bar)라고 하면 bar()함수가 불리기만 하고출력이 안됨
//중첩으로 foo(bar)()라고 해야 bar()함수가 실행이 돼서 console에 bar가 찍힘
/*
3. 자바스크립트 함수는 할당명령문의 대상이 될 수 있다.
4. 자바스크립트 함수는 동일비교의 대상이 될 수 있다.
*/
const foo = function (arg) {
    return arg;
}
foo(1)

/*
1. 기본값 매개변수 default function parameter
매개변수에 초기값 할당
*/
function foo(arg = 1) {
    console.log(arg)
}
foo()
/*
2. 나머지 매개변수 Rest parameter
*/
function foo(arg, ...rest) {
    console.log(rest)
}
foo(1)
//빈 배열만 출력됨
foo(1, 2, 3)
//[2,3]이렇게 출력됨
/*
3. arguments 객체
*/
function foo(arg) {
    console.log(arguments)
}
foo(1, 2, 3, 4)
/*
{
'0' : 1,
'1': 2,
'2': 3,
'3': 4,
length:4,
callee : f foo(),
_proto_: {}
}
function built-in 객체로 인해서 argument객체가 정의되어 있지 않지만 잘 출력됨
함수 안에 들어있는 값과 함수의 길이까지 잘 출력됨
*/
