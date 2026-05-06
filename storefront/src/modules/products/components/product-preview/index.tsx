import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import AddToCartButton from "./add-to-cart-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  countryCode,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  countryCode?: string
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  // Pick the cheapest variant for the buy-now button
  const cheapestVariant = (pricedProduct.variants as any[])
    ?.filter((v) => !!v.calculated_price)
    .sort(
      (a, b) =>
        a.calculated_price.calculated_amount -
        b.calculated_price.calculated_amount
    )[0]

  const variantId: string | undefined = cheapestVariant?.id

  return (
    <div data-testid="product-wrapper">
      <LocalizedClientLink href={`/products/${product.handle}`} className="group">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle font-product" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </LocalizedClientLink>

      {countryCode && variantId && (
        <div className="mt-3">
          <AddToCartButton variantId={variantId} countryCode={countryCode} />
        </div>
      )}
    </div>
  )
}
