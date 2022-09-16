import { IoCloseOutline } from 'react-icons/io5'
import { Cover } from './action-modal-cmps/Cover'

export const ActionModal = ({ data }) => {
    const { type, pos } = data
    const modalStyle = { left: pos.left + 'px', top: pos.bottom + 'px' }
    const getActionCmp = (type) => {
        switch (type) {
            case '':
                break

            default:
                break
        }
    }
    return (
        <section style={modalStyle} className="action-modal">
            <div className="title-container">
                <p>{type}</p>
                <span>
                    <IoCloseOutline />
                </span>
            </div>
            <Cover />
        </section>
    )
}
