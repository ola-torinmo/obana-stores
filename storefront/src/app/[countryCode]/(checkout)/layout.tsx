import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-obana-cream relative small:min-h-screen">
      {/* Header */}
      <div className="bg-obana-cream border-b border-[#E5DDD4]">
        <nav className="flex h-16 items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-sm text-[#636363] flex items-center gap-x-2 flex-1 basis-0 hover:text-obana-pink transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="hidden small:block">Back to shopping cart</span>
            <span className="block small:hidden">Back</span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            className="hover:opacity-80 transition-opacity"
            data-testid="store-link"
          >
            <Image
              src="/Logo.png"
              alt="Obana"
              width={110}
              height={44}
              className="h-9 w-auto object-contain"
              priority
            />
          </LocalizedClientLink>

          <div className="flex-1 basis-0" />
        </nav>
      </div>

      {/* Page content */}
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>

      {/* Footer */}
      <div className="py-5 w-full flex items-center justify-center border-t border-[#E5DDD4] mt-8">
        <p className="text-xs text-[#636363]">
          © {new Date().getFullYear()} Obana. All rights reserved.
        </p>
      </div>
    </div>
  )
}
