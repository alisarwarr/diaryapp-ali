import { createSlice } from '@reduxjs/toolkit';

export const hisuseridSlice = createSlice({
    name: "hisuserid",

    initialState: {
        value: 0
    } as {
        value: number
    },

    reducers: {
        storeHisuserid: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { storeHisuserid } = hisuseridSlice.actions;
export const selectHisuserid = (state) => state.hisuseridSliceReducer.value;
export default hisuseridSlice.reducer;