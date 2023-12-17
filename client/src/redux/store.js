import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
export const store = configureStore({
  reducer: {
    user:userReducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,//so that we dont get an error for not serializing our variables
  })
})