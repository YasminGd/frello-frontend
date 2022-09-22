import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cloudinaryService } from '../../services/cloudinary.service'
import { utilService } from '../../services/util.service'
import { addImg } from '../../store/actions/task.action'
import { Loader } from '../loader'

export const Attachment = ({ task, groupId, setActionModal }) => {
  const [attachedLink, setAttachedLink] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const dispatch = useDispatch()

  const onAttachLink = () => {
    const url = attachedLink
    if (!url) return

    const isImageUrl = utilService.isImage(url)
    if (isImageUrl) onAddImg(url)
  }

  const onUploadImg = async (ev) => {
    try {
      setIsAdding(true)
      const url = await cloudinaryService.uploadImg(ev)
      onAddImg(url)
    } catch (err) {
      console.log('Error on upload file to Cloudinary', err)
    }
  }

  const onAddImg = async (imgUrl) => {
    dispatch(addImg(imgUrl, task, groupId))
    setActionModal(null)
  }

  return (
    <section className="attachment">
      {isAdding ? 
      <Loader/> : 
      <React.Fragment>
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
      </React.Fragment>
      }
    </section>
  )
}
