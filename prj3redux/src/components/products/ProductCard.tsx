'use client'

import { Product } from '@/types/ProductType'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { addProductToCart } from '@/store/slices/productSlice'
import { useDispatch } from 'react-redux'

const ProductCard = ({ prod }: { prod: Product }) => {
  const [clicked, setClicked] = useState(false)
  const dispatch = useAppDispatch()
  const prods = useAppSelector((state) => state.cart.products)

  const isInCart = prods.findIndex((item) => item.id === prod.id)
  console.log('isIncart', isInCart)

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      dispatch(addProductToCart(prod))
      setClicked(!clicked)
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
      <Button
        className=" top-0 right-0"
        onClick={handleAddToCart}
        disabled={isInCart !== -1}
      >
        {isInCart !== -1 ? 'Already Added to cart' : 'Add to cart'}
      </Button>
    </div>
  )
}

export default ProductCard
