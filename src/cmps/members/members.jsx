import { useSelector, useDispatch } from 'react-redux'
import { updateTask } from '../../store/actions/task.action'
import React, { useState } from 'react'
import { BiCheck } from 'react-icons/bi'

export const Members = ({ task, groupId }) => {
  const dispatch = useDispatch()
  const boardMembers = useSelector((state) => state.boardModule.board.members)
  const [membersToRender, setMembersToRender] = useState(boardMembers || [])

  const handleChange = ({ target }) => {
    if (target.type === 'text') {
      const regex = new RegExp(target.value, 'i')
      const filteredMembers = boardMembers.filter((member) => regex.test(member.fullname))
      setMembersToRender(filteredMembers)
    }
  }

  const onToggleMember = (memberId) => {
    const member = boardMembers.find((member) => member._id === memberId)
    let activityTxt

    if (task.memberIds?.includes(memberId)) {
      const index = task.memberIds.indexOf(memberId)
      task.memberIds.splice(index, 1)
      activityTxt = `left ${task.title}`
    } else {
      activityTxt = `joined ${task.title}`
      if (task.memberIds) task.memberIds.push(memberId)
      else task.memberIds = [memberId]
    }

    dispatch(updateTask(groupId, task, activityTxt, member))
  }

  return (
    <section className="members">
      <div className="">
        <input onChange={handleChange} autoFocus className="search-member" type="text" placeholder="Search Members" />
      </div>
      <p className="sub-header">Board members</p>
      <ul className="members-list">
        {membersToRender.map((member) => (
          <li key={member._id}>
            {member && (
              <div className="member-container" onClick={() => onToggleMember(member._id)}>
                <div className="member-img">
                  <img src={member.imgUrl} alt="" />
                </div>
                <span className="member-fullname">{member.fullname}</span>
                {task.memberIds?.includes(member._id) && (
                  <span className="checked-icon">
                    <BiCheck />
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
