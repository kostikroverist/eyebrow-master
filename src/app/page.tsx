import About from "@/components/About";
import BeautyGallery from "@/components/BeautyGallery";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Herosection from "@/components/Herosection";
import ServicesList from "@/components/ServicesList";
import VideoDescription from "@/components/VideoDescription";
import { beautyServices } from "@/constant/constants";

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <div className="max-w-[1200px] mx-auto ">
        <Herosection />
        <About />
        <ServicesList />
        <BeautyGallery />
        <VideoDescription
          videoUrl="images/beauty.MP4"
          title="Наша робота"
          description="Корекція фарбування брів"
        />
      </div>
      <Footer />
    </main>
  );
}
