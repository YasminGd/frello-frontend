import { ActivityPreview } from "./activity-preview"

export const ActivityList = ({activities}) => {
    console.log(activities);
    return <section className="activity-list">
        {
            activities.map(activity => <ActivityPreview activity={activity}/>)
        }
    </section>
} 