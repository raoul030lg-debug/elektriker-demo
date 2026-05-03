import Notdienst from "./components/Notdienst";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Calculator from "./components/Calculator";
import About from "./components/About";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { Phone, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen w-full overflow-hidden bg-stone-50">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
        >
          <path
            d="M 200,80 L 520,180 L 380,200 L 720,360 L 880,200 L 740,180 L 1000,80"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.18"
            className="hero-bolt"
            pathLength="1"
          />
          <path
            d="M 0,300 Q 300,260 600,310 T 1200,290"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="60"
            strokeLinecap="round"
            opacity="0.05"
            className="hero-bolt"
            pathLength="1"
          />
        </svg>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-start justify-center px-6 py-24 sm:px-10 lg:px-16">
          <div className="hero-headline mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-1.5 text-xs font-medium text-stone-700 backdrop-blur-sm font-mono-meta">
            <span className="live-dot inline-block h-2 w-2 rounded-full bg-green-500" />
            Notdienst aktuell verfügbar · 24/7
          </div>

          <h1 className="hero-headline max-w-4xl text-4xl font-semibold leading-[1.05] text-indigo-950 sm:text-5xl lg:text-6xl xl:text-7xl">
            Elektriker in Berlin —{" "}
            <span className="italic font-normal text-stone-700">Notdienst rund um die Uhr.</span>
          </h1>

          <p className="hero-subheadline mt-6 max-w-2xl text-lg text-stone-600 sm:text-xl lg:text-2xl">
            Innungsbetrieb · 12 Jahre · Wallbox · Smarthome · Wedding & ganz Berlin
          </p>

          <div className="hero-ctas mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="tel:+4930567890000"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-orange-600 px-8 text-base font-semibold text-white shadow-lg shadow-orange-600/25 transition-colors hover:bg-orange-700 sm:text-lg"
            >
              <Phone className="h-5 w-5" strokeWidth={2.25} />
              Notdienst: 030 5678 9000
            </a>
            <a
              href="https://wa.me/4917012345678?text=Hallo%2C%20ich%20brauche%20einen%20Elektriker."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-green-600 px-8 text-base font-semibold text-white shadow-lg transition-colors hover:bg-green-700 sm:text-lg"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={2.25} />
              WhatsApp Anfrage
            </a>
            <a
              href="#kostenrechner"
              className="text-base font-medium text-stone-700 underline underline-offset-4 transition-colors hover:text-indigo-950 sm:text-lg"
            >
              Kostenrechner ↓
            </a>
          </div>
        </div>
      </section>

      <Notdienst />
      <TrustBar />
      <Services />
      <Gallery />
      <Calculator />
      <About />
      <Reviews />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
