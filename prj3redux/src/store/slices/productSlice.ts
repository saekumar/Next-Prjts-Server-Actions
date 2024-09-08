import { Product } from '@/types/ProductType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartState = {
  products: Product[]
}

const initialState: CartState = {
  products: [],
}

const productSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    removeproductFromCart: (state, action: PayloadAction<Product>) => {
      const idx = state.products.findIndex(
        (item) => item.id === action.payload.id
      )
      state.products.splice(idx, 1)
    },
  },
})

export const { addProductToCart, removeproductFromCart } = productSlice.actions
export default productSlice.reducer
