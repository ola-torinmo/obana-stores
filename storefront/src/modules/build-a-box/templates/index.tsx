"use client"

import { useState, useTransition } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { addToCart } from "@lib/data/cart"
import { sendBoxNote } from "@lib/data/box-note"
import { getPricesForVariant } from "@lib/util/get-product-price"
import { convertToLocale } from "@lib/util/money"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

// ── Types ─────────────────────────────────────────────────────────────────────

type BoxItem = {
  product: HttpTypes.StoreProduct
  variantId: string
  quantity: number
  priceNumber: number
  priceFormatted: string
}

type WrapOption = {
  id: string
  title: string
  thumbnail: string | null
  variantId: string | null
  priceNumber: number
  priceFormatted: string
  bgColor: string
}

// ── Constants ─────────────────────────────────────────────────────────────────

const MIN_ITEMS = 4
const MAX_ITEMS = 7

const FALLBACK_WRAP_COLORS = ["bg-pink-100", "bg-blue-50", "bg-white", "bg-pink-50"]

// ── Inline Icons ──────────────────────────────────────────────────────────────

function BoxEmptyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-grey-30">
      <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" x2="12" y1="22.08" y2="12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CircleXIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isOutOfStock(product: HttpTypes.StoreProduct): boolean {
  const v = product.variants?.[0] as any
  if (!v) return true
  if (!v.manage_inventory) return false
  return (v.inventory_quantity ?? 0) <= 0 && !v.allow_backorder
}

// ── Main Template ─────────────────────────────────────────────────────────────

