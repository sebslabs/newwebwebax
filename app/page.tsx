import HeroSection from "./components/HeroSection";
import ClientLogos from "./components/ClientLogos";
import CoreSolutions from "./components/CoreSolutions";
import ProductSuite from "./components/ProductSuite";
import TrustStats from "./components/TrustStats";
import CtaBanner from "./components/CtaBanner";
import FloatingActions from "./components/FloatingActions";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white relative">
      <HeroSection />
      <ClientLogos />
      <CoreSolutions />
      <ProductSuite />
      <TrustStats />
      <CtaBanner />
      <Footer />
      <FloatingActions />
    </main>
  );
}
