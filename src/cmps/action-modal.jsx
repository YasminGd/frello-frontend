import { IoCloseOutline } from 'react-icons/io5'

export const ActionModal = ({ type }) => {
  const getActionCmp = (type) => {
    switch (type) {
      case '':
        break

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
    </section>
  )
}
