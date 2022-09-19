import { utilService } from "../services/util.service"

export const ActivityPreview = ({ activity }) => {

    const timeSince = utilService.timeSince(activity.createdAt)
    return <section className="activity-preview">
        <div className="member-img">
            <img src={activity.byMember.imgUrl} />
        </div>
        <section className="activity-description">
            <p><span className="username">{activity.byMember.fullname}</span>{` ${activity.txt}`}</p>
            <p className="time">{timeSince}</p>
        </section>
    </section>
} 