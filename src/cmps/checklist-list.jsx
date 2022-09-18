import { BsCheck2Square } from "react-icons/bs"
import { ChecklistPreview } from "./checklist-preview"

export const CheckListList = ({ task }) => {

    return (
        <section className="checklist-list">
            {
                // task.map(checkList => <ChecklistPreview checkList={checkList} />)
            }
            {/* <div className="description-header">
                <h3>Checklist</h3>
                <BsCheck2Square />
            </div> */}
        </section>
    )
}
