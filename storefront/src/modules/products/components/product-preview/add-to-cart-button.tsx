"use client"

import { useState, useTransition } from "react"
import { addToCart } from "@lib/data/cart"

export default function AddToCartButton({
  variantId,
  countryCode,
}: {
  variantId: string
  countryCode: string
}) {
  const [isPending, startTransition] = useTransition()
  const [added, setAdded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isPending || added) return

    setError(null)
    startTransition(async () => {
      try {
        await addToCart({ variantId, quantity: 1, countryCode })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
      } catch (err: any) {
        setError(err.message ?? "Failed to add to cart")
      }
    })
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <button
        onClick={handleClick}
        disabled={isPending}
        className={`w-full py-2 rounded-full text-sm font-medium transition-all ${
          added
            ? "bg-green-500 border border-green-500 text-white"
            : "bg-obana-pink text-white hover:opacity-90"
        } disabled:opacity-60`}
      >
        {isPending ? "Adding…" : added ? "Added!" : "Buy now"}
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-1 text-center leading-snug">
          {error}
        </p>
      )}
    </div>
  )
}
