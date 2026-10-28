import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Menu,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  WandSparkles,
} from "lucide-react";
import clinic from "@/assets/clinic.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dentriq — Calm, considered dental care" },
      {
        name: "description",
        content:
          "A calmer dental experience with thoughtful care, advanced technology, and a team that puts your comfort first.",
      },
      { property: "og:title", content: "Dentriq — Calm, considered dental care" },
      {
        property: "og:description",
        content: "Thoughtful dental care, beautifully considered.",
      },
    ],
  }),
  component: Landing,
});

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Preventive care",
    body: "Complete care for a healthy, confident smile.",
  },
  {
    icon: Syringe,
    title: "Specialized treatments",
    body: "Expert solutions, tailored to your needs.",
  },
  {
    icon: WandSparkles,
    title: "Aesthetic dentistry",
    body: "Subtle enhancements that feel entirely you.",
  },
  { icon: Sparkles, title: "Advanced diagnostics", body: "A clearer picture of your oral health." },
];

const GALLERY = [
  { src: "/images/clinic-reception.png", alt: "Warm reception area at the clinic" },
  { src: "/images/clinic-interior.png", alt: "Quiet dental treatment room" },
  { src: "/images/smile-detail.png", alt: "Patient smiling after care" },
  {
    src: "/images/clinic-interior.png",
    alt: "Light-filled consultation room",
    position: "object-[65%_center]",
  },
];

function Landing() {
  return (
    <main className="min-h-screen bg-[#f5f1eb] text-[#1b1c19]">
      <section className="relative min-h-[720px] overflow-hidden bg-[#111312] text-[#f7f3ed] sm:min-h-[780px]">
        <img
          src={clinic}
          alt="Warmly lit treatment room at Dentriq Dental Clinic"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,12,11,.94)_0%,rgba(10,12,11,.72)_35%,rgba(10,12,11,.1)_78%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,12,11,.5),transparent_35%)]" />
        <header className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-12">
          <Link to="/" aria-label="Dentriq home" className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9ad83]/70 text-[#c9ad83]"
              aria-hidden="true"
            >
              <Sparkles className="h-4 w-4" strokeWidth={1.2} />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-lg tracking-wide text-[#f7f3ed]">Dentriq</span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.26em] text-white/55">
                Dental clinic
              </span>
            </span>
          </Link>
          <nav
            className="hidden items-center gap-8 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 lg:flex"
            aria-label="Primary navigation"
          >
            <a href="#home" className="transition hover:text-white">
              Home
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#services" className="transition hover:text-white">
              Services
            </a>
            <a href="#gallery" className="transition hover:text-white">
              Gallery
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-5">
            <Link
              to="/login"
              search={{ mode: "patient" }}
              className="hidden border border-white/45 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] transition hover:bg-white hover:text-[#171815] sm:inline-flex"
            >
              Book appointment
            </Link>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="text-white/80 transition hover:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>
        <div
          id="home"
          className="relative z-10 mx-auto flex max-w-[1400px] items-center px-6 pb-28 pt-24 lg:min-h-[610px] lg:px-16 lg:pt-12"
        >
          <div className="max-w-[560px]">
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.32em] text-[#c9ad83]">
              Thoughtful dental care
            </p>
            <h1 className="max-w-[620px] font-serif text-6xl leading-[0.92] tracking-[-0.04em] text-[#f8f4ee] sm:text-7xl lg:text-[7.2rem]">
              Smiles
              <br />
              that last
              <br />a lifetime.
            </h1>
            <p className="mt-8 max-w-[380px] text-sm leading-6 text-white/75 sm:text-base">
              Advanced dental care with a gentle touch, for a healthier, brighter smile.
            </p>
            <Link
              to="/login"
              search={{ mode: "patient" }}
              className="mt-8 inline-flex items-center gap-7 bg-[#c8a77a] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1b1c19] transition hover:bg-[#dfc49e]"
            >
              Book appointment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-7 left-6 z-10 flex items-center gap-3 text-[9px] uppercase tracking-[0.22em] text-white/75 lg:left-16">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40">
            <ArrowDown className="h-3.5 w-3.5" />
          </span>
          Scroll to explore
        </div>
      </section>

      <section id="services" className="bg-[#f5f1eb] px-6 py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9a7a52]">
              Our expertise
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
              Holistic care tailored to you
            </h2>
          </div>
          <div className="mt-14 grid grid-cols-2 border-y border-[#d8d0c4] lg:grid-cols-4">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="border-[#d8d0c4] px-5 py-9 text-center first:border-r last:border-l even:border-l lg:border-l lg:px-8 lg:py-10 lg:first:border-l-0"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#b9b0a4] text-[#866746]">
                  <service.icon className="h-5 w-5" strokeWidth={1.25} />
                </span>
                <h3 className="mt-5 font-serif text-lg">{service.title}</h3>
                <p className="mx-auto mt-2 max-w-[180px] text-xs leading-5 text-[#777168]">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#111612] px-6 py-20 text-[#f7f3ed] lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1340px]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#c9ad83]">
              Results & spaces
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
              Real care. Real transformation.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {GALLERY.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className="aspect-[0.86] overflow-hidden rounded-lg bg-[#2a2d27]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`h-full w-full object-cover transition duration-700 hover:scale-105 ${item.position ?? ""}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative min-h-[470px] overflow-hidden bg-[#122018] px-6 py-20 text-[#f7f3ed] lg:px-20 lg:py-24"
      >
        <img
          src="/images/clinic-interior.png"
          alt="Soft greenery surrounding a calm clinic space"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,32,24,.98)_0%,rgba(18,32,24,.76)_45%,rgba(18,32,24,.15)_100%)]" />
        <div className="relative mx-auto max-w-[1200px]">
          <Star className="h-6 w-6 text-[#c9ad83]" strokeWidth={1.2} />
          <h2 className="mt-5 max-w-[390px] font-serif text-5xl leading-[0.95] tracking-[-0.03em] sm:text-6xl">
            Your smile,
            <br />
            our passion.
          </h2>
          <p className="mt-6 max-w-[340px] text-sm leading-6 text-white/70">
            Experience personalized dental care in a calm and comfortable environment.
          </p>
          <Link
            to="/login"
            search={{ mode: "patient" }}
            className="mt-8 inline-flex items-center gap-7 border border-[#c9ad83] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f7f3ed] transition hover:bg-[#c9ad83] hover:text-[#1b1c19]"
          >
            Book appointment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer id="contact" className="bg-[#111312] px-6 py-10 text-[#f7f3ed] lg:px-16">
        <div className="mx-auto flex max-w-[1340px] flex-col gap-6 border-t border-white/15 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-xl">Dentriq</p>
            <p className="mt-1 text-white/50">Thoughtful dental care, beautifully considered.</p>
          </div>
          <div className="flex items-center gap-5 text-[10px] uppercase tracking-[0.16em] text-white/60">
            <Link to="/login" search={{ mode: "patient" }} className="hover:text-white">
              Patient portal
            </Link>
            <Link to="/login" search={{ mode: "staff" }} className="hover:text-white">
              Staff login
            </Link>
          </div>
          <p className="text-white/40">© 2026 Dentriq Dental Clinic</p>
        </div>
      </footer>
    </main>
  );
}
