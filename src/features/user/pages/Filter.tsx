import { useEffect, useState } from 'react'
import ShowAllFillters from '../components/Fillter/ShowAllFillters'
import { USER_FILLTER } from '../../../api/endpoints'
import { apiGet } from '../../../api/userApi'
import { useParams } from 'react-router-dom'
import type {ProductFilterGroup} from "../types/filters.types.ts"

const Filter = () => {
  const { itemid } = useParams()
  const [fillter , setFillter] = useState<ProductFilterGroup | null>(null)
 
  useEffect(() => {
    if (!itemid) return

    const haneleClickToFindTheFillter = async (fillter: string) => {
      try {
        const { Fillters, data } = await apiGet<{
          data?: ProductFilterGroup | ProductFilterGroup[]
          Fillters?: ProductFilterGroup | ProductFilterGroup[]
        }>(USER_FILLTER.GET_PARTICULLER_FILLTER(fillter))
        setFillter([Fillters ?? data].flat()[0] ?? null)
      } catch (error) {
        console.log(`${error instanceof Error ? error.message : 'some thing went wrong'}`)
      }
    }

    haneleClickToFindTheFillter(itemid)
  }, [itemid])

  return (
    <>
     {fillter ? <ShowAllFillters fillter={fillter}/> : <p>No filters found</p>}
    </>
  )
}

export default Filter
