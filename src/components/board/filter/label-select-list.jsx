import { useSelector } from 'react-redux'

export const LabelSelectList = ({ handleChange, filterBy }) => {
  const boardLabels = useSelector((state) => state.boardModule.board.labels)

  return (
    <section className="label-select-list" onClick={(ev) => ev.preventDefault()}>
      <ul>
        {boardLabels.map((label) => (
          <li key={label.id} onClick={(ev) => ev.stopPropagation()}>
            <label htmlFor={label.id}>
              <input
                className="checkbox"
                type="checkbox"
                id={label.id}
                name="label"
                value={label.id}
                onChange={handleChange}
                checked={filterBy?.label?.labelIds?.includes(label.id)}
              />
              <div className="label-container">
                <div className={`label-color ${label.class}`}>
                  <div className={`label-color-circle ${label.color}`}></div>
                  <span className="label-title">{label.title}</span>
                </div>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </section>
  )
}