export default function BuildABoxTemplate({
  products,
  wrapProducts,
  categories,
  countryCode,
  currencyCode,
}: {
  products: HttpTypes.StoreProduct[]
  wrapProducts: HttpTypes.StoreProduct[]
  categories: HttpTypes.StoreProductCategory[]
  countryCode: string
  currencyCode: string
}) {
  const router = useRouter()
  const [isCartPending, startCartTransition] = useTransition()
  const [isNotePending, startNoteTransition] = useTransition()

  const [step, setStep] = useState(1)
  const [selectedItems, setSelectedItems] = useState<BoxItem[]>([])
  const [selectedWrap, setSelectedWrap] = useState<WrapOption | null>(null)
  const [note, setNote] = useState("")
  const [noteSaved, setNoteSaved] = useState(false)
  const [noteRef, setNoteRef] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [error, setError] = useState<string | null>(null)

  // Derived state
  const totalQuantity = selectedItems.reduce((s, i) => s + i.quantity, 0)
  const itemsTotal = selectedItems.reduce((s, i) => s + i.priceNumber * i.quantity, 0)
  const wrapPrice = selectedWrap?.priceNumber ?? 0
  const grandTotal = itemsTotal + wrapPrice
  const canNext1 = totalQuantity >= MIN_ITEMS
  const canNext2 = selectedWrap !== null

  const fmt = (amount: number) => convertToLocale({ amount, currency_code: currencyCode })

  // Build wrap options — real products first, fallback placeholders otherwise
  const wraps: WrapOption[] =
    wrapProducts.length > 0
      ? wrapProducts.map((p, i) => {
          const v = p.variants?.[0]
          const pd = v ? getPricesForVariant(v as any) : null
          return {
            id: p.id!,
            title: p.title,
            thumbnail: p.thumbnail ?? null,
            variantId: v?.id ?? null,
            priceNumber: pd?.calculated_price_number ?? 5,
            priceFormatted: pd?.calculated_price ?? fmt(5),
            bgColor: FALLBACK_WRAP_COLORS[i % FALLBACK_WRAP_COLORS.length],
          }
        })
      : [
          { id: "w1", title: "Box 1", thumbnail: null, variantId: null, priceNumber: 5, priceFormatted: fmt(5), bgColor: "bg-pink-100" },
          { id: "w2", title: "Box 2", thumbnail: null, variantId: null, priceNumber: 5, priceFormatted: fmt(5), bgColor: "bg-blue-50" },
          { id: "w3", title: "Box 3", thumbnail: null, variantId: null, priceNumber: 5, priceFormatted: fmt(5), bgColor: "bg-white" },
          { id: "w4", title: "Box 4", thumbnail: null, variantId: null, priceNumber: 5, priceFormatted: fmt(5), bgColor: "bg-pink-50" },
        ]

  // Exclude wrap products (box1–box4) from the choose-items grid
  const wrapHandleSet = new Set(wrapProducts.map((p) => p.handle).filter(Boolean))
  const itemProducts = products.filter((p) => !wrapHandleSet.has(p.handle ?? ""))

  // Filtered by category
  const displayProducts =
    categoryFilter === "all"
      ? itemProducts
      : itemProducts.filter((p) =>
          (p as any).categories?.some(
            (c: any) =>
              c.handle === categoryFilter ||
              c.name?.toLowerCase() === categoryFilter.toLowerCase()
          )
        )

  const isInBox = (id: string) => selectedItems.some((i) => i.product.id === id)

  const addToBox = (p: HttpTypes.StoreProduct) => {
    if (totalQuantity >= MAX_ITEMS || isInBox(p.id!)) return
    const v = p.variants?.[0]
    if (!v) return
    const pd = getPricesForVariant(v as any)
    setSelectedItems((prev) => [
      ...prev,
      {
        product: p,
        variantId: v.id!,
        quantity: 1,
        priceNumber: pd?.calculated_price_number ?? 0,
        priceFormatted: pd?.calculated_price ?? fmt(0),
      },
    ])
  }

  const removeFromBox = (id: string) =>
    setSelectedItems((prev) => prev.filter((i) => i.product.id !== id))

  const updateQty = (id: string, delta: number) =>
    setSelectedItems((prev) =>
      prev.map((item) => {
        if (item.product.id !== id) return item
        const newQ = item.quantity + delta
        if (newQ < 1) return item
        if (delta > 0 && totalQuantity >= MAX_ITEMS) return item
        return { ...item, quantity: newQ }
      })
    )

  const handleSaveNote = () => {
    if (!note.trim()) return
    startNoteTransition(async () => {
      const result = await sendBoxNote(note)
      setNoteSaved(true)
      if (result.cartId) setNoteRef(result.cartId)
    })
  }

  const handleAddToCart = () => {
    setError(null)
    startCartTransition(async () => {
      try {
        for (const item of selectedItems) {
          await addToCart({ variantId: item.variantId, quantity: item.quantity, countryCode })
        }
        if (selectedWrap?.variantId) {
          await addToCart({ variantId: selectedWrap.variantId, quantity: 1, countryCode })
        }
        router.push(`/${countryCode}/cart`)
      } catch (e: any) {
        setError(e.message ?? "Failed to add to cart. Please try again.")
      }
    })
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="bg-obana-cream min-h-screen">
      {/* Page header */}
      <section className="pt-28 pb-10 text-center">
        <h1 className="font-heading text-4xl small:text-5xl font-bold text-[#101010] mb-3">
          Build a box
        </h1>
        <p className="text-[#636363] text-sm small:text-base max-w-md mx-auto">
          Curate your custom packages, sit back, relax, and we deliver to you.
        </p>
      </section>

      {/* Two-column layout */}
      <div className="content-container pb-24">
        <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── Left Panel ── */}
          <div>
            {/* Step indicator */}
            <div className="flex border border-grey-20 rounded-xl overflow-hidden mb-6 bg-white">
              {[
                { n: 1, label: "Choose items" },
                { n: 2, label: "Choose wrap" },
                { n: 3, label: "Add a note" },
              ].map(({ n, label }, idx) => (
                <div
                  key={n}
                  className={`flex items-center gap-2 flex-1 px-4 py-3 ${idx < 2 ? "border-r border-grey-20" : ""}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      step === n ? "bg-obana-pink text-white" : "border border-grey-30 text-grey-50"
                    }`}
                  >
                    {n}
                  </span>
                  <span className={`text-sm font-product ${step === n ? "text-[#101010]" : "text-grey-50"}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Step 1: Choose Items ── */}
            {step === 1 && (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <p className="text-sm text-[#636363]">
                    Select up to {MAX_ITEMS} items from the list below (min.&nbsp;{MIN_ITEMS}&nbsp;max.&nbsp;{MAX_ITEMS})
                  </p>
                  {categories.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#636363]">Sort by</span>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="text-sm border border-grey-20 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-obana-pink"
                      >
                        <option value="all">All</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.handle ?? c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {displayProducts.map((product) => {
                    const inBox = isInBox(product.id!)
                    const oos = isOutOfStock(product)
                    const v = product.variants?.[0]
                    const pd = v ? getPricesForVariant(v as any) : null
                    const atMax = totalQuantity >= MAX_ITEMS && !inBox

                    return (
                      <div key={product.id} className="bg-white rounded-2xl overflow-hidden">
                        <div className="aspect-square relative bg-grey-5">
                          {product.thumbnail ? (
                            <Image src={product.thumbnail} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 280px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <PlaceholderImage size={40} />
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex flex-col items-center gap-2">
                          <p className="text-sm font-product text-[#101010] text-center leading-snug">{product.title}</p>
                          {pd && <p className="text-sm text-[#636363]">{pd.calculated_price}</p>}
                          {oos ? (
                            <span className="w-full text-center py-2 rounded-full border border-grey-20 text-xs text-grey-40">Out of stock</span>
                          ) : inBox ? (
                            <button disabled className="w-full py-2 rounded-full bg-obana-pink text-white text-sm flex items-center justify-center gap-1.5">
                              <CheckIcon /> Added
                            </button>
                          ) : (
                            <button
                              onClick={() => addToBox(product)}
                              disabled={atMax}
                              className={`w-full py-2 rounded-full border text-sm transition-colors ${
                                atMax ? "border-grey-20 text-grey-40 cursor-not-allowed" : "border-obana-pink text-obana-pink hover:bg-obana-pink hover:text-white"
                              }`}
                            >
                              Add to box
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Step 2: Choose Wrap ── */}
            {step === 2 && (
              <div>
                <p className="text-sm text-[#636363] mb-6">Select from one of our Obana box wraps</p>
                <div className="grid grid-cols-2 gap-4">
                  {wraps.map((wrap) => {
                    const isSelected = selectedWrap?.id === wrap.id
                    return (
                      <div key={wrap.id} className="bg-white rounded-2xl overflow-hidden">
                        <div className={`relative ${wrap.bgColor}`} style={{ paddingBottom: "62%" }}>
                          {wrap.thumbnail && (
                            <Image src={wrap.thumbnail} alt={wrap.title} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 280px" />
                          )}
                        </div>
                        <div className="p-3 flex flex-col items-center gap-2">
                          <p className="text-sm font-medium text-[#101010]">{wrap.title}</p>
                          <button
                            onClick={() => setSelectedWrap(isSelected ? null : wrap)}
                            className={`w-full py-2 rounded-full border text-sm transition-colors ${
                              isSelected
                                ? "bg-obana-pink border-obana-pink text-white"
                                : "border-obana-pink text-obana-pink hover:bg-obana-pink hover:text-white"
                            }`}
                          >
                            {isSelected ? "Selected" : "Select option"}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── Step 3: Add a Note ── */}
            {step === 3 && (
              <div>
                <p className="text-sm text-[#636363] mb-6 leading-relaxed">
                  Include an optional note in your box. Use the input field below, then click the &ldquo;add note&rdquo; button to save your note
                </p>
                <div className="relative">
                  <textarea
                    value={note}
                    onChange={(e) => {
                      if (e.target.value.length <= 100) {
                        setNote(e.target.value)
                        setNoteSaved(false)
                      }
                    }}
                    placeholder="Write your note here"
                    rows={6}
                    className="w-full border border-grey-20 rounded-xl p-4 text-sm text-[#101010] placeholder-grey-40 focus:outline-none focus:ring-1 focus:ring-obana-pink resize-none bg-white"
                  />
                  <span className="absolute bottom-3 right-3 text-xs text-grey-40">{note.length}/100</span>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={handleSaveNote}
                    disabled={isNotePending || !note.trim()}
                    className="px-6 py-2 rounded-full border border-obana-pink text-obana-pink text-sm hover:bg-obana-pink hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isNotePending ? "Saving…" : "Add note"}
                  </button>
                  {noteSaved && (
                    <span className="text-xs text-green-600">Note saved!</span>
                  )}
                </div>
                {noteSaved && noteRef && (
                  <div className="mt-4 p-3 rounded-xl bg-white border border-grey-20">
                    <p className="text-xs text-[#636363]">Reference ID attached to your note:</p>
                    <p className="text-xs font-mono text-[#101010] mt-0.5 break-all">{noteRef}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right Panel: Box Summary (sticky) ── */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Header */}
              <div className="px-4 py-3 flex justify-between items-center" style={{ backgroundColor: "#D4A29C" }}>
                <span className="text-white font-semibold text-sm">Your Obana box</span>
                <span className="text-white text-xs">
                  {totalQuantity > 0
                    ? `${totalQuantity} selected item${totalQuantity === 1 ? "" : "s"}`
                    : "No selected items"}
                </span>
              </div>

              {/* Item list */}
              <div className="p-4">
                {selectedItems.length === 0 ? (
                  <div className="flex flex-col items-center py-10 text-center">
                    <BoxEmptyIcon />
                    <p className="font-semibold text-[#101010] mt-3 text-sm">No items in your box yet</p>
                    <p className="text-xs text-[#636363] mt-1">Add an item to your box to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {selectedItems.map((item) => (
                      <div key={item.product.id} className="flex gap-2.5 items-start">
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-grey-5 flex-shrink-0 relative">
                          {item.product.thumbnail ? (
                            <Image src={item.product.thumbnail} alt={item.product.title} fill className="object-cover" sizes="56px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <PlaceholderImage size={14} />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-product text-[#101010] leading-snug">{item.product.title}</p>
                          <p className="text-xs text-[#636363] mt-0.5">{item.priceFormatted}</p>
                          <div className="flex items-center justify-between mt-1.5">
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateQty(item.product.id!, -1)} className="w-5 h-5 rounded-full border border-grey-20 flex items-center justify-center text-grey-50 leading-none text-sm">−</button>
                              <span className="text-xs w-4 text-center tabular-nums">{item.quantity}</span>
                              <button onClick={() => updateQty(item.product.id!, 1)} disabled={totalQuantity >= MAX_ITEMS} className="w-5 h-5 rounded-full border border-grey-20 flex items-center justify-center text-grey-50 leading-none text-sm disabled:opacity-40">+</button>
                            </div>
                            <button onClick={() => removeFromBox(item.product.id!)} className="flex items-center gap-1 text-xs text-grey-40 hover:text-obana-pink transition-colors">
                              <CircleXIcon /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price breakdown */}
              {selectedItems.length > 0 && (
                <div className="border-t border-grey-10 px-4 py-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#636363]">Items</span>
                    <span className="font-medium">{fmt(itemsTotal)}</span>
                  </div>
                  {selectedWrap && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[#636363]">Box</span>
                      <span className="font-medium">{selectedWrap.priceFormatted}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-semibold pt-0.5">
                    <span>Total</span>
                    <span>{fmt(grandTotal)}</span>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="px-4 pb-4 pt-1">
                {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
                {step < 3 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2)}
                    className={`w-full py-3 rounded-full text-sm font-semibold transition-colors ${
                      (step === 1 && !canNext1) || (step === 2 && !canNext2)
                        ? "bg-grey-20 text-grey-40 cursor-not-allowed"
                        : "bg-obana-pink text-white hover:opacity-90"
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isCartPending}
                    className="w-full py-3 rounded-full bg-obana-pink text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
                  >
                    {isCartPending ? "Adding to cart…" : "Add to cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
