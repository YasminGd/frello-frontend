import React from 'react'
import { QuickEditButtons } from './quick-edit-buttons'

export const QuickEdit = () => {
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
      </section>
      <section className="screen"></section>
      <QuickEditButtons />
    </React.Fragment>
  )
}
