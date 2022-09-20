import { ActivityPreview } from "./activity-preview"

export const ActivityList = ({ activities }) => {
    return <section className="activity-list">
        {
            activities.map(activity => <ActivityPreview key={activity.id} activity={activity} />)
        }
    </section>
} 