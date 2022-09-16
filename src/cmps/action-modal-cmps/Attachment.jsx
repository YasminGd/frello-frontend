import { useState } from 'react'
import { cloudinaryService } from '../../services/cloudinary.service'

export const Attachment = () => {
  const [attachedLink, setAttachedLink] = useState('')

  const onAttachLink = () => {
    const url = attachedLink
    if (!url) return

    console.log(`url:`, url)
  }

  const onUploadFile = async (ev) => {
    const url = await cloudinaryService.uploadImg(ev)
    console.log(`url:`, url)
  }

  return (
    <section className="attachment">
      <input type="file" onChange={onUploadFile} />
      <p>Computer</p>

      <div className="seperator"></div>
      <div className="input-container">
        <label htmlFor="addLink">Attach a link</label>
        <input id="addLink" onChange={(ev) => setAttachedLink(ev.target.value)} type="text" placeholder="Paste any link here..." />
      </div>
      <button onClick={onAttachLink}>Attach</button>
    </section>
  )
}
