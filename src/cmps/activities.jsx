import { GrSort } from "react-icons/gr"
import { useSelector } from "react-redux"
import { ActivityList } from "./activity-list"

export const Activities = ({activities}) => {
    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)
     
    return <section className="activities">
        <section className="header">
            <GrSort />
            <p>Activity</p>
        </section>
        {board.activities && board.activities.length !== 0 && <ActivityList activities={activities}/>}
    </section>
}