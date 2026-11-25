import { HttpTypes } from "@medusajs/types"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  thumbnail?: string | null
}

const frameClass =
  "relative aspect-[450/538] w-full overflow-hidden rounded-[20px] bg-grey-10"

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

  return (
    <div className="flex flex-col gap-y-4">
      {visible.map((image, index) => (
        <div key={image.id} id={image.id} className={frameClass}>
          <Image
            src={image.url!}
            priority={index === 0}
            className="object-cover"
            alt={`Product image ${index + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 450px"
          />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
