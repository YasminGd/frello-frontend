export const ListActions = ({ removeItem, groupId }) => {

    return (
        <section className="list-actions">
            <button className="btn" onClick={() => { removeItem(groupId) }}>Delete</button>
        </section>
    )
}