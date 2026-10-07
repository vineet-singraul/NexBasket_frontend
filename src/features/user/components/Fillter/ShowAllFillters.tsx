import React from 'react'
import {type ProductFilter, type sendToShowAllFilltersPage} from "../../types/filters.types"
import Range from './Helping comp of fillter/Range'
import CheckBox from './Helping comp of fillter/CheckBox'

const ShowAllFillters = ({fillter} : sendToShowAllFilltersPage) => {
    console.log("<== v ==>",fillter)

    const showComponentIn = (filter: ProductFilter) => {
        switch (filter.type) {
            case "range":
                return <Range
                 filter={filter}
                />

            case "checkbox":
                return <CheckBox filter={filter} />

            default:
                return null
        }
    }

  return (
    <div>
      {fillter.filters.map((filter) => (
        <div key={filter._id}>{showComponentIn(filter)}</div>
      ))}
    </div>
  )
}

export default ShowAllFillters
