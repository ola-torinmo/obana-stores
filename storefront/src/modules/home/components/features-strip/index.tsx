import Image from "next/image"

const features = [
  { icon: "/premium-quality.png", label: "Premium quality products" },
  { icon: "/beautiful-designs.png", label: "Beautiful designs" },
  { icon: "/tested-trusted.png", label: "Tested & trusted" },
  { icon: "/swift-delivery.png", label: "Swift delivery" },
]

const FeaturesStrip = () => {
  return (
    <section className="bg-obana-mauve py-[28px] overflow-hidden">

      {/* Mobile: infinite marquee scroll */}
      <div className="flex small:hidden">
        <ul className="flex animate-marquee flex-nowrap items-center gap-x-8 pr-8">
          {[...features, ...features].map((feature, index) => (
            <li key={index} className="flex items-center gap-x-2 text-white flex-shrink-0">
              <Image
                src={feature.icon}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-medium whitespace-nowrap">
                {feature.label}
              </span>
              <span className="text-white/50 text-xs ml-6">•</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: static centered layout */}
      <div className="content-container hidden small:block">
        <ul className="flex items-center justify-center gap-x-10">
          {features.map((feature, index) => (
            <li key={feature.label} className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2 text-white">
                <Image
                  src={feature.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain mb-1"
                />
                <span className="text-sm font-medium whitespace-nowrap">
                  {feature.label}
                </span>
              </div>
              {index < features.length - 1 && (
                <span className="text-white text-md pl-4">•</span>
              )}
            </li>
          ))}
        </ul>
      </div>

    </section>
  )
}

export default FeaturesStrip