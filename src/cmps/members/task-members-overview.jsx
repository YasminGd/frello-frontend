import React, { useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useSelector } from 'react-redux'

export const TaskMembersOverview = ({ memberIds, onOpenActionModal }) => {
  const btnAddMemberRef = useRef()
  const boardMembers = useSelector((state) => state.boardModule.board.members)

  const membersToRender = boardMembers.filter((member) => memberIds.includes(member._id))
  return (
    <section className="task-members-overview">
      <h4 className="title">Members</h4>
      <div className="members-container">
        {membersToRender.map((member) => (
          <div className="member-img" key={member._id}>
            <img src={member.imgUrl} alt="" />
          </div>
        ))}
        <button
          onClick={() => {
            onOpenActionModal('Members', btnAddMemberRef)
          }}
          ref={btnAddMemberRef}
          className="btn-add-member"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </section>
  )
}
