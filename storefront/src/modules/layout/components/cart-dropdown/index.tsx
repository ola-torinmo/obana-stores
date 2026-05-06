"use client"

import { Popover, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState, useTransition } from "react"

import { updateLineItem } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

function QuantityControl({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  const [isPending, startTransition] = useTransition()

  const change = (delta: number) => {
    const next = quantity + delta
    if (next < 1) return
    startTransition(async () => {
      await updateLineItem({ lineId, quantity: next }).catch(() => {})
    })
  }

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <button
        onClick={() => change(-1)}
        disabled={isPending || quantity <= 1}
        className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 text-xs disabled:opacity-40 hover:border-obana-pink hover:text-obana-pink transition-colors"
      >
        −
      </button>
      <span className="text-xs w-4 text-center tabular-nums" data-testid="cart-item-quantity" data-value={quantity}>
        {quantity}
      </span>
      <button
        onClick={() => change(1)}
        disabled={isPending}
        className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 text-xs disabled:opacity-40 hover:border-obana-pink hover:text-obana-pink transition-colors"
      >
        +
      </button>
    </div>
  )
}

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => { if (activeTimer) clearTimeout(activeTimer) }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  const bagContent = (
    <>
      <Image src="/bag.png" alt="Cart" width={24} height={24} className="w-6 h-6 object-contain" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-obana-pink text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </>
  )

  return (
    <>
      {/* Mobile: direct link to cart page */}
      <LocalizedClientLink
        href="/cart"
        className="relative flex items-center hover:opacity-75 transition-opacity small:hidden"
        data-testid="nav-cart-link"
      >
        {bagContent}
      </LocalizedClientLink>

      {/* Desktop: hover dropdown */}
      <div className="hidden small:flex h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
      <Popover className="relative h-full">
        {/* Use as={Fragment} so the <a> is the direct trigger — avoids invalid <button><a> nesting */}
        <Popover.Button as={Fragment}>
          <LocalizedClientLink
            className="h-full flex items-center hover:opacity-75 transition-opacity relative"
            href="/cart"
            data-testid="nav-cart-link"
          >
            {bagContent}
          </LocalizedClientLink>
        </Popover.Button>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            static
            className="absolute top-[calc(100%+1px)] right-0 bg-[#FAFAFA] border-x border-b border-gray-200 w-[min(420px,calc(100vw-2rem))] text-ui-fg-base"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi">Cart</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                  {cartState.items
                    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                    .map((item) => (
                      <div className="grid grid-cols-[122px_1fr] gap-x-4" key={item.id} data-testid="cart-item">
                        <LocalizedClientLink href={`/products/${item.variant?.product?.handle}`} className="w-24">
                          <Thumbnail thumbnail={item.variant?.product?.thumbnail} images={item.variant?.product?.images} size="square" />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                <h3 className="text-base-regular overflow-hidden text-ellipsis font-product">
                                  <LocalizedClientLink href={`/products/${item.variant?.product?.handle}`} data-testid="product-link">
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <QuantityControl lineId={item.id} quantity={item.quantity} />
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice item={item} style="tight" />
                              </div>
                            </div>
                          </div>
                          <DeleteButton id={item.id} className="mt-1" data-testid="cart-item-remove-button">
                            Remove
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-fg-base font-semibold">
                      Subtotal <span className="font-normal">(excl. taxes)</span>
                    </span>
                    <span className="text-large-semi" data-testid="cart-subtotal" data-value={subtotal}>
                      {convertToLocale({ amount: subtotal, currency_code: cartState.currency_code })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button className="w-full !bg-obana-pink !border-obana-pink hover:!opacity-90" size="large" data-testid="go-to-cart-button">
                      Go to cart
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                <div className="bg-obana-pink text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                  <span>0</span>
                </div>
                <span>Your shopping bag is empty.</span>
                <div>
                  <LocalizedClientLink href="/store">
                    <>
                      <span className="sr-only">Go to all products page</span>
                      <Button onClick={close} className="bg-obana-pink hover:bg-obana-pink-light border-none">Explore products</Button>
                    </>
                  </LocalizedClientLink>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
      </div>
    </>
  )
}

export default CartDropdown
