"use client"

import { useParams, usePathname, useRouter } from "next/navigation"

const CATEGORIES = [
  { label: "Baby", handle: "baby" },
  { label: "Pregnancy", handle: "pregnancy" },
  { label: "Postpartum", handle: "postpartum" },
]

export default function NavCategoryLinks() {
  const { countryCode } = useParams()
  const pathname = usePathname()
  const router = useRouter()

  // Home page is /{countryCode} with no further segments
  const isHome = pathname === `/${countryCode}` || pathname === `/${countryCode}/`

  const handleClick = (e: React.MouseEvent, handle: string) => {
    e.preventDefault()

    if (isHome) {
      // Already on home — switch tab via event, then smooth-scroll
      window.dispatchEvent(
        new CustomEvent("obana-category-tab", { detail: handle })
      )
      document
        .getElementById("shop-by-category")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      // Navigate to home with the category param so the tab pre-selects on load
      router.push(`/${countryCode}/?category=${handle}`)
    }
  }

  return (
    <>
      {CATEGORIES.map(({ label, handle }) => (
        <a
          key={handle}
          href={`/${countryCode}/?category=${handle}`}
          onClick={(e) => handleClick(e, handle)}
          className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors cursor-pointer"
        >
          {label}
        </a>
      ))}
    </>
  )
}
