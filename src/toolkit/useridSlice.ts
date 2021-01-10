import { createSlice } from '@reduxjs/toolkit';

export const useridSlice = createSlice({
    name: "userid",

    initialState: {
        value: 0
    } as {
        value: number
    },

    reducers: {
        storeUserid: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { storeUserid } = useridSlice.actions;
export const selectUserid = (state) => state.useridSliceReducer.value;
export default useridSlice.reducer;