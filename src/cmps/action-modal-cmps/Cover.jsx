import { useState } from "react"

export const Cover = ({ task, onUpdateTask }) => {
  const [selectedColor, setSelectedColor] = useState(task.style ? task.style.bgColor : '')
  const [selectedCover, setSelectedCover] = useState(task.style ? task.style.coverStyle : '')

  const colors = ['#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4', '#172B4D']

  const getCoverBackgroundColor = () => {
    return selectedColor ? selectedColor : '#5e6c844d'
  }

  const getNotCoveredItemsColor = () => {
    return selectedColor ? '#091e4299' : '#5e6c844d'
  }

  const getCoveredItemsColor = () => {
    return selectedColor && selectedColor !== '#172B4D' ? '#091e4299' : '#ffffff'
  }

  const onUpdateCover = (color) => {
    if (selectedColor === color) return
    if (task.style) {
      task.style.bgColor = color
      task.style.coverImg = null
      if (!color) task.style.coverStyle = 'not fully covered'
    }
    else task.style = { bgColor: color }
    setSelectedColor(color)
    onUpdateTask(task)
  }

  const onUpdateCoverStyle = (coverStyle) => {
    if (selectedCover === coverStyle || (!task?.style?.coverImg && !selectedColor)) return
    if (task.style) task.style.coverStyle = coverStyle
    else task.style = { coverStyle: coverStyle }
    setSelectedCover(coverStyle)
    onUpdateTask(task)
  }

  const coverBackgroundColor = getCoverBackgroundColor()
  const notCoveredItemsColor = getNotCoveredItemsColor()
  const coveredItemsColor = getCoveredItemsColor()

  return <section className="cover">
    <section className="options">
      <p>Size</p>
      <section className="visual-options">
        <div className={`not-covered-visual-option ${selectedCover === 'not fully covered' && selectedColor ? 'border' : ''}`}
          style={{ backgroundColor: coverBackgroundColor }}
          onClick={() => onUpdateCoverStyle('not fully covered')}>
          <div className="bottom-main">
            <div className={`bottom-title`}
              style={{ background: notCoveredItemsColor }}
            > </div>
            <div className={`bottom-paragraph`}
              style={{ background: notCoveredItemsColor }}
            > </div>
            <div className={`bottom-label first`}
              style={{ background: notCoveredItemsColor }}
            > </div>
            <div className={`bottom-label second`}
              style={{ background: notCoveredItemsColor }}
            > </div>
            <div className={`bottom-circle`}
              style={{ background: notCoveredItemsColor }}
            > </div>
          </div>
        </div>
        <div className={`covered-visual-option ${selectedCover === 'fully covered' && selectedColor ? 'border' : ''}`}
          style={{ backgroundColor: coverBackgroundColor }}
          onClick={() => onUpdateCoverStyle('fully covered')}>
          <div className={`bottom-title`}
            style={{ backgroundColor: coveredItemsColor }}
          > </div>
          <div className={`bottom-paragraph`}
            style={{ backgroundColor: coveredItemsColor }}
          > </div>
        </div>
      </section>
      {selectedColor && <button className="option-button" onClick={() => onUpdateCover(null)}>Remove cover</button>}
    </section>
    <section className="options">
      <p>Colors</p>
      <section className="colors">
        {
          colors.map(color => <button
            key={color}
            className={`${color === selectedColor ? 'border' : ''} color`}
            onClick={() => onUpdateCover(color)}
            style={{ backgroundColor: color }}>

          </button>)
        }
      </section>
    </section>
  </section >
}
