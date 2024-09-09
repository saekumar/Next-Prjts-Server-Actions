import { useAppSelector } from '@/store/hooks'

export const useFavItems = () => {
  const favItems = useAppSelector((state) => state.favItemSlice.post)
  return favItems
}
