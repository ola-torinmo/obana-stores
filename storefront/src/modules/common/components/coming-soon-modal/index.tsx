"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

type ComingSoonModalProps = {
  onClose: () => void
  message?: string
}

/** Shared "Coming Soon" dialog (subscriptions, Grab & Go, Blog). */
export default function ComingSoonModal({
  onClose,
  message = "We're putting the finishing touches on this. Check back soon — good things take time!",
}: ComingSoonModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
    >
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
        <h2
          id="coming-soon-title"
          className="font-heading text-4xl font-bold text-[#101010] mb-3 text-center"
        >
          Coming Soon
        </h2>
        <p className="text-[#636363] text-sm text-center leading-relaxed max-w-xs">
          {message}
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
            src="/logo-cropped.png"
            alt="Obana"
            width={68}
            height={29}
            className="h-6 w-auto object-contain opacity-60"
          />
        </div>
      </div>
    </div>,
    document.body
  )
}
