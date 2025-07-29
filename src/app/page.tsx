import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Herosection from "@/components/Herosection";

export default function Home() {
  return (
    <main className="w-full">
        <Header />
      <div className="max-w-[1200px] mx-auto ">
        <Herosection />
      </div>
        <Footer />
    </main>
  );
}
