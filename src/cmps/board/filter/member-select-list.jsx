import { useSelector } from "react-redux"

export const MemberSelectList = () => {

    const boardMembers = useSelector(state => state.boardModule.board.members)

    return (
        <section className="member-select-list">
            <ul>
                {boardMembers.map(member => (
                    <li key={member._id}>
                        <label htmlFor={member._id}>
                            <input
                                // onChange={(ev) => {
                                // handleChange(ev, label.id)
                                // }}
                                // checked={task.labelIds?.includes(label.id)}
                                className="checkbox"
                                type="checkbox"
                                id={member._id}
                            />
                            <div className="option-container">
                                <div className="member-img">
                                    <img src={member.imgUrl} alt="user" />
                                </div>
                                <p>{member.fullname}</p>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    )
}