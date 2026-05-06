import Image from "next/image"
import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "About Us | Obana",
  description: "Learn about Obana's story and our mission to support mothers at every stage of their journey.",
}

export default function AboutPage() {
  return (
    <main>

      {/* ── Section 1: Obana's story ── */}
      <section className="bg-obana-cream pt-32 pb-16 small:pt-40 small:pb-20">
        <div className="content-container max-w-3xl">
          <h1 className="font-heading text-3xl small:text-[48px] font-bold text-center text-[#101010] mb-6 small:mb-8 leading-tight">
            Obana&apos;s story
          </h1>
          <p className="text-center text-[#636363] text-sm small:text-[18px] leading-relaxed small:leading-[-0.5%]">
            Motherhood is a beautiful, overwhelming, transformative experience. From the moment you
            see those two lines to the day your little one takes their first steps, every milestone
            deserves celebration, support, and the very best products to make the journey easier.
            Obana was born from a simple belief: mothers and babies deserve better. Better products,
            better support, and a better shopping experience that understands the unique challenges of
            parenthood. We&apos;re not just an online store, we&apos;re a trusted partner through
            every stage of motherhood.
          </p>
        </div>
      </section>

      {/* ── Section 2: Meet the founder ── */}
      <section className="bg-[#F9F5F2] py-16 small:py-24">
        <div className="content-container">
          <div className="grid grid-cols-1 small:grid-cols-2 gap-10 small:gap-16 items-center">

            {/* Text */}
            <div className="flex flex-col gap-y-5 order-2 small:order-1">
              <h2 className="font-heading text-2xl small:text-[36px] font-bold text-[#101010] leading-snug">
                Meet Jummie &ndash; Founder &amp; Visionary Behind Obana
              </h2>
              <div className="flex flex-col gap-y-4 text-[#636363] text-sm small:text-[15px] leading-[-0.5%]">
                <p>
                  Jumoke&apos;s journey to founding Obana is deeply rooted in her professional
                  expertise and passion for maternal and infant care. With a distinguished background
                  in nursing and a Master&apos;s degree in midwifery, she brings a unique,
                  evidence-based perspective to the world of baby products and motherhood essentials.
                </p>
                <p>
                  As a midwife, Jumoke saw firsthand how the right products could ease the transition
                  into parenthood and how the wrong ones could add unnecessary stress to an already
                  overwhelming time. She noticed the gap between what healthcare professionals
                  recommend and what&apos;s readily available to parents in a clear, accessible way.
                </p>
              </div>
            </div>

            {/* Founder image */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-obana-cream order-1 small:order-2">
              <Image
                src="/founder.png"
                alt="Jummie – Founder of Obana"
                fill
                className="object-cover object-top"
                onError={undefined}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 3: Curated packages ── */}
      <section className="bg-obana-cream py-16 small:py-24">
        <div className="content-container">
          <div className="grid grid-cols-1 small:grid-cols-2 gap-10 small:gap-16 items-center">

            {/* Text */}
            <div className="flex flex-col gap-y-5">
              <h2 className="font-heading text-2xl small:text-[36px] font-bold text-[#101010] leading-snug">
                Obana curated packages
              </h2>
              <p className="text-[#636363] text-sm small:text-[15px] leading-[-0.5%]">
                Not sure where to start? Our curated packages make it simple to find what you need
                for every stage of motherhood. From pregnancy essentials to baby&apos;s first
                milestones, each bundle is thoughtfully put together with care, combining trusted
                products, expert guidance, and little touches that make a big difference.
              </p>
              <LocalizedClientLink
                href="/store"
                className="inline-flex items-center justify-center self-start mt-2 bg-obana-pink hover:bg-obana-pink text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors duration-200"
              >
                Explore packages
              </LocalizedClientLink>
            </div>

            {/* Overlapping product images */}
            <div className="relative h-[340px] small:h-[420px]">
              {/* Back card — larger, bottom-right */}
              <div className="absolute right-0 bottom-0 w-[62%] h-[78%] rounded-3xl overflow-hidden shadow-sm">
                <Image
                  src="/wipes.jpg"
                  alt="Wipes package"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Front card — smaller, top-left */}
              <div className="absolute left-0 top-0 w-[58%] h-[70%] rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/nappy.jpg"
                  alt="Nappy package"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}