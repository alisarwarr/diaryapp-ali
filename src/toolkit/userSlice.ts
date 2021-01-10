import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { user } from '../interfaces/user.interface';
//AXIOS
import { fetchUser } from '../api';
//FIXED
import { Observable } from 'rxjs-compat';

export const fetchedUser: AsyncThunk<any, void, {}> = createAsyncThunk(
    'data/fetchedUser',
    async() => {
        const response = await fetchUser();
        return response;
    }
)

export const userSlice = createSlice({
    name: "user",

    initialState: [] as user[],

    reducers: {
        matchUser: (state, action) => {
            let lastUpdate: Observable<user> = state[state.length-1];

            return state.map(item => {
                if(state[state.length-1]) {                                  //updated data comes as last array of state
                    return lastUpdate.map(item => {
                        if(
                            (item.username === action.payload.username) &&
                            (item.password === action.payload.password)
                        ) {
                            console.log("match", action.payload);            //return user's data for match
        
                            return {
                                ...item,
                                matched: true
                            }
                        }
        
                        return {                                             //rest of others not match so false
                            ...item,
                            matched: false
                        }
                    })    
                }
                
                return item;
            })
        },


        quitUser: (state) => {
            let lastUpdate: Observable<user> = state[state.length-1];

            return state.map(item => {
                if(state[state.length-1]) {                                  //updated data comes as last array of state
                    return lastUpdate.map(item => {
                        console.log("quit");
                        return {                                             // user's & all not match so false
                            ...item,
                            matched: false
                        }
                    })    
                }
                
                return item;
            })
        }        
    },

    extraReducers: {
        [fetchedUser.fulfilled as any]: (state, action) => {        //api call successful
            console.log("api call fulfilled");
            //pushing data to server's api
            state.push(action.payload);
        },

        [fetchedUser.rejected as any]: (state, action) => {         //api call failed
            console.log("api call rejected");
        },

        [fetchedUser.pending as any]: (state, action) => {          //api call pending
            console.log("api call pending");
        }
    }
})

export const { matchUser, quitUser } = userSlice.actions;
export const selectUser = (state) => state.userSliceReducer;
export default userSlice.reducer;