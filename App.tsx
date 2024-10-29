import React from 'react';
import './App.css';

function App() {
  let name="리액트";
  //변수를 출력할 때 {} 사용
  //조건문 사용하고 싶을 때 삼항연산자, if문은 안됨
  //만약 랜더링하고 싶지 않을때 null값을 넣어주면 됨
  return (
    <>
    <div className="container">
      <h1 className = "test">Hello,
        {
          name === '리액트' ? (<h1>YES</h1>): null
        }!!
      </h1>
      <p>반갑습니다.</p>
    </div>
    </>
  );
}
//컴포넌트 내부에서 병렬로 적을 수 없음 무조건 최상위 부모가 존재해야함
//컴포넌트 내부는 즉 하나의 DOM트리로 이루어져야함

export default App;
