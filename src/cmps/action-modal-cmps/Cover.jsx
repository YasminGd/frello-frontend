import { useState } from "react"

export const Cover = () => {
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedCover, setSelectedCover] = useState('')

  const colors = ['green', 'yellow', 'orange', 'red', 'purple', 'dark-blue', 'blue', 'lime', 'pink', 'navy']

  return <section className="cover">
    <section className="options">
      <p>Size</p>
      <section className="visual-options">
        <div className={`not-covered-visual-option ${selectedColor ? selectedColor : 'light-grey'} ${selectedCover === 'not covered' ? 'border' : ''}`}
          onClick={() => setSelectedCover('not covered')}>
          <div className="bottom-main">
            <div className={`bottom-title ${selectedColor ? 'grey' : 'light-grey'}`}> </div>
            <div className={`bottom-paragraph ${selectedColor ? 'grey' : 'light-grey'}`}> </div>
            <div className={`bottom-label first ${selectedColor ? 'grey' : 'light-grey'}`}> </div>
            <div className={`bottom-label second ${selectedColor ? 'grey' : 'light-grey'}`}> </div>
            <div className={`bottom-circle ${selectedColor ? 'grey' : 'light-grey'}`}> </div>
          </div>
        </div>
        <div className={`covered-visual-option ${selectedColor ? selectedColor : 'light-grey'} ${selectedCover === 'covered' ? 'border' : ''}`}
          onClick={() => setSelectedCover('covered')}>
          <div className={`bottom-title ${selectedColor && selectedColor !== 'navy' ? 'grey' : 'white'}`}> </div>
          <div className={`bottom-paragraph ${selectedColor && selectedColor !== 'navy' ? 'grey' : 'white'}`}> </div>
        </div>
      </section>
    </section>
    <section className="options">
      <p>Colors</p>
      <section className="colors">
        {
          colors.map(color => <button className={`${color} ${color === selectedColor ? 'border' : ''}`} onClick={() => setSelectedColor(selectedColor === color ? '' : color)}></button>)
        }
      </section>
    </section>
  </section >
}
