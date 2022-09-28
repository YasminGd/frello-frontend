

const onDragStart = (event) => {
    const draggedDOM = getDraggedDom(event.draggableId)
    if (!draggedDOM) return
    const { clientHeight, clientWidth } = draggedDOM
    const sourceIndex = event.source.index

    const clientX =
        parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft) +
        [...draggedDOM.parentNode.children].slice(0, sourceIndex).reduce((total, curr) => {
            return total + curr.clientWidth + 8
        }, 0) -
        draggedDOM.parentNode.scrollLeft

    setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientX,
        clientY: parseFloat(window.getComputedStyle(draggedDOM.parentNode)),
    })
}