import { GroupPreview } from './group-preview.jsx'

export const GroupList = ({ board }) => {
    console.log(board);
    return <section className="group-list">
        {
            board.groups.map(group =>  <GroupPreview group={group} /> )
        }
    </section>
}