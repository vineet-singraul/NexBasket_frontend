import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCity, setPinCode } from '../redux/slice/userSlice'
import axios from 'axios'

function useGetCity() {
    const dispatch = useDispatch()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPI}`)
            const city = response.data?.results?.[0]?.city
            const postcode = response.data?.results?.[0]?.postcode
            dispatch(setCity({city }))
            dispatch(setPinCode({ postcode}))
        })
    }, [dispatch])
}

export default useGetCity
