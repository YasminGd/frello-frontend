import { IoCloseOutline } from 'react-icons/io5'
import { Cover } from './action-modal-cmps/Cover'
import { Attachment } from './action-modal-cmps/Attachment'

export const ActionModal = ({ type }) => {
  console.log(`type:`, type)

  const getActionCmp = (type) => {
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
    <section className="action-modal">
      <div className="title-container">
        <p>{type}</p>
        <span>
          <IoCloseOutline />
        </span>
      </div>
      {getActionCmp()}
    </section>
  )
}
