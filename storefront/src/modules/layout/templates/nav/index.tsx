import { Suspense } from "react"
import Image from "next/image"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 small:px-8">
      <header className="bg-obana-cream rounded-[130px] max-w-[1272px] mx-auto">
        <nav className="flex items-center justify-between w-full px-5 small:px-8 py-3">

          {/* Logo */}
          <LocalizedClientLink
            href="/"
            className="hover:opacity-80 transition-opacity flex-shrink-0"
            data-testid="nav-store-link"
          >
            <Image
              src="/Logo.png"
              alt="Obana"
              width={110}
              height={44}
              className="h-9 small:h-10 w-auto object-contain"
              priority
            />
          </LocalizedClientLink>

          {/* Center nav links */}
          <div className="hidden small:flex items-center gap-x-8">
            <LocalizedClientLink
              href="/about"
              className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors"
            >
              About us
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/categories/baby"
              className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors"
            >
              Baby
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/categories/pregnancy"
              className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors"
            >
              Pregnancy
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/categories/postpartum"
              className="text-[16px] text-[#636363] hover:text-obana-pink transition-colors"
            >
              Postpartum
            </LocalizedClientLink>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-x-4">
            <LocalizedClientLink
              href="/account"
              className="hover:opacity-70 transition-opacity"
              data-testid="nav-account-link"
            >
              <Image
                src="/profile.png"
                alt="Account"
                width={22}
                height={22}
                className="w-5 h-5 small:w-6 small:h-6 object-contain"
              />
            </LocalizedClientLink>

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="hover:opacity-70 transition-opacity"
                  data-testid="nav-cart-link"
                >
                  <Image
                    src="/bag.png"
                    alt="Cart"
                    width={22}
                    height={22}
                    className="w-5 h-5 small:w-6 small:h-6 object-contain"
                  />
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
