import { GrSort } from "react-icons/gr"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { addNewComment } from "../store/actions/board.action"
import { ActivityList } from "./activity-list"
import { AddComment } from "./add-comment"

export const Activities = ({ activities, renderAddComments, task }) => {
    const board = useSelector(state => state.boardModule.board)
    const user = useSelector(state => state.userModule.user)

    const dispatch = useDispatch()

    const addComment = (comment) => {
        dispatch(addNewComment(`on ${task.title}`, task, comment))
    }
    return <section className="activities">
        <section className="header">
            <GrSort />
            <p>Activity</p>
        </section>
        {renderAddComments && <AddComment user={user} addComment={addComment} />}
        {board.activities && board.activities.length !== 0 && <ActivityList activities={activities} />}
    </section>
}