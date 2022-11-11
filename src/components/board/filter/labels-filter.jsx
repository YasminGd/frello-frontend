import { useRef, useState } from "react"
import { AiOutlineTag } from "react-icons/ai"
import { FaChevronDown } from "react-icons/fa"
import { useSelector } from "react-redux"
import { ActionModal } from "../../global/action-modal"

export const LabelsFilter = ({ handleChange, filterBy, updateFilter }) => {
  const board = useSelector((state) => state.boardModule.board)
  const [selectLabel, setSelectLabel] = useState(null)

  const selectLabelRef = useRef()

  const labels = board.labels
  const labelsForPreview = labels?.length > 3 ? labels.slice(0, 3) : labels

  const onOpenSelectLabel = (type, ref) => {
    const rect = ref.current.getBoundingClientRect()
    const pos = { bottom: rect.bottom + 8, left: rect.left }
    setSelectLabel({ type, pos })
  }

  const handleLabelChange = ({ target }) => {
    if (!target.checked)
      filterBy = { ...filterBy, label: { ...filterBy.label, labelIds: [] } }
    else
      filterBy = {
        ...filterBy,
        label: {
          ...filterBy.label,
          labelIds: labels.map((label) => label.id),
        },
      }
    updateFilter(filterBy)
  }

  return (
    <section className='labels-filter filter'>
      <h3>Labels</h3>
      <ul>
        <li>
          <label htmlFor='no-labels'>
            <input
              checked={filterBy.label?.includeNoLabels}
              className='checkbox'
              type='checkbox'
              id='no-labels'
              name='no-labels'
              value='no-labels'
              onChange={handleChange}
            />
            <div className='option-container'>
              <div className='no-img img'>
                <span>
                  <AiOutlineTag />
                </span>
              </div>
              <p>No labels</p>
            </div>
          </label>
        </li>
        {labelsForPreview.map((label) => (
          <li key={label.id}>
            <label htmlFor={label.id}>
              <input
                checked={filterBy.label?.labelIds?.includes(label.id)}
                className='checkbox'
                type='checkbox'
                id={label.id}
                name='label'
                value={label.id}
                onChange={handleChange}
              />
              <div className='label-container'>
                <div className={`label-color ${label.class}`}>
                  <div className={`label-color-circle ${label.color}`}></div>
                  <span className='label-title'>{label.title}</span>
                </div>
              </div>
            </label>
          </li>
        ))}
        <li className='select-label-li'>
          <label htmlFor='select-label' className='label-for-select-labels'>
            <input
              className='checkbox'
              type='checkbox'
              id='select-label'
              checked={
                filterBy?.label?.labelIds?.length
              }
              onChange={handleLabelChange}
            />
            <div className='option-container'>
              <input
                ref={selectLabelRef}
                onFocus={() => {
                  onOpenSelectLabel("Select label", selectLabelRef)
                }}
                className='search-label search'
                type='text'
                placeholder={
                  filterBy?.label?.labelIds?.length
                    ? `${filterBy?.label?.labelIds?.length
                    } ${filterBy?.label?.labelIds?.length === 1
                      ? `label`
                      : `labels`
                    } selected`
                    : "Select labels"
                }
              />
              <FaChevronDown className='icon-open' />
            </div>
            {selectLabel && (
              <ActionModal
                setActionModal={setSelectLabel}
                data={selectLabel}
                handleChange={handleChange}
                filterBy={filterBy}
              />
            )}
          </label>
        </li>
      </ul>
    </section>
  )
}
