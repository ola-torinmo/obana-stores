"use client"

import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  thumbnail?: string | null
}

const frameClass =
  "relative aspect-[450/538] w-full overflow-hidden rounded-[20px] bg-grey-10"

const IMAGE_SIZES =
  "(max-width: 1023px) 100vw, (max-width: 1439px) 50vw, 780px"

const ImageGallery = ({ images, thumbnail }: ImageGalleryProps) => {
  const withUrl = images.filter((image) => !!image.url)
  // Some products only have a thumbnail set in the admin, with no gallery
  // images. Fall back to the thumbnail so the page isn't left empty.
  const visible =
    withUrl.length > 0
      ? withUrl
      : thumbnail
      ? [{ id: "thumbnail", url: thumbnail } as HttpTypes.StoreProductImage]
      : []

  if (!visible.length) {
    return (
      <div className={`${frameClass} flex items-center justify-center`}>
        <PlaceholderImage size={48} />
      </div>
    )
  }

  if (visible.length === 1) {
    return (
      <div className={frameClass}>
        <Image
          src={visible[0].url!}
          priority
          className="object-cover"
          alt="Product image"
          fill
          sizes={IMAGE_SIZES}
        />
      </div>
    )
  }

  return <Carousel images={visible} />
}

/**
 * Swipeable gallery built on CSS scroll-snap: native touch swipe and
 * trackpad scrolling, plus prev/next buttons, dots and arrow-key support.
 */
const Carousel = ({ images }: { images: HttpTypes.StoreProductImage[] }) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const count = images.length

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current
      if (!track) return
      const clamped = Math.max(0, Math.min(count - 1, index))
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" })
    },
    [count]
  )

  // Keep the active index in sync with swipes/scrolls.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!track.clientWidth) return
        setActive(Math.round(track.scrollLeft / track.clientWidth))
      })
    }

    track.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      goTo(active + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      goTo(active - 1)
    }
  }

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm text-[#101010] flex items-center justify-center shadow-sm transition-opacity hover:bg-white disabled:opacity-0 disabled:pointer-events-none"

  return (
    <div
      className="flex flex-col gap-y-4"
      role="region"
      aria-roledescription="carousel"
      aria-label="Product images"
    >
      <div className="relative">
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-obana-pink"
          data-testid="product-image-carousel"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              id={image.id}
              className={`${frameClass} flex-shrink-0 snap-center snap-always`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
            >
              <Image
                src={image.url!}
                priority={index === 0}
                className="object-cover"
                alt={`Product image ${index + 1}`}
                fill
                sizes={IMAGE_SIZES}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous image"
          className={`${arrowClass} left-3`}
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === count - 1}
          aria-label="Next image"
          className={`${arrowClass} right-3`}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex items-center justify-center gap-x-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-200 ${
              index === active
                ? "w-6 bg-obana-pink"
                : "w-2 bg-grey-30 hover:bg-grey-40"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
