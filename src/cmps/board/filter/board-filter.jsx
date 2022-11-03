import { LabelsFilter } from "./labels-filter"
import { MembersFilter } from "./members-filter"

export const BoardFilter = ({ updateFilter, filterBy }) => {
  // const handleChange = ({ target }) => {
  //   const { value, name } = target
  //   if (target.type === 'checkbox') {
  //     if (target.checked && !filterBy[name]?.includes(value)) {
  //       if (filterBy[name]) filterBy = { ...filterBy, [name]: [...filterBy[name], value] }
  //       else filterBy = { ...filterBy, [name]: [value] }
  //     } else {
  //       filterBy = { ...filterBy, [name]: filterBy[name].filter((item) => item !== value) }
  //     }
  //   } else filterBy = { ...filterBy, [name]: value }
  //   updateFilter(filterBy)
  // }

  const handleChange = ({ target }) => {
    const { value, name, checked } = target
    console.log(value, name, checked)
    if (target.type === "checkbox") {
      //if the filter is to include no members and no labels
      if (target.name === "no-members")
        filterBy.member
          ? (filterBy.member.includeNoMembers = checked)
          : (filterBy.member = { includeNoMembers: checked })
      else if (target.name === "no-labels")
        filterBy.label
          ? (filterBy.label.includeNoLabels = checked)
          : (filterBy.label = { includeNoLabels: checked })
      //the members and labels part
      /*basically what this does is
      var name = 'dogs'
      filterBy[name][`${name}Ids`]
      filterBy[dogs][`$dogsIds`] = [...filterBy[dogs][`$dogsIds`], value]
      */ 
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
    //filter by txt
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
