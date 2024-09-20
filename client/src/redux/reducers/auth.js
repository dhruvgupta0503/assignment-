import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "./thunks/admin";
import toast from "react-hot-toast";

const initialState = {
    user: null,
    isAdmin: false,
    loader: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload;
          // console.log("fsefr")
            state.isAdmin = action.payload.isAdmin;
           //console.log("serfr")
            state.loader=false;
        },
        userNotExists: (state) => {
            state.user = null;
            state.isAdmin=false;
            state.loader = false;
        },
    },

    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.fulfilled,(state,action)=>{
        state.isAdmin = true;
        state.loader=false;
        toast.success(action.payload);
        })
        .addCase(adminLogin.rejected, (state, action) => {
            state.isAdmin = false;
            state.loader=false;
            toast.error(action.error.message);
          })
        
    }


});

export const { userExists, userNotExists } = authSlice.actions;
export default authSlice.reducer;
