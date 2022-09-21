import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { updateBoard } from '../../store/actions/board.action'
import { activityService } from '../../services/activity.service'

export const Users = () => {
  const dispatch = useDispatch()
  const workspaceUsers = useSelector((state) => state.userModule.users)
  const board = useSelector((state) => state.boardModule.board)
  const [usersToRender, setUsersToRender] = useState(workspaceUsers)

  const handleChange = ({ target }) => {
    if (target.type === 'text') {
      const regex = new RegExp(target.value, 'i')
      const filteredUsers = workspaceUsers.filter((user) => regex.test(user.fullname))
      setUsersToRender(filteredUsers)
    }
  }

  const onToggleUser = (userId) => {
    let user = workspaceUsers.find((user) => user._id === userId)
    let activityTxt
    delete user.createdAt
    delete user.username

    if (board.members.some((member) => member._id === userId)) {
      const index = board.members.findIndex((member) => member._id === userId)
      board.members.splice(index, 1)
      activityTxt = `removed ${user.fullname} from this board`
    } else {
      activityTxt = `added ${user.fullname} to this board`
      if (board.members) board.members.push(user)
      else board.members = [user]
    }

    const boardWithActivities = activityService.addActivity(activityTxt, null, null, board, null)
    dispatch(updateBoard(boardWithActivities))
  }

  return (
    <section className="users">
      <div className="">
        <input onChange={handleChange} autoFocus className="search-member" type="text" placeholder="Search Members" />
      </div>
      <p className="sub-header">Workspace members</p>
      <ul className="members-list">
        {usersToRender.map((user) => (
          <li key={user._id}>
            {user && (
              <div className="member-container" onClick={() => onToggleUser(user._id)}>
                <div className="member-img">
                  <img src={user.imgUrl} alt="" />
                </div>
                <span className="member-fullname">{user.fullname}</span>
                {board.members.some((member) => member._id === user._id) && (
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
