import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateGroupTitle } from '../../store/actions/group.action'
import { updateTask } from '../../store/actions/task.action'

export const DynamicTextarea = ({ type, entity, style, groupId }) => {
  const [txt, setTxt] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    setTxt(entity.title)
  }, [entity.title])

  const handleChange = ({ target }) => {
    const { value } = target
    setTxt(value)
  }

  const handleUserKeyPress = (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) ev.target.blur()
  }

  const setTaskTitle = () => {
    entity.title = txt
    if (type === 'task') dispatch(updateTask(groupId, entity))
    else if (type === 'group') dispatch(updateGroupTitle(groupId, txt))
  }

  return (
    <section className="dynamic-textarea">
      <textarea
        spellCheck="false"
        name=""
        style={style}
        value={txt}
        onChange={handleChange}
        onKeyPress={handleUserKeyPress}
        onBlur={setTaskTitle}
      />
    </section>
  )
}
