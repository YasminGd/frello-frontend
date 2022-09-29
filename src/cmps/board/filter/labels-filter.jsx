import { useRef, useState } from "react"
import { AiOutlineTag } from "react-icons/ai"
import { FaChevronDown } from "react-icons/fa"
import { useSelector } from "react-redux"
import { ActionModal } from "../../global/action-modal"

export const LabelsFilter = ({ handleChange, filterBy, updateFilter }) => {
    const board = useSelector(state => state.boardModule.board)
    const [selectLabel, setSelectLabel] = useState(null)

    const selectLabelRef = useRef()

    const labels = board.labels
    const labelsForPreview = labels?.length > 3 ? labels.slice(0, 3) : labels

    const onOpenSelectLabel = (type, ref) => {
        const rect = ref.current.getBoundingClientRect()
        const pos = { bottom: rect.bottom + 8, left: rect.left }
        setSelectLabel({ type, pos })
    }

    const changeFilter = ({ target }) => {
        if (!target.checked) filterBy = { ...filterBy, labels: [] }
        else filterBy = { ...filterBy, labels: labels.map(label => label.id) }
        updateFilter(filterBy)
    }

    return (<section className="labels-filter filter">
        <h3>Labels</h3>
        <ul>
            <li>
                <label htmlFor='no-labels'>
                    <input
                        checked={filterBy?.labels?.includes('no-labels')}
                        className="checkbox"
                        type="checkbox"
                        id="no-labels"
                        name="labels"
                        value="no-labels"
                        onChange={handleChange}
                    />
                    <div className="option-container">
                        <div className="no-img img">
                            <span><AiOutlineTag /></span>
                        </div>
                        <p>No labels</p>
                    </div>
                </label>
            </li>
            {
                labelsForPreview.map(label =>
                    <li key={label.id}>
                        <label htmlFor={label.id}>
                            <input
                                checked={filterBy?.labels?.includes(label.id)}
                                className="checkbox"
                                type="checkbox"
                                id={label.id}
                                name="labels"
                                value={label.id}
                                onChange={handleChange}
                            />
                            <div className="label-container">
                                <div class={`label-color ${label.class}`}>
                                    <div className={`label-color-circle ${label.color}`}>
                                    </div>
                                    <span className="label-title">
                                        {label.title}
                                    </span>
                                </div>
                            </div>
                        </label>
                    </li>)
            }
            <li className="select-label-li">
                <label htmlFor="select-label">
                    <input
                        className="checkbox"
                        type="checkbox"
                        id="select-label"
                        checked={filterBy?.labels?.length && !(filterBy?.labels?.length === 1 && filterBy?.labels?.includes('no-labels'))}
                        onChange={changeFilter}
                    />
                    <div className="option-container">
                        <input
                            ref={selectLabelRef}
                            onFocus={() => { onOpenSelectLabel('Select label', selectLabelRef) }}
                            className="search-label search"
                            type="text"
                            placeholder={filterBy?.labels?.length && !(filterBy?.labels?.length === 1 && filterBy?.labels?.includes('no-labels')) ? `${filterBy?.labels?.filter(label => label !== 'no-labels').length} ${filterBy?.labels?.filter(label => label !== 'no-members').length === 1 ? `label` : `labels`} selected` : "Select labels"} />
                        <FaChevronDown className="icon-open" />
                    </div>
                    {selectLabel && <ActionModal
                        setActionModal={setSelectLabel}
                        data={selectLabel}
                        handleChange={handleChange}
                        filterBy={filterBy}
                    />}

                </label>
            </li>
        </ul>
    </section>)
}