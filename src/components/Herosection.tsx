import Image from "next/image"; // Don't forget to import Image

const HeroSection = () => {
  return (
    <section className="relative w-full h-[650px] rounded-lg mt-0 md:mt-10 overflow-hidden">
      <Image
        src="/images/hero.JPG" 
        alt="Професійна стилізація брів"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent rounded-lg" />

      <div className="relative z-0 h-full text-center md:text-left flex flex-col justify-end md:justify-center p-6 sm:p-12 md:w-3/4 lg:w-3/5">
        <div className="text-white">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-balance leading-tight">
            Професійна стилізація брів!
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-200 max-w-lg">
            Ідеальна форма для вашої краси та впевненості.
          </p>

          <button className="mt-8 px-8 py-3 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-700 transition-colors duration-300">
            Записатись онлайн
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;