import {useState} from "react";
/*
const Timer : React.FC = () => {
    const [seconds, setSeconds] = useState<number>(0);
    return(
        <div>
            <h2>타이머 : {seconds}초</h2>
            <button onClick={function(){
                setInterval(()=>{
                    setSeconds((prev)=>prev + 1); //return이 생략되어 있는 것임 이전거에 1더해서 리턴
                }, 1000) // 주기 설정 1초마다 중괄호 안에 있는 내용 실행
            }}></button>
        </div>
    )
}
export default Timer;
*/
const Clock : React.FC = () => {
    const [time, setTime] = useState(new Date()); //객체 생성해서 집어넣기
    setInterval(()=>{
        setTime(new Date());
    }, 1000);
    return(
        <div>
            현재 시간 : {time.toLocaleTimeString()} {/*현재 시간이 한번만 업데이트됨 */}
            
        </div>
    )
}
export default Clock;

