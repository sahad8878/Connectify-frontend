import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from '../Features/Auth/authSlice'
import { authApi } from './Auth/authService'

const persistConfig = { key: "auth", storage, whitelist:['auth'] };

const persistedReducer = persistReducer(persistConfig, authReducer);


 const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware),
})


const persistor = persistStore(store)

// export default store
export { store, persistor };