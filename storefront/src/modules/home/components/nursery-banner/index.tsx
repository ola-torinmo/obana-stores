"use client"

import { useState, useEffect, useCallback } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const slides = [
  {
    image: "/nursery-bg.png",
    side: "right" as const,
    heading: "Build your dream nursery",
    body: "From cozy cribs to charming décor, discover everything you need to create a beautiful and functional space where precious memories begin. Shop curated collections designed to grow with your little one.",
    cta: "Build a box",
    href: "/build-a-box",
  },
  {
    image: "/nursery-bg2.png",
    side: "left" as const,
    heading: "Start gifting intentionally",
    body: "Give gifts that feel personal, not generic. Design custom mugs with photos, messages, or inside jokes that show you actually put thought into it.",
    cta: "Create your mug",
    href: "/store",
  },
]

const NurseryBanner = () => {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]
  const isLeft = slide.side === "left"

  return (
    <section className="relative w-full h-[500px] small:h-[620px] overflow-hidden">

      {/* Background slides */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${s.image}')`,
            opacity: i === current ? 1 : 0,
            /* Smooth 1.8s ease-in-out crossfade */
            transition: "opacity 1.8s ease-in-out",
            /* Ken Burns zoom on the active slide — key change restarts via CSS */
            animation: i === current ? "kenBurns 6s ease-out forwards" : "none",
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content — key={current} remounts on slide change, restarting textFadeUp */}
      <div
        className={`relative z-10 content-container h-full flex items-center ${
          isLeft ? "justify-center small:justify-start" : "justify-center small:justify-end"
        }`}
      >
        <div
          key={current}
          className={`flex flex-col gap-4 max-w-xs small:max-w-sm ${
            isLeft
              ? "items-center small:items-start text-center small:text-left"
              : "items-center small:items-start text-center small:text-left"
          }`}
          style={{ animation: "textFadeUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }}
        >
          <h2 className="font-heading text-2xl small:text-3xl large:text-4xl font-bold text-white leading-snug">
            {slide.heading}
          </h2>
          <p className="text-white/85 text-xs small:text-sm leading-relaxed">
            {slide.body}
          </p>
          <LocalizedClientLink
            href={slide.href}
            className="mt-1 bg-obana-pink hover:bg-obana-mauve text-white font-semibold px-7 py-2.5 small:px-8 small:py-3 rounded-full transition-colors duration-200 text-sm"
          >
            {slide.cta}
          </LocalizedClientLink>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-x-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current ? "bg-white w-4" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>

    </section>
  )
}

export default NurseryBanner