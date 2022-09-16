
export const ActionModal = ({ data }) => {
    const { type, pos } = data
    const modalStyle = { left: pos.left + 'px', top: pos.bottom + 'px' }

    return (
        <section style={modalStyle} className="action-modal">
            <h1>action modal</h1>
        </section>
    )
}
