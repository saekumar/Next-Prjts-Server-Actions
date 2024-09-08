'use client'
import { Product } from '@/types/ProductType'
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
import { CarTaxiFront, Heart, ShoppingCart } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import ProductCard from './ProductCard'
import CartproductItem from './CartproductItem'

const CartProductSheet = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.products)
  console.log(items)
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild className="absolute top-2 right-2 rounded-full">
          <div className=" flex justify-between items-center ">
            <ShoppingCart
              width={30}
              height={30}
              className=" fill-none stroke-current text-white cursor-pointer transition duration-300 ease-in-out hover:fill-red-500"
            />
            <span className="text-center text-xl font-bold text-yellow-700">
              {items.length}
            </span>
          </div>
        </SheetTrigger>
        <SheetContent className="bg-gray-950  overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
            <SheetDescription>View Your Cart Products here</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {items ? (
              items.map((item) => (
                <div className="">
                  <CartproductItem prod={item} key={item.id} />
                </div>
              ))
            ) : (
              <p className="">NO Products in your wishlist</p>
            )}{' '}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default CartProductSheet
