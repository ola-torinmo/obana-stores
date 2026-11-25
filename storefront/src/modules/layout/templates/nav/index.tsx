import { Suspense } from "react"
import Image from "next/image"
import UserCircle from "@modules/common/icons/user-circle"
import Bag from "@modules/common/icons/bag"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import MobileMenu from "@modules/layout/components/mobile-menu"
import { NAV_LINKS } from "@modules/layout/components/nav-links"

export default async function Nav() {
  return (
    <div className="fixed top-4 small:top-10 left-0 right-0 z-50 px-4 small:px-8">
      <header className="bg-white/60 backdrop-blur-md rounded-full max-w-[1272px] mx-auto">
        <nav className="grid grid-cols-[1fr_auto] small:grid-cols-[1fr_auto_1fr] items-center w-full h-16 small:h-20 px-5 small:px-8">
          {/* Logo */}
          <LocalizedClientLink
            href="/"
            className="hover:opacity-80 transition-opacity justify-self-start"
            data-testid="nav-store-link"
          >
            <Image
              src="/logo-cropped.png"
              alt="Obana"
              width={136}
              height={58}
              className="h-9 small:h-11 w-auto object-contain"
              priority
            />
          </LocalizedClientLink>

          {/* Center nav links */}
          <div className="hidden small:flex items-center gap-x-[60px]">
            {NAV_LINKS.map(({ label, href }) =>
              href === "#" ? (
                <a
                  key={label}
                  href="#"
                  className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors"
                >
                  {label}
                </a>
              ) : (
                <LocalizedClientLink
                  key={label}
                  href={href}
                  className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors"
                >
                  {label}
                </LocalizedClientLink>
              )
            )}
            <LocalizedClientLink
              href="/store"
              className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors"
            >
              Products
            </LocalizedClientLink>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-x-4 justify-self-end text-[#636363]">
            <MobileMenu />

            <LocalizedClientLink
              href="/account"
              className="text-[#636363] hover:text-obana-pink transition-colors"
              data-testid="nav-account-link"
              aria-label="Account"
            >
              <UserCircle size={24} />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="text-[#636363] hover:text-obana-pink transition-colors"
                  data-testid="nav-cart-link"
                  aria-label="Cart"
                >
                  <Bag size={24} />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
