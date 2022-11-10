export const Cover = ({ task, onUpdateTask, setQuickEdit }) => {
  const selectedColor = task.style?.bgColor || ''
  const selectedImg = task.style?.coverImg || ''
  const selectedCover = task.style?.isFullyCovered || false

  const colors = [
    '#7BC86C',
    '#F5DD29',
    '#FFAF3F',
    '#EF7564',
    '#CD8DE5',
    '#5BA4CF',
    '#29CCE5',
    '#6DECA9',
    '#FF8ED4',
    '#172B4D',
  ]

  // Main background color for the cover options
  const getCoverPreviewBackground = (isBgDark) => {
    if (selectedImg && isBgDark)
      return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${selectedImg}") center center / cover`
    else if (selectedImg && !isBgDark) return `url("${selectedImg}") center center / cover`
    return selectedColor ? selectedColor : '#5e6c844d'
  }

  // Gets line colors for the cover previews
  const getNoCoverLineColor = () => {
    if (selectedColor || selectedImg) return '#091e4299'
    return '#5e6c844d'
  }

  // Get line colors for the fully covered option div
  // Returns white for dark blue only
  const getCoverPreviewLineColor = () => {
    return selectedColor && selectedColor !== '#172B4D' ? '#091e4299' : '#ffffff'
  }

  // When updating cover color
  const onUpdateCoverColor = (color) => {
    // TODO check if both checks are necessary
    if (selectedColor === color && selectedColor !== null) return
    if (task.style) {
      task.style.bgColor = color
      task.style.coverImg = null
      if (!color) task.style.isFullyCovered = false
    } else task.style = { bgColor: color }
    onUpdateTask(task)
  }

  // When updating cover style (fully covered or not)
  const onUpdateCoverStyle = (coverOption) => {
    if (selectedCover === coverOption || (!selectedImg && !selectedColor)) return
    // TODO make sure it works with new tasks
    if (!task.style) task.style = {}
    task.style.isFullyCovered = coverOption
    onUpdateTask(task)
  }

  // Render border on selected cover option
  const getSelectedCoverBorder = (coverOption) => {
    return (selectedCover === coverOption && (selectedColor || selectedImg)) ? 'border' : ''
  }

  const noCoverLineColor = getNoCoverLineColor()
  const coverLineColor = getCoverPreviewLineColor()

  return (
    <section className="cover">
      <section className="options">
        <p className="title">Size</p>
        <section className="visual-options">
          <div
            className={`not-covered-visual-option ${getSelectedCoverBorder(false)} ${selectedColor || selectedImg ? '' : 'disabled'
              }`}
            style={{ background: getCoverPreviewBackground() }}
            onClick={() => onUpdateCoverStyle(false)}
          >
            <div className="bottom-main">
              <div className={`bottom-title`} style={{ background: noCoverLineColor }}>
                {' '}
              </div>
              <div className={`bottom-paragraph`} style={{ background: noCoverLineColor }}>
                {' '}
              </div>
              <div className={`bottom-label first`} style={{ background: noCoverLineColor }}>
                {' '}
              </div>
              <div className={`bottom-label second`} style={{ background: noCoverLineColor }}>
                {' '}
              </div>
              <div className={`bottom-circle`} style={{ background: noCoverLineColor }}>
                {' '}
              </div>
            </div>
          </div>
          <div
            className={`covered-visual-option ${getSelectedCoverBorder(true)} ${selectedColor || selectedImg ? '' : 'disabled'
              }`}
            style={{ background: getCoverPreviewBackground(true) }}
            onClick={() => onUpdateCoverStyle(true)}
          >
            <div className={`bottom-title`} style={{ backgroundColor: coverLineColor }}>
              {' '}
            </div>
            <div className={`bottom-paragraph`} style={{ backgroundColor: coverLineColor }}>
              {' '}
            </div>
          </div>
        </section>
        {(selectedColor || selectedImg) && (
          <button className="option-button" onClick={() => onUpdateCoverColor(null)}>
            Remove cover
          </button>
        )}
      </section>
      <section className="options">
        <p className="title">Colors</p>
        <section className="colors">
          {colors.map((color) => (
            <button
              key={color}
              className={`${color === selectedColor ? 'border' : ''} color`}
              onClick={() => onUpdateCoverColor(color)}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </section>
      </section>
    </section>
  )
}
