import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="relative w-full flex-1 min-h-0 small:flex-none small:h-screen small:min-h-[600px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#000000BF]" />

      {/* Content — padded top to clear floating nav */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-5 gap-4 small:gap-2 pt-5">
        <h1 className="font-heading text-3xl small:text-[58px] large:text-[58px] font-bold text-white leading-tight tracking-[-1%] max-w-6xl small:max-w-6xl">
          Your motherhood journey starts here 
        </h1>
        <p className="text-white/85 text-xs small:text-[16px] max-w-xs small:max-w-3xl leading-[26px] tracking-[-0.5%]">
          No judgment, no perfection, just honest support for the incredible
          journey you&apos;re on. Whether you&apos;re celebrating milestones or
          struggling through tough days, find the guidance, and products you
          need.
        </p>
        <LocalizedClientLink
          href="/build-a-box"
          className="mt-1 bg-obana-pink hover:bg-obana-mauve text-white text-[14px] font-semibold px-[20px] py-[20px] rounded-[100px] transition-colors duration-200 text-sm w-[115px] h-[50px] flex items-center justify-center tracking-[-0.5%]"
        >
          Build a box
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default Hero
