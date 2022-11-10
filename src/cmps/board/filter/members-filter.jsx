import { useRef } from "react"
import { useState } from "react"
import { BsPerson } from "react-icons/bs"
import { FaChevronDown } from "react-icons/fa"
import { useSelector } from "react-redux"
import { ActionModal } from "../../global/action-modal"

export const MembersFilter = ({ handleChange, filterBy, updateFilter }) => {
  const user = useSelector((state) => state.userModule.user)
  const board = useSelector((state) => state.boardModule.board)
  const members = board.members
  const [selectMember, setSelectMember] = useState(null)
  const selectMemberRef = useRef()

  let userImgUrl = useSelector((state) => state.userModule.user?.imgUrl)
  if (!userImgUrl)
    userImgUrl =
      "http://res.cloudinary.com/frello/image/upload/v1663584273/u9nkwkywyxv8mogk9q2b.jpg"

  const onOpenSelectMember = (type, ref) => {
    const rect = ref.current.getBoundingClientRect()
    const pos = { bottom: rect.bottom + 8, left: rect.left }
    setSelectMember({ type, pos })
  }

  const changeFilter = ({ target }) => {
    if (!target.checked)
      filterBy = { ...filterBy, member: { ...filterBy.member, memberIds: [] } }
    else
      filterBy = {
        ...filterBy,
        member: {
          ...filterBy.member,
          memberIds: members.map((member) => member._id),
        },
      }
    updateFilter(filterBy)
  }
  return (
    <section
      className="members-filter filter"
      onClick={(ev) => ev.stopPropagation()}
    >
      <h3>Members</h3>
      <ul>
        {/* No members filter list item */}
        <li>
          <label htmlFor="no-members">
            <input
              checked={filterBy.member?.includeNoLabels}
              className="checkbox"
              type="checkbox"
              id="no-members"
              name="no-members"
              value="no-members"
              onChange={handleChange}
            />
            <div className="option-container">
              <div className="member-img guest no-img img">
                <span>
                  <BsPerson />
                </span>
              </div>
              <p>No members</p>
            </div>
          </label>
        </li>
        {/* filter user own tasks list item */}
        {user?.username !== "Guest" && (
          <li>
            <label htmlFor="me">
              <input
                className="checkbox"
                type="checkbox"
                id="me"
                name="member"
                value={user._id}
                checked={filterBy?.member?.memberIds?.includes(user._id)}
                onChange={handleChange}
              />
              <div className="option-container">
                <div className="member-img img">
                  <img
                    src={userImgUrl}
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p>Cards assigned to me</p>
              </div>
            </label>
          </li>
        )}
        {/* select member to filter list item */}
        <li className="select-member-li">
          <label htmlFor="select-member" className="select-member-label">
            <input
              className="checkbox member-search"
              type="checkbox"
              id="select-member"
              checked={!!filterBy.member?.memberIds?.length}
              onChange={changeFilter}
            />
            <div className="option-container member-search">
              <input
                ref={selectMemberRef}
                onFocus={() => {
                  onOpenSelectMember("Select member", selectMemberRef)
                }}
                className="search-member search"
                type="text"
                placeholder={
                  filterBy.member?.memberIds?.length
                    ? `${filterBy.member?.memberIds?.length} ${filterBy.member?.memberIds?.length === 1
                      ? `member`
                      : `members`
                    } selected`
                    : "Select members"
                }
              />
              <FaChevronDown className="icon-open" />
            </div>
            {selectMember && (
              <ActionModal
                setActionModal={setSelectMember}
                data={selectMember}
                handleChange={handleChange}
                filterBy={filterBy}
              />
            )}
          </label>
        </li>
      </ul>
    </section>
  )
}
