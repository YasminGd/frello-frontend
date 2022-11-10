import { useState } from 'react'
import { GrClose } from 'react-icons/gr'

// TODO check why new tasks are not rendered with title
export const AddItem = ({ onToggleAdd, addItem, groupId }) => {
  const [title, setTitle] = useState('')

  const handleChange = ({ target }) => {
    setTitle(target.value)
  }

  const onAdd = (ev) => {
    if (ev) ev.preventDefault()
    if (!title) return
    addItem(title, groupId)
    setTitle('')
    onToggleAdd()
  }

  const handleUserKeyPress = (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      onAdd()
    }
  }

  return (
    <section className="add-item">
      <form onSubmit={onAdd}>
        <textarea
          type="text"
          placeholder={groupId ? 'Enter a title for this card...' : 'Enter list title...'}
          value={title}
          onChange={handleChange}
          autoFocus={window.innerWidth >= 1200}
          onKeyPress={handleUserKeyPress}
        />
        <button>{groupId ? 'Add card' : 'Add list'}</button>
        <section className="svg-holder">
          <GrClose onClick={onToggleAdd} />
        </section>
      </form>
    </section>
  )
}
