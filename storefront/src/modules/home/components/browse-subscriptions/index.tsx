"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

const subscriptions = [
  { id: "nappy", name: "Nappy package", price: "From £53.00", image: "/nappy.jpg" },
  { id: "wipes", name: "Wipes package", price: "From £47.00", image: "/wipes.jpg" },
]

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal card */}
      <div
        className="relative bg-obana-cream rounded-3xl shadow-2xl w-full max-w-md px-10 pt-12 pb-8 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#636363] hover:bg-obana-mauve/20 hover:text-obana-pink transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Decorative ring */}
        <div className="w-20 h-20 rounded-full border-4 border-obana-pink/30 flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-obana-pink/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF67B3" strokeWidth="1.8">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-4xl font-bold text-[#101010] mb-3 text-center">
          Coming Soon
        </h2>
        <p className="text-[#636363] text-sm text-center leading-relaxed max-w-xs">
          We&apos;re putting the finishing touches on our subscription packages. Check back soon — good things take time!
        </p>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="mt-8 px-8 py-2.5 rounded-full bg-obana-pink text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Got it
        </button>

        {/* Logo — bottom left */}
        <div className="absolute bottom-5 left-6">
          <Image
            src="/Logo.png"
            alt="Obana"
            width={72}
            height={29}
            className="h-6 w-auto object-contain opacity-60"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

const BrowseSubscriptions = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="bg-obana-cream py-12 small:py-16">
        <div className="content-container">
          <div className="text-center mb-8 small:mb-10">
            <h2 className="font-heading text-2xl small:text-3xl font-bold text-[#101010] mb-3">
              Browse subscriptions
            </h2>
            <p className="text-[#636363] text-xs small:text-sm max-w-sm small:max-w-md mx-auto leading-relaxed">
              Subscribe and get your essentials delivered monthly, no more
              last-minute shopping trips. Automatic delivery, zero hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 xsmall:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white rounded-[20px] p-2 flex flex-col items-center gap-y-3 shadow-sm"
              >
                <div className="relative w-full aspect-square rounded-[20px] overflow-hidden mb-2">
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 512px) 100vw, 50vw"
                  />
                </div>
                <span className="font-heading font-bold text-base small:text-lg text-[#101010]">
                  {sub.name}
                </span>
                <span className="text-[#636363] text-sm">{sub.price}</span>
                <button
                  onClick={() => setModalOpen(true)}
                  className="border border-obana-pink text-obana-pink text-xs small:text-[12px] font-semibold px-5 small:px-4 py-2 rounded-[100px] hover:bg-obana-pink hover:text-white transition-colors duration-200 mb-4"
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalOpen && <ComingSoonModal onClose={() => setModalOpen(false)} />}
    </>
  )
}

export default BrowseSubscriptions
