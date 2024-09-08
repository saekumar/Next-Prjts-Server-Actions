import { GetAllProds } from '@/actions/getAllProducts'
import ProductCard from '@/components/products/ProductCard'
import { Product } from '@/types/ProductType'

import React from 'react'

type Props = {}

const ProductList = async (props: Props) => {
  const allProds: Product[] = (await GetAllProds()) as Product[]

  return (
    <div className="flex items-start justify-center mt-8 min-h-screen p-8">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">
          products{' '}
          <span className="text-white">
            {allProds ? `${allProds.length}` : 0}
          </span>
        </h2>
        <div className="mx-10 my-10 flex flex-wrap items-center justify-around w-full gap-4">
          {allProds && allProds.length > 0 ? (
            allProds.map((prod) => <ProductCard prod={prod} key={prod.id} />)
          ) : (
            <p className="">No Product Available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
