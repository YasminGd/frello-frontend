import { AddNew } from './add-new.jsx';
import { GroupPreview } from './group-preview.jsx'

export const GroupList = ({ board, addItem }) => {

    return <section className="group-list">
        {
            board.groups.map(group => <GroupPreview group={group} addItem={addItem} />)
        }
    </section>
}