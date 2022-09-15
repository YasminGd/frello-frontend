import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { IoCloseOutline } from 'react-icons/io5'
import { GrCreditCard } from "react-icons/gr"
import { BsPerson, BsCheck2Square } from "react-icons/bs"
import { AiOutlineTag, AiOutlineClockCircle } from "react-icons/ai"
import { ImAttachment } from "react-icons/im"
import { boardService } from "../services/board.service"
import { useDispatch } from "react-redux"

export const TaskDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { groupId, taskId } = useParams()

    const board = useSelector(state => state.boardModule.board)
    const group = board.groups.find(group => group.id === groupId)
    const task = group.tasks.find(task => task.id === taskId)
    const [titleTxt, setTitleTxt] = useState(task.title)

    const handleChange = ({ target }) => {
        const { value } = target
        setTitleTxt(value)
    }

    const setTaskTitle = () => {
        dispatch()
    }

    const onGoBack = () => {
        navigate(-1)
    }

    return <React.Fragment>
        <section className="task-details">
            <button className="close-task-details" onClick={onGoBack}><IoCloseOutline /></button>
            <div className="task-header">
                <GrCreditCard className="header-icon" />
                <textarea name=""
                    value={titleTxt}
                    onChange={handleChange}
                    onBlur={setTaskTitle} />
                <div className="sub-title">in list {group.title}</div>
            </div>
            <div className="task-body">
                <div className="task-content"></div>
                <div className="task-sidebar">
                    <h3 className="sidebar-title">Add to card</h3>
                    <button className="btn-sidebar"><BsPerson className="icon" />Members</button>
                    <button className="btn-sidebar"><AiOutlineTag className="icon" />Labels</button>
                    <button className="btn-sidebar"><BsCheck2Square className="icon" />Checklist</button>
                    <button className="btn-sidebar"><AiOutlineClockCircle className="icon" />Dates</button>
                    <button className="btn-sidebar"><ImAttachment className="icon" />Attachments</button>
                </div>
            </div>
        </section>
        <section onClick={onGoBack} className="screen"></section>
    </React.Fragment>
}