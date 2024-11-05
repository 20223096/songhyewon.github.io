import React, {useState, useRef, FC } from "react";
import {useTypedSelector} from '../../hooks/redux';
import {FiPlusCircle} from 'react-icons/fi';
import clsx from 'clsx';
import SideForm from './SideForm/SideForm';
import {addButton, addSection, boardItem, boardItemActive, container, smallTitle, title } from './BoardList.css';
import {Dispatch, SetStateAction} from 'react';
type TBoardListProps = { //props의 타입 정하기
    activeBoardId : string;
    setActiveBoardId : Dispatch<SetStateAction<string>>
}
const BoardList : FC<TBoardListProps>= ({ //props들의 타입을 알려줘야함
    activeBoardId,
    setActiveBoardId }) => {
    const {boardArray} = useTypedSelector(state =>state.boards);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        setIsFormOpen(!isFormOpen)
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    return (
        <div className={container}>
            <div className={title}>
                게시판 :
            </div>
            {boardArray.map((board, index) => {
                <div key = {board.boardId}
                onClick={() => setActiveBoardId(boardArray[index].boardId)}
                className={
                    clsx(
                        {
                            [boardItemActive]:
                            boardArray.findIndex(b => b.boardId === activeBoardId) === index,
                        },
                        {
                            [boardItem]:
                            boardArray.findIndex(b=>b.boardId === activeBoardId) !== index
                        }
                    )
                }>
                    <div>
                        {board.boardName}
                    </div>
                </div>
            })} {/*map으로 하나씩 순회 */}
            <div className={addSection}>
            {
                isFormOpen ?
                <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen}/>
                :
                <FiPlusCircle className={addButton} onClick={handleClick}/> //얘를 클릭했을 때 isFormoOpen 토글링

            }
            </div>

        </div>
    )
}
export default BoardList