import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import PostCard from '../posts/PostCard'
import FavPostCard from './FavPostCard'

export function FavButton() {
  const favItems = useAppSelector((state) => state.favItemSlice.post)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Fav
          <span>{`(${favItems.length})`}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="scroll-auto overflow-x-auto">
        <SheetHeader>
          <SheetTitle>Your Fav Posts</SheetTitle>
          <SheetDescription>
            You can see your Favourite posts here
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {favItems && favItems.map((item) => <FavPostCard post={item} />)}
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
