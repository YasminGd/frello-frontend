import { MembersFilter } from "./members-filter"

export const BoardFilter = () => {

    const handleChange = () => {
        console.log(': changing')
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
                <MembersFilter />
            </div>
        </section>
    )
}