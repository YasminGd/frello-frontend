import React from 'react'
import { QuickEditButtons } from './quick-edit-buttons'

export const QuickEdit = ({ task, groupId, onOpenActionModal }) => {
  const stop = (ev) => {
    ev.stopPropagation()
    ev.preventDefault()
  }
  return (
    <React.Fragment>
      <section className="quick-edit" onClick={stop}>
        <section className="main-edit">
          <textarea></textarea>
          <button className="btn blue">Save</button>
        </section>
        <QuickEditButtons task={task} groupId={groupId} onOpenActionModal={onOpenActionModal} />
      </section>
      <section className="screen" onClick={(ev) => ev.stopPropagation()}></section>
    </React.Fragment>
  )
}
