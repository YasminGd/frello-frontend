import React, { Fragment, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { IoCloseOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { ActionModal } from '../cmps/global/action-modal'
import { updateTask } from '../store/actions/task.action'
import { TaskDescription } from '../cmps/task-details/task-description'
import { TaskAttachments } from '../cmps/attachment/task-attachments'
import { TaskDetailsSidebar } from '../cmps/task-details/task-details-sidebar'
import { CheckListList } from '../cmps/checklist/checklist-list'
import { TaskDetailsOverview } from '../cmps/task-details/task-details-overview'
import { TaskDetailsHeader } from '../cmps/task-details/task-details-header'
import { Activities } from '../cmps/activities/activities'
import { utilService } from '../services/util.service'
import { TaskLocation } from '../cmps/location/task-location'

export const TaskDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [actionModal, setActionModal] = useState(null)
  const { groupId, taskId } = useParams()
  const board = useSelector((state) => state.boardModule.board)
  const screenRef = useRef()

  const group = board.groups.find((group) => group.id === groupId)
  let task = group.tasks.find((task) => task.id === taskId)
  if (!task) return
  task = structuredClone(task)

  const onUpdateTask = (task) => {
    dispatch(updateTask(groupId, task))
  }

  const onGoBack = (ev) => {
    navigate(-1)
  }

  const onOpenActionModal = (type, ref) => {
    const pos = utilService.getModalPosition(type, ref)
    setActionModal({ type, pos })
  }

  const getActivities = () => {
    if (!board.activities || !board.activities.length) return []
    return board.activities.filter((activity) => {
      return activity.task?.id === task?.id
    })
  }

  const activities = getActivities()

  const btnCloseStyle = task.style?.bgColor ? 'on-cover' : ''

  return (
    <Fragment>
      <section className="screen">
        <div onClick={onGoBack} className="backdrop"></div>
        <section className="task-details-container">
          <section
            ref={screenRef}
            className="task-details"
            onClick={(ev) => ev.stopPropagation()}
          >
            <button
              className={`close-task-details ${btnCloseStyle}`}
              onClick={onGoBack}
            >
              <IoCloseOutline />
            </button>
            {task.style?.coverImg && (
              <section className="cover-color img">
                <img src={task.style.coverImg} alt="Background cover" />
              </section>
            )}
            {task.style?.bgColor && (
              <section
                className="cover-color"
                style={{ backgroundColor: task.style.bgColor }}
              ></section>
            )}

            <TaskDetailsHeader
              task={task}
              groupId={groupId}
              groupTitle={group.title}
            />
            <div className="task-body">
              <section className="task-content">
                <TaskDetailsOverview
                  onOpenActionModal={onOpenActionModal}
                  task={task}
                  groupId={groupId}
                />
                <TaskDescription task={task} groupId={groupId} />
                {task.location && (
                  <TaskLocation
                    task={task}
                    groupId={groupId}
                    onOpenActionModal={onOpenActionModal}
                  />
                )}
                {task.attachments?.length > 0 && (
                  <TaskAttachments task={task} groupId={groupId} />
                )}
                {task.checklists?.length > 0 && (
                  <CheckListList task={task} groupId={groupId} />
                )}
                <Activities
                  activities={activities}
                  renderAddComments={true}
                  task={task}
                />
              </section>
              <TaskDetailsSidebar
                onOpenActionModal={onOpenActionModal}
                taskId={task.id}
                groupId={groupId}
              />
            </div>
          </section>
        </section>

        {actionModal && (
          <ActionModal
            onUpdateTask={onUpdateTask}
            setActionModal={setActionModal}
            data={actionModal}
            task={task}
            groupId={groupId}
          />
        )}
      </section>
    </Fragment>
  )
}
