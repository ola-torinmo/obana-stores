import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-obana-cream py-8">
      <div className="content-container flex flex-col items-center gap-y-5">

        {/* Constrained horizontal divider */}
        <div className="w-full border-t border-gray-300 mb-16 mt-8" />

        {/* Social icons */}
        <div className="flex items-center gap-x-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 flex items-center justify-center hover:border-obana-pink transition-colors duration-200"
          >
            <Image src="/instagram.png" alt="Instagram" width={20} height={20} className="w-[50px] h-[50px] object-contain" />
          </a>
          <a
            href="https://wa.me"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 flex items-center justify-center hover:border-obana-pink transition-colors duration-200"
          >
            <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} className="w-[50px] h-[50px] object-contain" />
          </a>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-x-1.5">
          <Image src="/copyright.png" alt="" width={12} height={12} className="w-3 h-3 object-contain opacity-50" />
          <p className="text-xs text-gray-400">2022 Obana</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer