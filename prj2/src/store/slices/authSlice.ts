import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/types/UserTypes'

type AuthState = {
  user: User | null
  isLoggedIn: boolean
}

const storedUser = localStorage.getItem('user')
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isLoggedIn: storedUser ? true : false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      localStorage.setItem('user', JSON.stringify(action.payload))

      state.user = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      localStorage.clear()

      state.user = null
      state.isLoggedIn = false
    },
  },
})

export const { login, logout } = AuthSlice.actions
export default AuthSlice.reducer
