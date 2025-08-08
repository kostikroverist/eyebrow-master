import Image from "next/image"; // Don't forget to import Image
import Button from "./Button";
import { title } from "process";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section data-aos="fade-right" className="relative w-full h-[650px] rounded-lg mt-0 md:mt-10 overflow-hidden">
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
            Makeup & Brows
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-200 max-w-lg">
            Твій образ - моє мистецтво
          </p>
          <Link href="#services">
            <Button title={"Записатись онлайн"} className="mt-8" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
