import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slices/authSlice'
import FavItemsSlice from './slices/postSlice'
const store = configureStore({
  reducer: {
    authSlice: AuthSlice,
    favItemSlice: FavItemsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
