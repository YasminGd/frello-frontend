import { useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'

export const AttachmentPreview = ({ attachment }) => {
  const dispatch = useDispatch()

  console.log(`attachment:`, attachment)
  return (
    <section className="attachment-preview">
      <a
        className="attachment-preview-img"
        style={{ backgroundImage: `url(${attachment.url})` }}
        href={attachment.url}
        target={'_blank'}
      ></a>
      <p className="attachment-details">
        <span className="attachment-name">{attachment.name}</span>
        <span className="attachment-options">
          <span>Added {utilService.timeSince(attachment.createdAt)}</span>
          <span> - </span>
          <span className="delete-attachment">Delete</span>
        </span>
      </p>
    </section>
  )
}
