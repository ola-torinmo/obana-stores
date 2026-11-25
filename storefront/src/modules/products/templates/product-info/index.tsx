import { HttpTypes } from "@medusajs/types"
import Divider from "@modules/common/components/divider"
import IncludedItems, {
  getIncludedItems,
} from "@modules/products/components/included-items"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

export const ProductTitle = ({ product }: ProductInfoProps) => (
  <h1
    className="font-heading font-bold text-[26px] small:text-[28px] leading-tight text-[#101010]"
    data-testid="product-title"
  >
    {product.title}
  </h1>
)

/** Description + "What's included?" block, shown below the price. */
const ProductInfo = ({ product }: ProductInfoProps) => {
  const includedItems = getIncludedItems(product)

  return (
    <div id="product-info" className="flex flex-col">
      {product.description && (
        <p
          className="text-base leading-6 text-[#636363] whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}

      {includedItems.length > 0 && (
        <>
          <Divider className="border-grey-20 my-8" />
          <IncludedItems items={includedItems} />
        </>
      )}

      <Divider className="border-grey-20 my-8" />
    </div>
  )
}

export default ProductInfo
