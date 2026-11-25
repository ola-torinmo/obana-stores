import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"

export default function ProductActionsWrapper({
  product,
  region,
  header,
  details,
}: {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  header?: React.ReactNode
  details?: React.ReactNode
}) {
  return (
    <ProductActions
      product={product}
      region={region}
      header={header}
      details={details}
    />
  )
}
