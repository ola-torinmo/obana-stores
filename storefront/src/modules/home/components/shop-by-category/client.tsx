"use client"

import { useState } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type CategoryProductData = {
  id: string
  handle: string
  title: string
  thumbnail: string | null
  price: string | null
}

export type CategoryData = {
  label: string
  handle: string
  products: CategoryProductData[]
}

const ShopByCategoryClient = ({ categories }: { categories: CategoryData[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = categories[activeIndex]

  if (!categories.length) return null

  return (
    <section className="bg-obana-cream py-12 small:py-16">
      <div className="content-container">
        <h2 className="font-heading text-2xl small:text-[36px] font-bold text-center text-[#101010] mb-6 small:mb-8">
          Shop by category
        </h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-x-2 mb-8 small:mb-10 flex-wrap gap-y-2 bg-white p-[2.5px] w-[325px] mx-auto rounded-[102.5px]">
          {categories.map((cat, i) => (
            <button
              key={cat.handle}
              onClick={() => setActiveIndex(i)}
              className={`px-4 py-1.5 small:px-5 small:py-2 rounded-full text-xs small:text-sm font-medium transition-colors duration-200 ${
                activeIndex === i
                  ? "bg-obana-mauve text-white"
                  : "bg-white border-none border-gray-300 text-gray-600 hover:border-obana-pink hover:text-obana-pink"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {active.products.length > 0 ? (
          <div className="grid grid-cols-1 small:grid-cols-4 gap-4 small:gap-5">
            {active.products.map((product) => (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="flex flex-col gap-y-3 group"
              >
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-obana-pink-pale">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-obana-cream-dark" />
                  )}
                </div>
                <div className="flex flex-col items-center gap-y-1 mb-8 small:mb-0 mt-1.5">
                  <span className="text-sm small:text-sm font-semibold text-obana-brown text-center line-clamp-2">
                    {product.title}
                  </span>
                  {product.price && (
                    <span className="text-xs small:text-sm text-gray-600 small:my-0 my-0.5">{product.price}</span>
                  )}
                  <span className="mt-1  border border-obana-pink text-obana-pink text-[16px] small:text-xs font-semibold px-4 py-1 small:px-5 small:py-1.5 rounded-[100px] group-hover:bg-obana-pink group-hover:text-white transition-colors duration-200  ">
                    Buy now
                  </span>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm py-12">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  )
}

export default ShopByCategoryClient
