import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./api";

import * as GENERIC from "./genericVal"
import { disconect } from "./auth";

const initialState = {
    fetchInfo:{
        status: GENERIC.STATUS.IDLE,
        info: undefined,
        isInfoPending:false,
        isLoaded:false,
    },
    editInfo:{
        status: GENERIC.STATUS.IDLE,
        info: undefined,
    }
}

export const fetchInfo = createAsyncThunk('user/fetchInfo', async()=>{
    const token = localStorage.getItem('token')||sessionStorage.getItem('token')
    console.log(token);
    if (token !== undefined) {
        const response = await api.profileGetInfo(token);
        return response;
    }
    return "no token"
    
});
export const editInfo = createAsyncThunk('user/editInfo', async(info, thunkAPI)=>{
    const response = await api.profile_Edit(info.token, info.firstName, info.lastName);
    return response;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName: (state, action)=>{
            state.fetchInfo.info.firstName = action.payload.firstName
            state.fetchInfo.info.lastName = action.payload.lastName
            state.editInfo.status = GENERIC.STATUS.IDLE
        }
    },
    extraReducers: (builder)=>{
        builder
        
        //fetch info
        .addCase(fetchInfo.pending, (state)=>{
            state.fetchInfo.status = GENERIC.STATUS.PENDING;
            state.fetchInfo.isInfoPending = true;
        })
        .addCase(fetchInfo.fulfilled, (state, action)=>{
            state.fetchInfo.isInfoPending = false;
            if (action.payload.status === 200) {
                state.fetchInfo.info = action.payload.body
                state.fetchInfo.isLoaded = true
            }else{
                state.fetchInfo.info = {err:action.payload.status};
                if (action.payload.message ==="jwt expired") {
                    localStorage.clear()
                    sessionStorage.clear()
                    state.fetchInfo.isLoaded = false
                }
            }
            state.fetchInfo.status = GENERIC.STATUS.CONNECTED;
        })
        .addCase(fetchInfo.rejected, (state)=>{
            state.fetchInfo.isInfoPending = false;
            state.fetchInfo.status = GENERIC.STATUS.ERROR;
        })

        //edit info
        .addCase(editInfo.pending, (state)=>{
            state.editInfo.status = GENERIC.STATUS.PENDING;
        })
        .addCase(editInfo.fulfilled, (state, action)=>{
            if (action.payload.status === 200) {
                console.log(action.payload.body);
                state.editInfo.info = action.payload.body;
            }else{
                disconect()
            }
            state.editInfo.status = GENERIC.STATUS.CONNECTED;
        })
        .addCase(editInfo.rejected, (state)=>{
            state.editInfo.status = GENERIC.STATUS.ERROR;
        })

        //disconect
        .addCase(disconect.fulfilled, (state)=>{
            state.fetchInfo.status = GENERIC.STATUS.IDLE
            state.fetchInfo.info = undefined
            state.fetchInfo.isInfoPending = false
            state.fetchInfo.isLoaded = false
            
            state.editInfo.status = GENERIC.STATUS.IDLE
            state.editInfo.info = undefined
        })
    }
})

export const { updateName } = userSlice.actions
export default userSlice.reducer;