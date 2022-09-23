import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { MembersFilter } from "./members-filter"

export const BoardFilter = () => {
    const boardFromStore = useSelector(state => state.boardModule.board)
    const [filterBy, setFilterBy] = useState({})
    console.log('BoardFilter ~ filterBy', filterBy)
    const filteredBoard = useRef(structuredClone(boardFromStore))

    const handleChange = ({ target }) => {
        const { value } = target
        setFilterBy(prevState => ({ ...prevState, txt: value }))
        filterBoard(filterBy)
    }

    const filterBoard = (filterBy) => {
        console.log('filterBoard ~ filterBy', filterBy)
        const regex = new RegExp(filterBy.txt, 'i')
        // const filteredBoardGroups = boardFromStore.groups.filter(group => regex.test(group.title))
        // console.log('filterBoard ~ filteredBoardGroups', filteredBoardGroups)
        // filteredBoard.groups = filteredBoardGroups
        // console.log('filterBoard ~ filteredBoard.groups', filteredBoard.groups)
    }

    return (
        <section className="board-filter">
            <div className="filter-container">
                <h3>Keyword</h3>
                <input
                    onChange={handleChange}
                    autoFocus
                    className="search-filter"
                    type="text"
                    placeholder="Enter a keyword..." />
                <p className="search-label">Search cards, members, labels, and more.</p>
                <MembersFilter title="Members" />
                <MembersFilter title="Labels" />
            </div>
        </section>
    )
}