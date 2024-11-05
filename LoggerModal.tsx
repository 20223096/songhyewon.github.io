import React, {FC} from "react";
import {useTypedSelector} from '../../hooks/redux'
import {Fix} from 'react-icons/fi';
import {wrapper, header, modalWindow, closeButton, title, body} from './LoggerModal.css'
import LogItem from './LogItem/LogItem'
type TLoggerModalProps = {
    setIsLoggerOpen : React.Dispatch<React.SetStateAction<boolean>>
}

const LoggerModal : FC<TLoggerModalProps> = ({
    setIsLoggerOpen
}) => {
    const logs = useTypedSelector(state => state.logger.logArray);
    return (
        <div className={wrapper}>
            <div className={modalWindow}>
                <div className={header}>
                    <div className={title}>활동 기록</div>
                    <Fix className={closeButton}onClick={() => setIsLoggerOpen(false)} />
                </div>
                <div className={body}>
                    {logs.map((log, index) => (
                        <LogItem key={log.logId} logItem = {log}/>
                    ))}
                </div>
            </div>
            </div>
    )
}
export default LoggerModal;