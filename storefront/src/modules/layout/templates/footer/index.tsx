import Image from "next/image"

const SOCIAL_LINKS = [
  {
    label: "Instagram (@theobanacompany)",
    href: "https://instagram.com/theobanacompany",
    icon: "/instagram.png",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/447538955246",
    icon: "/whatsapp.png",
  },
]

const Footer = () => {
  return (
    <footer className="px-4 small:px-8 pb-8">
      <div className="max-w-[1272px] mx-auto flex flex-col items-center">
        <div className="w-full border-t border-grey-20" />

        <div className="flex items-center gap-x-7 mt-16 small:mt-[75px]">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-[52px] h-[52px] rounded-full border border-obana-pink flex items-center justify-center hover:bg-white/60 transition-colors duration-200"
            >
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 object-contain"
              />
            </a>
          ))}
        </div>

        <p className="mt-16 small:mt-[100px] flex items-center gap-x-1.5 font-heading text-sm text-[#636363]">
          <Image
            src="/copyright.png"
            alt="©"
            width={14}
            height={14}
            className="w-3.5 h-3.5 object-contain"
          />
          2025 Obana
        </p>
      </div>
    </footer>
  )
}

export default Footer
