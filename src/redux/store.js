import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./auth";

export default configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer
    },
  });
  

//enregister slice dans le store