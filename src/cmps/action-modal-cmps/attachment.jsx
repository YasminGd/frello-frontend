import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cloudinaryService } from '../../services/cloudinary.service'
import { utilService } from '../../services/util.service'
import { addImg } from '../../store/actions/task.action'

export const Attachment = ({ task, groupId, setActionModal }) => {
  const [attachedLink, setAttachedLink] = useState('')
  const dispatch = useDispatch()

  const onAttachLink = () => {
    const url = attachedLink
    if (!url) return

    const isImageUrl = utilService.isImage(url)
    if (isImageUrl) onAddImg(url)
  }

  const onUploadImg = async (ev) => {
    try {
      const url = await cloudinaryService.uploadImg(ev)
      onAddImg(url)
    } catch (err) {
      console.log('Error on upload file to Cloudinary', err)
    }
  }

  const onAddImg = (imgUrl) => {
    dispatch(addImg(imgUrl, task, groupId))
    setActionModal(null)
  }

  return (
    <section className="attachment">
      <input type="file" accept="image/*" onChange={onUploadImg} />
      <p>Computer</p>

      <div className="seperator"></div>
      <div className="input-container">
        <label htmlFor="addLink">Attach a link</label>
        <input
          id="addLink"
          onChange={(ev) => setAttachedLink(ev.target.value)}
          type="text"
          placeholder="Paste any link here..."
        />
      </div>
      <button onClick={onAttachLink}>Attach</button>
    </section>
  )
}
