import React, {ChangeEvent, FC, useState } from "react";
import {FiCheck} from 'react-icons/fi';
import {input, sideForm, icon} from './SideForm.css';
import {useTypedDispatch} from '../../../hooks/redux';
import {addBoard} from '../../../store/slices/boardsSlice';
import {v4 as uuidv4} from 'uuid';
import {addLog} from "../../../store/slices/loggerSlice";
type TSideFormProps ={
    setIsFormOpen : React.Dispatch<React.SetStateAction<boolean>>,
    inputRef : React.RefObject<HTMLInputElement>;
}
const SideForm : FC<TSideFormProps> = ({
    setIsFormOpen,
    inputRef
}) => {
    const [inputText, setInputText] = useState('');
    const dispatch = useTypedDispatch();
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }
    const handleOnBlur = () => {
        setIsFormOpen(false);
    }
    const handleClick = () => {
        //타이핑 했을 때만 진행이 되도록
        if (inputText) {
            dispatch(
                addBoard({board : {boardId : uuidv4(),
                    boardName : inputText, lists : []}})
            );
            dispatch(
                addLog({
                    logId : uuidv4(),
                    logMessage : `게시판 등록: ${inputText}`,
                    logAuthor : "User",
                    logTimestamp : String(Date.now())
                })
            );
            setIsFormOpen(false);
        }
    }
    return (
        <div className={sideForm}>
            <input ref={inputRef}
            autoFocus
            className={input}
            type='text' placeholder ='새로운 게시판 등록하기' value={inputText} onChange={handleChange} onBlur={handleOnBlur}/>
            <FiCheck className={icon} onMouseDown={handleClick}/> {/*onmousedown이 먼저 mouseup이 다음 click이 다음 이벤트임 이게 이벤트 순서 */}
        </div>
    )
}

export default SideForm;