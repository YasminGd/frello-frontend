import { MenuItem, Select } from "@material-ui/core"
import { useRef } from "react"
import { useState } from "react"
import { BsPerson } from "react-icons/bs"
import { FaChevronDown } from "react-icons/fa"
import { useSelector } from "react-redux"
import { ActionModal } from "../../global/action-modal"

export const MembersFilter = () => {

    const [selectMember, setSelectMember] = useState(null)
    const selectMemberRef = useRef()

    const userImgUrl = useSelector(state => state.userModule.user.imgUrl)
    if (!userImgUrl) userImgUrl = 'http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg'

    const onOpenSelectMember = (type, ref) => {
        const rect = ref.current.getBoundingClientRect()
        const pos = { bottom: rect.bottom + 8, left: rect.left }
        setSelectMember({ type, pos })
    }

    // const toggleSelectMember = () => {
    //     setSelectMember(prevState => {
    //         if (prevState) return null
    //         else return { type: 'Select member', ref: selectMemberRef }
    //     })
    // }

    return (
        <section className="members-filter">
            <h3>Members</h3>
            <ul>
                <li>
                    <label htmlFor='no-members'>
                        <input
                            // onChange={(ev) => {
                            // handleChange(ev, label.id)
                            // }}
                            // checked={task.labelIds?.includes(label.id)}
                            className="checkbox"
                            type="checkbox"
                            id="no-members"
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
                        />
                        <div className="option-container">
                            <input
                                ref={selectMemberRef}
                                onFocus={() => { onOpenSelectMember('Select member', selectMemberRef) }}
                                // onBlur={() => { setSelectMember(null) }}
                                // onClick={() => { toggleSelectMember() }}
                                className="search-member"
                                type="text"
                                placeholder="Selecet members" />
                            <FaChevronDown className="icon-open" />
                        </div>
                        {selectMember && <ActionModal
                            setActionModal={setSelectMember}
                            data={selectMember}
                        />}

                    </label>
                </li>
            </ul>
        </section>
    )
}