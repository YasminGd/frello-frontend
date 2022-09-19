import { useState } from "react"
import { useSelector } from "react-redux"

export const ColorPallet = ({ setSelectedColor, selectedColor }) => {

    const colorsClasses = useSelector(state => state.boardModule.board.style.colorsClasses)

    return (
        <section className="color-pallet">
            {colorsClasses.map(colorClass => (
                <div className={`color-container ${(selectedColor === colorClass) ? 'selected-container' : ''}`}
                    key={colorClass}>
                    <div
                        onClick={() => { setSelectedColor(colorClass) }}
                        className={`color ${colorClass} ${(selectedColor === colorClass) ? 'selected-color' : ''}`}>
                    </div>
                </div>
            ))}
        </section>
    )
}
