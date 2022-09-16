import { IoCloseOutline } from 'react-icons/io5'
import { Cover } from './action-modal-cmps/Cover'
import { Attachment } from './action-modal-cmps/Attachment'

export const ActionModal = ({ data }) => {
  const { type, pos } = data
  const modalStyle = { left: pos.left + 'px', top: pos.bottom + 'px' }
  console.log(`type:`, type)

  const getActionCmp = (type) => {
    console.log(type);
    switch (type) {
      case 'Attach from...':
        return <Attachment />
      case 'Cover':
        return <Cover />

      default:
        break
    }
  }
  return (
    <section className="action-modal" style={modalStyle}>
      <div className="title-container">
        <p>{type}</p>
        <span>
          <IoCloseOutline />
        </span>
      </div>
      {getActionCmp(type)}
    </section>
  )
}
