import React from "react"
import { useNavigate } from "react-router-dom"
import { IoCloseOutline } from 'react-icons/io5'

export const TaskDetails = () => {
    const navigate = useNavigate()

    const onGoBack = () => {
        navigate(-1)
    }

    return <React.Fragment>
        <section className="task-details">
            <button className="close-task-details" onClick={onGoBack}><IoCloseOutline /></button>
        </section>
        <section onClick={onGoBack} className="screen"></section>
    </React.Fragment>
}