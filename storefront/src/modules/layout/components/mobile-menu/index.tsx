"use client"

import { useState, useEffect } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CATEGORIES = [
  { label: "Baby", handle: "baby" },
  { label: "Pregnancy", handle: "pregnancy" },
  { label: "Postpartum", handle: "postpartum" },
]

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { countryCode } = useParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isHome =
    pathname === `/${countryCode}` || pathname === `/${countryCode}/`

  const handleCategoryClick = (e: React.MouseEvent, handle: string) => {
    e.preventDefault()
    setIsOpen(false)
    if (isHome) {
      window.dispatchEvent(
        new CustomEvent("obana-category-tab", { detail: handle })
      )
      document
        .getElementById("shop-by-category")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      router.push(`/${countryCode}/?category=${handle}`)
    }
  }

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="small:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 flex-shrink-0"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-[20px] h-[1.5px] bg-[#636363] origin-center transition-transform duration-300 ${
            isOpen ? "translate-y-[6.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`block w-[20px] h-[1.5px] bg-[#636363] transition-opacity duration-200 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-[20px] h-[1.5px] bg-[#636363] origin-center transition-transform duration-300 ${
            isOpen ? "-translate-y-[6.5px] -rotate-45" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 small:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown panel */}
          <div className="fixed top-[76px] left-4 right-4 z-50 small:hidden bg-obana-cream rounded-2xl shadow-lg overflow-hidden">
            <nav className="flex flex-col divide-y divide-grey-20">
              <LocalizedClientLink
                href="/about"
                className="px-6 py-4 text-[16px] text-[#636363] hover:text-obana-pink hover:bg-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About us
              </LocalizedClientLink>

              {CATEGORIES.map(({ label, handle }) => (
                <a
                  key={handle}
                  href={`/${countryCode}/?category=${handle}`}
                  onClick={(e) => handleCategoryClick(e, handle)}
                  className="px-6 py-4 text-[16px] text-[#636363] hover:text-obana-pink hover:bg-white transition-colors cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
