import { LabelsFilter } from "./labels-filter"
import { MembersFilter } from "./members-filter"

export const BoardFilter = ({ updateFilter, filterBy }) => {
  const handleChange = ({ target }) => {
    const { value, name, checked } = target
    if (target.type === "checkbox") {
      //if the filter is to include no members and no labels
      if (target.name === "no-members")
        filterBy.member
          ? (filterBy.member.includeNoMembers = checked)
          : (filterBy.member = { includeNoMembers: checked })
      else if (target.name === 'no-labels')
        filterBy.label
          ? (filterBy.label.includeNoLabels = checked)
          : (filterBy.label = { includeNoLabels: checked })
      //the members and labels part
      /*
      basically what this does is
      var name = 'dog'
      filterBy[name][`${name}Id`]
      filterBy[dog][`$dogIds`] = [...filterBy[dog][`$dogIds`], value]
       */
      // prettier-ignore 
      else {
        //add a value
        if (checked) {
          if (filterBy[name] && filterBy[name][`${name}Ids`]) {
            filterBy = {
              ...filterBy,
              [name]: {
                ...filterBy[name],
                [`${name}Ids`]: [...filterBy[name][`${name}Ids`], value],
              },
            }
          } else if(filterBy[name]) {
            filterBy = { ...filterBy, [name]: { ...filterBy[name], [`${name}Ids`]: [value] } }
          } else {
            filterBy = { ...filterBy, [name]: { [`${name}Ids`]: [value] } }
          }
        }
        //remove a value
        else {
          filterBy = {
            ...filterBy,
            [name]: {
              ...filterBy[name],
              [`${name}Ids`]: filterBy[name][`${name}Ids`].filter(
                (item) => item !== value
              ),
            },
          }
        }
      }
    }
    // Filter by text
    else filterBy = { ...filterBy, [name]: value }
    updateFilter(filterBy)
  }

  return (
    <section className='board-filter'>
      <div className='filter-container'>
        <h3 className='title'>Keyword</h3>
        <input
          onChange={handleChange}
          autoFocus={window.innerWidth >= 1200}
          className='search-filter'
          type='text'
          placeholder='Enter a keyword...'
          value={filterBy.txt}
          name='txt'
          autoComplete='off'
        />
        <p className='search-label'>Search cards, members, labels, and more.</p>
        <MembersFilter
          handleChange={handleChange}
          filterBy={filterBy}
          updateFilter={updateFilter}
        />
        <LabelsFilter
          handleChange={handleChange}
          filterBy={filterBy}
          updateFilter={updateFilter}
        />
      </div>
    </section>
  )
}
