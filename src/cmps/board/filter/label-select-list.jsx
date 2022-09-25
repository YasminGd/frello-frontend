import { useSelector } from "react-redux"

export const LabelSelectList = ({ handleChange, filterBy }) => {
    const boardLabels = useSelector(state => state.boardModule.board.labels)
    console.log(boardLabels);

    return (
        <section className="label-select-list" onClick={ev => ev.preventDefault()}>
            <ul>
                {boardLabels.map(label => (
                    <li key={label.id} onClick={ev => ev.stopPropagation()}>
                        <label htmlFor={label.id}>
                            <input
                                className="checkbox"
                                type="checkbox"
                                id={label.id}
                                name="labels"
                                value={label.id}
                                onChange={handleChange}
                                checked={filterBy?.labels?.includes(label.id)}
                            />
                            <div className="label-container">
                                <div class={`label-color ${label.class}`}>
                                    <div class={`label-color-circle ${label.color}`}>
                                    </div>
                                    <span class="label-title">
                                        {label.title}
                                    </span>
                                </div>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </section >
    )
}