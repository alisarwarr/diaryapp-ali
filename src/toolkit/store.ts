import { configureStore } from '@reduxjs/toolkit';
import darkSliceReducer from './darkSlice';
import userSliceReducer from './userSlice';
import diarySliceReducer from './diarySlice';
import useridSliceReducer from './useridSlice';
import hisuseridSliceReducer from './hisuseridSlice';

const store = configureStore({
    reducer: {
        darkSliceReducer,
        userSliceReducer,
        diarySliceReducer,
        useridSliceReducer,
        hisuseridSliceReducer
    }
})

export default store;