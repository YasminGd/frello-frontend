import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { IoCloseOutline } from 'react-icons/io5'
import { useSelector } from "react-redux"
import { GrCreditCard } from "react-icons/gr"

export const TaskDetails = () => {
    const navigate = useNavigate()
    const { groupId, taskId } = useParams()
    const [titleTxt, setTitleTxt] = useState()
    useEffect(() => {
        setTitleTxt(task.title)
    })

    const board = useSelector(state => state.boardModule.board)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)

    const onGoBack = () => {
        navigate(-1)
    }

    return <React.Fragment>
        <section className="task-details">
            <button className="close-task-details" onClick={onGoBack}><IoCloseOutline /></button>
            <div className="task-header">
                <GrCreditCard className="header-icon" />
                <textarea name="" value={titleTxt}></textarea>
                <div className="sub-title">in list {group.title}</div>
            </div>
            <div className="task-body">
                <div className="task-content"></div>
                <div className="task-navbar"></div>
            </div>
        </section>
        <section onClick={onGoBack} className="screen"></section>
    </React.Fragment>
}