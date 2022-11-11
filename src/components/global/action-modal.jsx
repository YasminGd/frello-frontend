import { useRef, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { IoChevronBack } from 'react-icons/io5'
import { Cover } from '../task-details/cover'
import { Attachment } from '../attachment/attachment'
import { CheckList } from '../checklist/check-list'
import { Dates } from '../dates/dates'
import { Labels } from '../labels/labels'
import { Members } from '../members/members'
import { Users } from '../board/users'
import { ListActions } from '../board/group/list-actions'
import { BoardFilter } from '../board/filter/board-filter'
import { MemberSelectList } from '../board/filter/member-select-list'
import { AccountDetails } from '../board/account-details'
import { CreateBoard } from '../workspace/create-board'
import { LabelSelectList } from '../board/filter/label-select-list'
import { Location } from '../location/location'
import { LocationActions } from '../location/location-actions'
import { useClickOutside } from '../../hooks/is-clicked-outside'
import { HeaderBoards } from './header-boards'
import { HeaderStarredBoards } from './header-starred-boards'

  const [isLabelsEdit, setIsLabelsEdit] = useState(null)

  const modalRef = useRef()
  const closeActionModal = () => {
    setTimeout(() => setActionModal(null), 0)
  }
  useClickOutside(modalRef, closeActionModal)

  const onToggleLabelEdit = () => {
    setIsLabelsEdit((prevState) => !prevState)
  }

  const { type, pos } = data
  const modalStyle = { left: pos.left + "px", top: pos.bottom + "px" }
  if (pos.right) {
    delete modalStyle.left
    modalStyle.right = pos.right
  }

  const getActionCmp = (type) => {
    switch (type) {
      case "Attachment":
        return (
          <Attachment
            task={task}
            setActionModal={setActionModal}
            onUpdateTask={onUpdateTask}
            groupId={groupId}
          />
        )

      case "Cover":
        return (
          <Cover
            task={task}
            onUpdateTask={onUpdateTask}
            setQuickEdit={setQuickEdit}
          />
        )

      case "Labels":
        return (
          <Labels
            task={task}
            groupId={groupId}
            onToggleLabelEdit={onToggleLabelEdit}
            isLabelsEdit={isLabelsEdit}
            setQuickEdit={setQuickEdit}
          />
        )

      case "Checklist":
        return <CheckList setActionModal={setActionModal} />

      case "Dates":
        return (
          <Dates
            task={task}
            setActionModal={setActionModal}
            onUpdateTask={onUpdateTask}
            groupId={groupId}
          />
        )

      case "Members":
        return (
          <Members
            task={task}
            groupId={groupId}
            setActionModal={setActionModal}
            setQuickEdit={setQuickEdit}
          />
        )

      case "Users":
        return <Users />

      case "Location":
        return (
          <Location
            task={task}
            groupId={groupId}
            setActionModal={setActionModal}
          />
        )

      case "List actions":
        return (
          <ListActions
            groupId={groupId}
            removeItem={removeItem}
            setActionModal={setActionModal}
          />
        )

      case "Filter":
        return <BoardFilter
          updateFilter={updateFilter}
          filterBy={filterBy} />

      case "Select member":
        return (
          <MemberSelectList
            handleChange={handleChange}
            filterBy={filterBy} />
        )

      case "Select label":
        return (
          <LabelSelectList
            handleChange={handleChange}
            filterBy={filterBy} />
        )

      case "Account":
        return <AccountDetails setActionModal={setActionModal} />

      case "Create board":
        return <CreateBoard setActionModal={setActionModal} />

      case "Boards":
        return <HeaderBoards setActionModal={setActionModal} />

      case "Starred boards":
        return <HeaderStarredBoards setActionModal={setActionModal} />

      case "Location preview actions":
        return (
          <LocationActions
            task={task}
            groupId={groupId}
            setActionModal={setActionModal}
          />
        )

      default:
        return <section></section>
    }
  }

  const getTitle = () => {
    switch (type) {
      case "Attachment":
        return "Attach from..."

      case "Checklist":
        return "Add checklist"

      case "Labels":
        if (isLabelsEdit) return "Edit label"
        return "Labels"

      case "Users":
        return "Invite to board"

      case "Location":
        if (task.location) return "Change location"
        return "Add location"

      case "Select label":
      case "Select member":
        return ""

      case "Location preview actions":
        return task.location.name

      default:
        return type
    }
  }

  const title = getTitle()

  return (
    <section className='action-modal' style={modalStyle} ref={modalRef}>
      {title && (
        <div className='title-container'>
          <p>{title}</p>
          {isLabelsEdit && (
            <IoChevronBack
              className='edit-go-back'
              onClick={onToggleLabelEdit}
            />
          )}
          <span>
            <IoCloseOutline
              onClick={(ev) => {
                ev.preventDefault()
                setActionModal(null)
              }}
            />
          </span>
        </div>
      )}
      {getActionCmp(type)}
    </section>
  )
}
