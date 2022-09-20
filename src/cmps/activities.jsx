import { GrSort } from "react-icons/gr"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { addNewComment } from "../store/actions/board.action"
import { ActivityList } from "./activity-list"
import { AddComment } from "./add-comment"

export const Activities = ({ activities, renderAddComments, task }) => {
    const board = useSelector(state => state.boardModule.board)
    let user = useSelector(state => state.userModule.user)

    const getUser = () => {
        return user ? user : {
            fullname: 'Guest',
            imgUrl: 'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg',
        }
    }

    const dispatch = useDispatch()

    const addComment = (comment) => {
        dispatch(addNewComment(`on ${task.title}`, task, comment))
    }
    return <section className="activities">
        <section className="header">
            <GrSort />
            <p>Activity</p>
        </section>
        {renderAddComments && <AddComment user={getUser()} addComment={addComment} />}
        {board.activities && board.activities.length !== 0 && <ActivityList activities={activities} />}
    </section>
}