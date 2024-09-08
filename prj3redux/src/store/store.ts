import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counterSlice'
import productSlice from './slices/productSlice'

const store = configureStore({
  reducer: {
    // slices
    counter: counterSlice,
    cart: productSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
