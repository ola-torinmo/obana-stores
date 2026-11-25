import { CheckCircle } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

/**
 * Reads the box contents from product.metadata.included_items.
 * Accepts either a real array of strings or a JSON-encoded array string
 * (Medusa admin metadata values are often saved as strings).
 */
export const getIncludedItems = (product: HttpTypes.StoreProduct): string[] => {
  const raw = product.metadata?.included_items
  let value: unknown = raw

  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw)
    } catch {
      value = raw.split(",")
    }
  }

  if (!Array.isArray(value)) return []

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function IncludedItems({ items }: { items: string[] }) {
  if (!items.length) return null

  return (
    <section aria-labelledby="included-heading" className="flex flex-col gap-y-6">
      <h2
        id="included-heading"
        className="font-heading font-bold text-lg text-[#101010]"
      >
        What&apos;s included?
      </h2>
      <ul className="grid grid-cols-1 small:grid-cols-3 gap-x-6 gap-y-4">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-x-2 text-base text-[#636363]"
          >
            <CheckCircle
              className="w-[18px] h-[18px] flex-shrink-0 text-obana-pink-light"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
