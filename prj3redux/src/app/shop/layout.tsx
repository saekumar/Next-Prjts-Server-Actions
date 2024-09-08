import CartProductSheet from '@/components/products/CartproductSheet'

type Props = {}

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" relative flex flex-col">
      <CartProductSheet />
      {children}
    </div>
  )
}

export default ShopLayout
