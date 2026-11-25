"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { NAV_LINKS } from "@modules/layout/components/nav-links"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const linkClass =
    "px-6 py-4 text-[16px] text-[#636363] hover:text-obana-pink transition-colors"

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="small:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 flex-shrink-0"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
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
          <div
            id="mobile-nav-menu"
            className="fixed top-[88px] left-4 right-4 z-50 small:hidden bg-white/90 backdrop-blur-md rounded-[28px] shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col divide-y divide-grey-20 py-2">
              {NAV_LINKS.map(({ label, href }) =>
                href === "#" ? (
                  <a
                    key={label}
                    href="#"
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </a>
                ) : (
                  <LocalizedClientLink
                    key={label}
                    href={href}
                    className={linkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </LocalizedClientLink>
                )
              )}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
