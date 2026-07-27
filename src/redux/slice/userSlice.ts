import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserData {
    fullName?: string
    email?: string
    provider?: string
    [key: string]: unknown
}

interface CityInfo {
    city?: string
}

interface PinCodeInfo {
    postcode?: string
}

interface UserState {
    userData: UserData | null
    city: CityInfo | null
    pinCode: PinCodeInfo | null
}

const initialState: UserState = {
    userData: null,
    city: null,
    pinCode: null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData: (state, action: PayloadAction<UserData>) => {
            state.userData=action.payload
        },
        setCity: (state, action: PayloadAction<CityInfo>) => {
           state.city=action.payload
        },
        setPinCode: (state, action: PayloadAction<PinCodeInfo>) => {
           state.pinCode=action.payload
        }
    }
})


export const {setUserData,setCity,setPinCode} = userSlice.actions;
export default userSlice.reducer
