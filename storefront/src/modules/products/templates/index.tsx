import React from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductFaq from "@modules/products/components/product-faq"
import ProductInfo, { ProductTitle } from "@modules/products/templates/product-info"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import { HttpTypes } from "@medusajs/types"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 small:px-14">
      {/* Space below the fixed nav comes from NavSpacer in the (main) layout */}
      <div
        className="grid grid-cols-1 small:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] large:grid-cols-[780px_minmax(0,1fr)] gap-8 small:gap-12 items-start"
        data-testid="product-container"
      >
        <div className="w-full small:sticky small:top-[168px]">
          <ImageGallery
            images={product?.images || []}
            thumbnail={product?.thumbnail}
          />
        </div>

        <div className="w-full small:pt-6">
          <ProductActionsWrapper
            product={product}
            region={region}
            header={<ProductTitle product={product} />}
            details={<ProductInfo product={product} />}
          />
        </div>
      </div>

      <div className="pt-20 small:pt-[104px] pb-16 small:pb-24">
        <ProductFaq />
      </div>
    </div>
  )
}

export default ProductTemplate
