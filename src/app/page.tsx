import BeautyServiceCard from "@/components/BeautyServiceCard";
import BeautyServiceCards from "@/components/BeautyServiceCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Herosection from "@/components/Herosection";
import { beautyServices } from "@/constant/constants";

export default function Home() {
  return (
    <main className="w-full">
        <Header />
      <div className="max-w-[1200px] mx-auto ">
        <Herosection />
        <BeautyServiceCards />
      </div>
        <Footer />
    </main>
  );
}
