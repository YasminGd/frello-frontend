// When dragging element starts, calculates the position of the element's original position and places a shadow instead
const onDragStart = (event) => {
  const draggedDOM = getDraggedDom(event.draggableId) // dragged element
  if (!draggedDOM) return
  const { clientHeight, clientWidth } = draggedDOM
  const { index } = event.source

  // Calculates the pixels of the dragged element from the left side of the page view
  const clientX =
    parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft) + // Dragged parent's padding left
    [...draggedDOM.parentNode.children] // Array of groups
      .slice(0, index)
      .reduce((total, curr) => {
        // Adds up all siblings width & margin
        return total + curr.clientWidth + parseFloat(getComputedStyle(curr).marginRight)
      }, 0) -
    draggedDOM.parentNode.scrollLeft

  // Sets the state with props to send to the inline style of the shadow
  setPlaceholderProps({
    clientHeight,
    clientWidth,
    clientX,
    clientY: parseFloat(window.getComputedStyle(draggedDOM.parentNode)),
  })
}
