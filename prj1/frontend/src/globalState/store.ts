import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
export type UserSlice = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
  setName: (name: string) => void
  setUsername: (username: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
}
export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  setName: (name: string) => set(() => ({ name })),
  setEmail: (email: string) => set(() => ({ email })),
  setUsername: (username: string) => set(() => ({ username })),
  setPassword: (password: string) => set(() => ({ password })),
})
export const useAppStore = create(
  devtools<UserSlice>((...a) => ({ ...createUserSlice(...a) }))
)
