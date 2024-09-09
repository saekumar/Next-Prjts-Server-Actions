import { TPost } from '@/types/PostType'
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

type TypePost = {
  post: TPost[]
  isFav: boolean
}

const initialState: TypePost = {
  post: [],
  isFav: false,
}

const FavItemsSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addfav: (state, action: PayloadAction<TPost>) => {
      state.post.push(action.payload)
      state.isFav = true
    },
    removeFromFav: (state, action: PayloadAction<TPost>) => {
      state.post = state.post.filter((item) => item.id !== action.payload.id)
    },
  },
})

export const { addfav, removeFromFav } = FavItemsSlice.actions
export default FavItemsSlice.reducer
