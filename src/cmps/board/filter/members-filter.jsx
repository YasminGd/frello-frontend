import { MenuItem, Select } from "@material-ui/core"
import { useRef } from "react"
import { useState } from "react"
import { BsPerson } from "react-icons/bs"
import { FaChevronDown } from "react-icons/fa"
import { useSelector } from "react-redux"
import { ActionModal } from "../../global/action-modal"

export const MembersFilter = ({handleChange, filterBy, updateFilter}) => {
    const user = useSelector(state => state.userModule.user)
    const board = useSelector(state => state.boardModule.board)
    const members = board.members
    const [selectMember, setSelectMember] = useState(null)
    const selectMemberRef = useRef()

    const userImgUrl = useSelector(state => state.userModule.user.imgUrl)
    if (!userImgUrl) userImgUrl = 'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg'

    const onOpenSelectMember = (type, ref) => {
        const rect = ref.current.getBoundingClientRect()
        const pos = { bottom: rect.bottom + 8, left: rect.left }
        setSelectMember({ type, pos })
    }

    const changeFilter = ({target}) => {
        if(!target.checked) filterBy = {...filterBy, members:[]}
        else filterBy = {...filterBy, members:members.map(member => member._id)}
        updateFilter(filterBy)
    }

    return (
        <section className="members-filter">
            <h3>Members</h3>
            <ul>
                <li>
                    <label htmlFor='no-members'>
                        <input
                            checked={filterBy?.members?.includes('no-members')}
                            className="checkbox"
                            type="checkbox"
                            id="no-members"
                            name="members"
                            value="no-members"
                            onChange={handleChange}
                        />
                        <div className="option-container">
                            <div className="member-img guest">
                                <span><BsPerson /></span>
                            </div>
                            <p>No Members</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label htmlFor='me'>
                        <input
                            // onChange={(ev) => {
                            // handleChange(ev, label.id)
                            // }}
                            // checked={task.labelIds?.includes(label.id)}
                            className="checkbox"
                            type="checkbox"
                            id="me"
                            name="members"
                            value={user._id}
                            checked={filterBy?.members?.includes(user._id)}
                            onChange={handleChange}
                        />
                        <div className="option-container">
                            <div className="member-img">
                                <img src={userImgUrl} alt="user" />
                            </div>
                            <p>Cards assigned to me</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label htmlFor='selecet-member'>
                        <input
                            // onChange={(ev) => {
                            // handleChange(ev, label.id)
                            // }}
                            // checked={task.labelIds?.includes(label.id)}
                            className="checkbox"
                            type="checkbox"
                            id="selecet-member"
                            checked = {filterBy?.members?.length && !(filterBy?.members?.length === 1 && filterBy?.members?.includes('no-members'))}
                            onChange = {changeFilter}
                        />
                        <div className="option-container">
                            <input
                                ref={selectMemberRef}
                                onFocus={() => { onOpenSelectMember('Select member', selectMemberRef) }}
                                className="search-member"
                                type="text"
                                placeholder={filterBy?.members?.length && !(filterBy?.members?.length === 1 && filterBy?.members?.includes('no-members')) ? `${filterBy?.members?.filter(member=> member!=='no-members').length} ${filterBy?.members?.filter(member=> member!=='no-members').length === 1 ? `member` : `members`} selected`: "Select members"} />
                            <FaChevronDown className="icon-open" />
                        </div>
                        {selectMember && <ActionModal
                            setActionModal={setSelectMember}
                            data={selectMember}
                            handleChange = {handleChange}
                            filterBy={filterBy}
                        />}

                    </label>
                </li>
            </ul>
        </section>
    )
}