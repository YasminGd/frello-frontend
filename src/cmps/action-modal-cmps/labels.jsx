import { GrFormEdit } from 'react-icons/gr'
import { useSelector } from 'react-redux'

export const Labels = ({ task, groupId, setActionModal }) => {

    const labels = useSelector(state => state.boardModule.board.labels)

    return (
        <section className="labels">
            <div className="">
                <input type="text" placeholder="Search labels…" value="" />
            </div>
            <p className="">Labels</p>
            <ul>
                {labels.map(label => (
                    <li key={label.id}>
                        <label htmlFor={label.id}>
                            <input type="checkbox" id={label.id} />
                            <div className="label-container">
                                <div className="label-color">
                                    <div className="label-color-circle" style={{ backgoundColor: label.color }}></div>
                                </div>
                                <button><GrFormEdit /></button>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
            <button>Create new label</button>
        </section >
    )
}
