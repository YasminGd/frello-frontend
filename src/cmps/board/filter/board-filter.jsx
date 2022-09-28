import { LabelsFilter } from './labels-filter'
import { MembersFilter } from './members-filter'

export const BoardFilter = ({ updateFilter, filterBy }) => {
  const handleChange = ({ target }) => {
    const { value, name } = target
    if (target.type === 'checkbox') {
      if (target.checked && !filterBy[name]?.includes(value)) {
        if (filterBy[name]) filterBy = { ...filterBy, [name]: [...filterBy[name], value] }
        else filterBy = { ...filterBy, [name]: [value] }
      } else {
        filterBy = { ...filterBy, [name]: filterBy[name].filter((item) => item !== value) }
      }
    } else filterBy = { ...filterBy, [name]: value }
    updateFilter(filterBy)
  }

  // const handleChange = ({ target }) => {
  //     const { value, name } = target
  //     if (target.type === 'checkbox') {
  //         if (name === 'no-members' || name === 'no-labels') {
  //             if (target.checked) filterBy = { ...filterBy, [name]: true }
  //             else filterBy = { ...filterBy, [name]: false }
  //         } else {
  //             if (target.checked && !filterBy[name]?.includes(value)) {
  //                 if (filterBy[name]) filterBy = { ...filterBy, [name]: [...filterBy[name], value] }
  //                 else filterBy = { ...filterBy, [name]: [value] }
  //             } else {
  //                 filterBy = { ...filterBy, [name]: filterBy[name].filter(item => item !== value) }
  //             }
  //         }
  //     }
  //     else filterBy = { ...filterBy, [name]: value }
  //     updateFilter(filterBy)
  // }

  return (
    <section className="board-filter">
      <div className="filter-container">
        <h3 className="title">Keyword</h3>
        <input
          onChange={handleChange}
          autoFocus
          className="search-filter"
          type="text"
          placeholder="Enter a keyword..."
          value={filterBy.txt}
          name="txt"
          autoComplete="off"
        />
        <p className="search-label">Search cards, members, labels, and more.</p>
        <MembersFilter handleChange={handleChange} filterBy={filterBy} updateFilter={updateFilter} />
        <LabelsFilter handleChange={handleChange} filterBy={filterBy} updateFilter={updateFilter} />
      </div>
    </section>
  )
}
