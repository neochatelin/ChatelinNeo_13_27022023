import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";
import * as GENERIC from "./genericVal"

const initialState = {
    status: GENERIC.STATUS.IDLE,
    token: localStorage.getItem('token')||sessionStorage.getItem('token')
}

export const login = createAsyncThunk('auth/login', async(info, thunkAPI)=>{
    const response = await api.login(info.username, info.password);
    return response;
});

export const disconect = createAsyncThunk('auth/disconect', async(info, thunkAPI)=>{
    localStorage.clear()
    sessionStorage.clear()
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder)=>{
        builder
        .addCase(login.pending, (state)=>{
            state.status = GENERIC.STATUS.PENDING;
        })
        .addCase(login.fulfilled, (state, action)=>{
            if(action.payload.status === 200){
                console.log(action.meta.arg);
                if (action.meta.arg.rememberMe === "true") {
                    console.log("local");
                    localStorage.setItem('token', action.payload.body.token)
                }else{
                    console.log("session");
                    sessionStorage.setItem('token', action.payload.body.token)
                }
                state.status = GENERIC.STATUS.CONNECTED;
                state.isConnected = true
            }else if(action.payload.status === 400){
                state.status = 400;
            }
        })
        .addCase(login.rejected, (state)=>{
            state.status = GENERIC.STATUS.ERROR;
        })
        .addCase(disconect.fulfilled, (state)=>{
            state.status = GENERIC.STATUS.IDLE
            state.isConnected = false
        })
    }
})

export default authSlice.reducer;