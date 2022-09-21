export const Cover = ({ task, onUpdateTask }) => {
  const selectedColor = task.style ? task.style.bgColor : ''
  const selectedImg = task.style ? task.style.coverImg : ''
  const selectedCover = task.style ? task.style.isFullyCovered : false

  const colors = ['#7BC86C', '#F5DD29', '#FFAF3F', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', '#FF8ED4', '#172B4D']

  //main background color for the cover options
  const getCoverOptionsBackgroundColor = () => {
    return selectedColor ? selectedColor : '#5e6c844d'
  }

  //get line colors for the not fully covered option div
  const getNotCoveredItemsColor = () => {
    return selectedColor ? '#091e4299' : '#5e6c844d'
  }

  //get line colors for the fully covered option div
  const getCoveredItemsColor = () => {
    return selectedColor && selectedColor !== '#172B4D' ? '#091e4299' : '#ffffff'
  }

  //when updating cover color
  const onUpdateCoverColor = (color) => {
    if (selectedColor === color && selectedColor !== null) return
    if (task.style) {
      task.style.bgColor = color
      task.style.coverImg = null
      if (!color) task.style.isFullyCovered = false
    }
    else task.style = { bgColor: color }
    onUpdateTask(task)
  }

  //when updating cover style
  const onUpdateCoverStyle = (coverOption) => {
    if (selectedCover === coverOption || (!selectedImg && !selectedColor)) return
    if (task.style) task.style.isFullyCovered = coverOption
    else task.style = { isFullyCovered: coverOption }
    onUpdateTask(task)
  }

  //render border on cover option
  const isThereBorderOnCoverOption = (coverOption) => {
    return selectedCover === coverOption && (selectedColor || selectedImg) ? 'border' : ''
  }

  const coverBackgroundColor = getCoverOptionsBackgroundColor()
  const notCoveredItemsColor = getNotCoveredItemsColor()
  const coveredItemsColor = getCoveredItemsColor()

  return <section className="cover">
    <section className="options">
      <p>Size</p>
      <section className="visual-options">
        <div className={`not-covered-visual-option ${isThereBorderOnCoverOption(false)}`}
          style={{ background: coverBackgroundColor }}
          onClick={() => onUpdateCoverStyle(false)}>
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
        <div className={`covered-visual-option ${isThereBorderOnCoverOption(true)}`}
          style={{ backgroundColor: coverBackgroundColor }}
          onClick={() => onUpdateCoverStyle(true)}>
          <div className={`bottom-title`}
            style={{ backgroundColor: coveredItemsColor }}
          > </div>
          <div className={`bottom-paragraph`}
            style={{ backgroundColor: coveredItemsColor }}
          > </div>
        </div>
      </section>
      {(selectedColor || selectedImg) &&
        <button className="option-button" onClick={() => onUpdateCoverColor(null)}>
          Remove cover</button>}
    </section>
    <section className="options">
      <p>Colors</p>
      <section className="colors">
        {
          colors.map(color => <button
            key={color}
            className={`${color === selectedColor ? 'border' : ''} color`}
            onClick={() => onUpdateCoverColor(color)}
            style={{ backgroundColor: color }}>
          </button>)
        }
      </section>
    </section>
  </section >
}
