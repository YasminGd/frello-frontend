import React from "react"
import { useParams } from "react-router-dom"
import { utilService } from "../../services/util.service"

export const ActivityPreview = ({ activity }) => {
    const parames = useParams()
    const { taskId } = parames

    const timeSince = utilService.timeSince(activity.createdAt)
    return <section className="activity-preview">
        <div className="member-img">
            <img src={activity.byMember.imgUrl} referrerPolicy="no-referrer" alt="member" />
        </div>
        <section className="activity-description">
            {
                activity.comment ?
                    <React.Fragment>
                        <p>
                            <span className="username">{activity.byMember.fullname}</span>
                            {!taskId && activity.txt}
                            <span className="time">{timeSince}</span>
                        </p>
                        <div className="comment">{activity.comment}</div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <p>
                            <span className="username">{activity.byMember.fullname}</span>
                            <span className="activity-txt">{activity.txt}</span>
                        </p>
                        <p className="time">{timeSince}</p>
                    </React.Fragment>
            }

        </section>
    </section>
} 