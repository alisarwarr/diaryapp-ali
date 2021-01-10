import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { diary } from '../interfaces/diary.interface';
//AXIOS
import { fetchDiary } from '../api';
//FIXED
import { Observable } from 'rxjs-compat';

export const fetchedDiary = createAsyncThunk(
    'data/fetchedDiary',
    async() => {
        const response = await fetchDiary();
        return await response;
    }
)

export const diarySlice = createSlice({
    name: "diary",

    initialState: [] as diary[],

    reducers: {
        editNotes: (state, action) => {
            let lastUpdate: Observable<diary> = state[state.length-1];

            return state.map(item => {
                if(state[state.length-1]) {                                 //updated data comes as last array of state
                    return lastUpdate.map(item => {
                        if(
                            (item.id === action.payload.id)
                        ) {
                            console.log("edit", action.payload.id);         //return diary's id for edit
        
                            return {
                                ...item,
                                notes: action.payload.notes
                            }
                        }
        
                        return item;                                        //rest of others remains same
                    })
                }
                
                return item;
            })
        },


        editTitle: (state, action) => {
            let lastUpdate: Observable<diary> = state[state.length-1];

            return state.map(item => {
                if(state[state.length-1]) {                                 //updated data comes as last array of state
                    return lastUpdate.map(item => {
                        if(
                            (item.id === action.payload.id)
                        ) {
                            console.log("edit", action.payload.id);         //return diary's id for edit
        
                            return {
                                ...item,
                                title: action.payload.title
                            }
                        }
        
                        return item;                                        //rest of others not match so false
                    })
                }
                
                return item;
            })
        },


        editPrivacy: (state, action) => {
            let lastUpdate: Observable<diary> = state[state.length-1];

            return state.map(item => {
                if(state[state.length-1]) {                                 //updated data comes as last array of state
                    return lastUpdate.map(item => {
                        if(
                            (item.id === action.payload.id)
                        ) {
                            console.log("edit", action.payload.id);         //return diary's id for edit
        
                            return {
                                ...item,
                                privacy: action.payload.privacy
                            }
                        }
        
                        return item;                                        //rest of others remains same
                    })
                }
                
                return item;
            })
        }
    },

    extraReducers: {
        [fetchedDiary.fulfilled as any]: (state, action) => {        //api call successful
            console.log("api call fulfilled");
            //pushing data to server's api
            state.push(action.payload);
        },

        [fetchedDiary.rejected as any]: (state, action) => {         //api call failed
            console.log("api call rejected");
        },

        [fetchedDiary.pending as any]: (state, action) => {          //api call pending
            console.log("api call pending");
        }
    }
})

export const { editNotes, editTitle, editPrivacy } = diarySlice.actions;
export const selectDiary = (state) => state.diarySliceReducer;
export default diarySlice.reducer;