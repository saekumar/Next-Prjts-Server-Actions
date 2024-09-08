import { Product } from '@/types/ProductType'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useAppDispatch } from '@/store/hooks/hooks'
import {
  addProductToCart,
  removeproductFromCart,
} from '@/store/slices/productSlice'

const CartproductItem = ({ prod }: { prod: Product }) => {
  const dispatch = useAppDispatch()
  const handleRemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      dispatch(removeproductFromCart(prod))
    } catch (error) {
      console.log(error)
    }
  }
  const truncatedDescription =
    prod.description.length > 50
      ? `${prod.description.slice(0, 50)}...`
      : prod.description
  const truncatedTitle =
    prod.title.length > 18 ? `${prod.title.slice(0, 18)}...` : prod.title

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 max-w-xs space-y-2 cursor-pointer">
      <img
        src={prod.image}
        alt={prod.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className="text-xl font-semibold mb-2">{truncatedTitle}</div>
      <div className="text-gray-400 mb-4">{prod.category}</div>
      <div className="text-lg font-bold mb-2">${prod.price}</div>
      <div className="flex items-center mb-4">
        <span className="text-yellow-400 mr-1">{prod.rating.rate}</span>
        <span className="text-gray-400">({prod.rating.count} reviews)</span>
      </div>
      <p className="text-gray-300">{truncatedDescription}</p>
      <Button className=" top-0 right-0" onClick={handleRemoveFromCart}>
        Remove
      </Button>
    </div>
  )
}

export default CartproductItem
