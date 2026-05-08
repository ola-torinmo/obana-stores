"use client"

import { useState, useTransition, useEffect, useRef } from "react"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { addToCart } from "@lib/data/cart"

export type CategoryProductData = {
  id: string
  handle: string
  title: string
  thumbnail: string | null
  price: string | null
  variantId: string | null
}

export type CategoryData = {
  label: string
  handle: string
  products: CategoryProductData[]
}

type BtnState = "idle" | "pending" | "added" | "error"

function BuyNowButton({
  variantId,
  countryCode,
}: {
  variantId: string
  countryCode: string
}) {
  const [state, setState] = useState<BtnState>("idle")
  const [isPending, startTransition] = useTransition()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isPending || state === "pending") return

    setState("pending")
    startTransition(async () => {
      try {
        await addToCart({ variantId, quantity: 1, countryCode })
        setState("added")
        setTimeout(() => setState("idle"), 2000)
      } catch {
        setState("error")
        setTimeout(() => setState("idle"), 2500)
      }
    })
  }

  const label =
    state === "pending" || isPending
      ? "Adding…"
      : state === "added"
      ? "Added!"
      : state === "error"
      ? "Try again"
      : "Buy now"

  const colorClass =
    state === "added"
      ? "bg-green-500 border-green-500 text-white"
      : state === "error"
      ? "border-red-400 text-red-500"
      : "border-obana-pink text-obana-pink group-hover:bg-obana-pink group-hover:text-white"

  return (
    <button
      onClick={handleClick}
      disabled={isPending || state === "pending"}
      className={`mt-1 border text-[16px] small:text-xs font-semibold px-4 py-1 small:px-5 small:py-1.5 rounded-[100px] transition-colors duration-200 disabled:opacity-60 ${colorClass}`}
    >
      {label}
    </button>
  )
}

const ShopByCategoryClient = ({
  categories,
  countryCode,
  initialCategory,
}: {
  categories: CategoryData[]
  countryCode: string
  initialCategory?: string
}) => {
  const initialIndex = initialCategory
    ? Math.max(0, categories.findIndex((c) => c.handle === initialCategory))
    : 0

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const sectionRef = useRef<HTMLElement>(null)
  const active = categories[activeIndex]

  // Scroll to section when arriving from another page via URL param
  useEffect(() => {
    if (initialCategory && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [initialCategory])

  // Switch tab instantly when nav link is clicked while already on home page
  useEffect(() => {
    const handler = (e: Event) => {
      const handle = (e as CustomEvent<string>).detail
      const idx = categories.findIndex((c) => c.handle === handle)
      if (idx >= 0) setActiveIndex(idx)
    }
    window.addEventListener("obana-category-tab", handler)
    return () => window.removeEventListener("obana-category-tab", handler)
  }, [categories])

  if (!categories.length) return null

  return (
    <section
      id="shop-by-category"
      ref={sectionRef}
      className="bg-obana-cream py-12 small:py-16"
    >
      <div className="content-container">
        <h2 className="font-heading text-2xl small:text-[36px] font-bold text-center text-[#101010] mb-6 small:mb-8">
          Shop by category
        </h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-x-1 mb-8 small:mb-10 bg-white p-1 max-w-[340px] w-full mx-auto rounded-full">
          {categories.map((cat, i) => (
            <button
              key={cat.handle}
              onClick={() => setActiveIndex(i)}
              className={`px-3 py-1.5 small:px-5 small:py-2 rounded-full text-xs small:text-sm font-medium transition-colors duration-200 flex-1 text-center ${
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
              <div key={product.id} className="flex flex-col gap-y-3 group">
                {/* Image — clicking goes to product page */}
                <LocalizedClientLink href={`/products/${product.handle}`}>
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
                </LocalizedClientLink>

                {/* Title + price + buy button */}
                <div className="flex flex-col items-center gap-y-1 mb-8 small:mb-0 mt-1.5">
                  <LocalizedClientLink href={`/products/${product.handle}`}>
                    <span className="text-sm small:text-[20px] font-product text-[#101010] text-center line-clamp-2 hover:underline">
                      {product.title}
                    </span>
                  </LocalizedClientLink>
                  {product.price && (
                    <span className="text-xs small:text-sm text-gray-600 small:my-0 my-0.5">
                      {product.price}
                    </span>
                  )}
                  {product.variantId ? (
                    <BuyNowButton
                      variantId={product.variantId}
                      countryCode={countryCode}
                    />
                  ) : (
                    <LocalizedClientLink href={`/products/${product.handle}`}>
                      <span className="mt-1 border border-obana-pink text-obana-pink text-[16px] small:text-xs font-semibold px-4 py-1 small:px-5 small:py-1.5 rounded-[100px] hover:bg-obana-pink hover:text-white transition-colors duration-200">
                        Buy now
                      </span>
                    </LocalizedClientLink>
                  )}
                </div>
              </div>
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
