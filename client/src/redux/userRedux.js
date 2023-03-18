import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice ({
    name:'user',
    initialState:{
        currentUser: null,
        isFetching: false,
        error:false,
    },
    reducers:{
        signinStart: (state)=>{
            state.isFetching=true;
        },
        signinSuccess: (state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
        },
        signinFailure: (state)=>{
            state.isFetching=false;
            state.error=true;
        },
    },
});

export const {signinStart, signinSuccess, signinFailure} = userSlice.actions;
export default userSlice.reducer;