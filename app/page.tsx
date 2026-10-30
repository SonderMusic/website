import Download from "@/components/Download";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OpenSubsonic from "@/components/OpenSubsonic";
import Statement from "@/components/Statement";

export default function Page() {
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Statement />
        <Features />
        <OpenSubsonic />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
