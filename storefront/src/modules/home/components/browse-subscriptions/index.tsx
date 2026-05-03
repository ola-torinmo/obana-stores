import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const subscriptions = [
  { id: "nappy", name: "Nappy package", price: "From £53.00", href: "/collections/nappy-package", image: "/nappy.jpg" },
  { id: "wipes", name: "Wipes package", price: "From £47.00", href: "/collections/wipes-package", image: "/wipes.jpg" },
]

const BrowseSubscriptions = () => {
  return (
    <section className="bg-obana-cream py-12 small:py-16">
      <div className="content-container">
        <div className="text-center mb-8 small:mb-10">
          <h2 className="font-heading text-2xl small:text-3xl font-bold text-obana-brown mb-3">
            Browse subscriptions
          </h2>
          <p className="text-gray-500 text-xs small:text-sm max-w-sm small:max-w-md mx-auto leading-relaxed">
            Subscribe and get your essentials delivered monthly, no more
            last-minute shopping trips. Automatic delivery, zero hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 xsmall:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-[20px] p-2  flex flex-col items-center gap-y-3 shadow-sm"
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
              <span className="font-heading font-bold text-base small:text-lg text-obana-brown">
                {sub.name}
              </span>
              <span className="text-gray-600 text-sm">{sub.price}</span>
              <LocalizedClientLink
                href={sub.href}
                className="border border-obana-pink text-obana-pink text-xs small:text-[12px] font-semibold px-5 small:px-4 py-2 rounded-[100px] hover:bg-obana-pink hover:text-white transition-colors duration-200  mb-4"
              >
                Get started
              </LocalizedClientLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrowseSubscriptions
