import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//combined reducer using persist
const rootReducer=combineReducers({
    user:userReducer
}
);
const persistConfig={
    key:'root',
    storage,
    version:1,
}
const persistedReducer=persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,//so that we dont get an error for not serializing our variables
  })
})
export const persistor=persistStore(store);