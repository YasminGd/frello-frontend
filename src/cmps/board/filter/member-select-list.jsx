import { useSelector } from "react-redux"

export const MemberSelectList = ({ handleChange, filterBy }) => {

    const boardMembers = useSelector(state => state.boardModule.board.members)

    return (
        <section className="member-select-list" onClick={ev => ev.preventDefault()}>
            <ul>
                {boardMembers.map(member => (
                    <li key={member._id} onClick={ev => ev.stopPropagation()}>
                        <label htmlFor={member._id}>
                            <input
                                className="checkbox"
                                type="checkbox"
                                id={member._id}
                                name="members"
                                value={member._id}
                                onChange={handleChange}
                                checked={filterBy?.members?.includes(member._id)}
                            />
                            <div className="option-container">
                                <div className="member-img img">
                                    <img src={member.imgUrl} alt="user" referrerPolicy="no-referrer" />
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