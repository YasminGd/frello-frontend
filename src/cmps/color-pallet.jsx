export const ColorPallet = ({ setSelectedColor, selectedColor }) => {

    const colorsClasses = [
        'light-green-hoverable',
        'light-yellow-hoverable',
        'light-orange-hoverable',
        'light-red-hoverable',
        'light-purple-hoverable',
        'green-hoverable',
        'yellow-hoverable',
        'orange-hoverable',
        'red-hoverable',
        'purple-hoverable',
        'dark-green-hoverable',
        'dark-yellow-hoverable',
        'dark-orange-hoverable',
        'dark-red-hoverable',
        'dark-purple-hoverable',
        'light-blue-hoverable',
        'light-sky-hoverable',
        'light-lime-hoverable',
        'light-pink-hoverable',
        'light-black-hoverable',
        'blue-hoverable',
        'sky-hoverable',
        'lime-hoverable',
        'pink-hoverable',
        'black-hoverable',
        'dark-blue-hoverable',
        'dark-sky-hoverable',
        'dark-lime-hoverable',
        'dark-pink-hoverable',
        'dark-black-hoverable',

    ]

    const onSelectColor = (colorClass) => {
        colorClass = colorClass.slice(0, -10)
        setSelectedColor(colorClass)
    }

    return (
        <section className="color-pallet">
            {colorsClasses.map(colorClass => (
                <div className={`color-container ${(selectedColor + '-hoverable' === colorClass) ? 'selected-container' : ''}`}
                    key={colorClass}>
                    <div
                        onClick={() => { onSelectColor(colorClass) }}
                        className={`color ${colorClass} ${(selectedColor + '-hoverable' === colorClass) ? 'selected-color' : ''}`}>
                    </div>
                </div>
            ))
            }
        </section >
    )
}
