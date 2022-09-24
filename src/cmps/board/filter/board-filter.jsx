import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../../services/board.service"
import { MembersFilter } from "./members-filter"

export const BoardFilter = ({ updateFilter, filterBy }) => {
    // const boardFromStore = useSelector(state => state.boardModule.board)
    // const filteredBoard = useRef(structuredClone(boardFromStore))

    const handleChange = ({ target }) => {
        const { value, name } = target
        if (target.type === 'checkbox') {
            if(target.checked && !filterBy[name]?.includes(value)) {
                if (filterBy[name]) filterBy = { ...filterBy, [name]: [...filterBy[name], value] }
                else filterBy = { ...filterBy, [name]: [value] }
            } else {
                filterBy = { ...filterBy, [name]: filterBy[name].filter(item => item !== value) }
            }
        }
        else filterBy = { ...filterBy, [name]: value }
        updateFilter(filterBy)
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
                    placeholder="Enter a keyword..."
                    value={filterBy.txt}
                    name="txt" />
                <p className="search-label">Search cards, members, labels, and more.</p>
                <MembersFilter title="Members" handleChange={handleChange} filterBy={filterBy} updateFilter={updateFilter}/>
                {/* <MembersFilter title="Labels" /> */}
            </div>
        </section>
    )
}