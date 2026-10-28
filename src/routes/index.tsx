import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { DentriqTooth3D } from "@/components/app/DentriqTooth3D";
import {
  ArrowRight,
  ChevronDown,
  ClipboardCheck,
  HeartHandshake,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dentriq — Cruz Nery Dental Clinic" },
      {
        name: "description",
        content:
          "Personalized dental care designed around your comfort, needs, and long-term oral health at Cruz Nery Dental Clinic.",
      },
      { property: "og:title", content: "Dentriq — Cruz Nery Dental Clinic" },
      {
        property: "og:description",
        content: "Healthier smiles, brighter lives through thoughtful dental care.",
      },
    ],
  }),
  component: Landing,
});

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Dental consultation",
    body: "Talk through your concerns and understand the next steps in your care.",
  },
  {
    icon: ShieldCheck,
    title: "Preventive care",
    body: "Support your oral health with clear guidance and organized follow-up.",
  },
  {
    icon: Sparkles,
    title: "Tooth restoration",
    body: "Explore appropriate restorative options based on your clinical assessment.",
  },
  {
    icon: HeartHandshake,
    title: "Tooth extraction",
    body: "Receive thoughtful information and care coordination when extraction is considered.",
  },
];

const FAQS = [
  [
    "What should I expect during an initial consultation?",
    "You can discuss your concerns with the clinic and receive an appropriate dental assessment. Your dentist can then explain relevant findings and possible next steps.",
  ],
  [
    "How are treatment plans determined?",
    "Treatment recommendations reflect your dental needs and clinical assessment. Your dentist will discuss suitable options with you before care is coordinated.",
  ],
  [
    "How can I ask the clinic about its services?",
    "Contact Cruz Nery Dental Clinic by phone or email using the details in the Contact section. The clinic team can guide you on the next steps.",
  ],
  [
    "How are follow-up visits scheduled?",
    "Follow-up visits and treatment schedules are coordinated by the dentist or authorized clinic personnel according to your clinical needs.",
  ],
  [
    "Where can existing patients access the Patient Portal?",
    "Use the Patient Portal link in the navigation or footer to view care information shared by the clinic.",
  ],
  [
    "Can I book an appointment directly through this website?",
    "Online self-booking is not available through this website. Please contact the clinic for inquiries. Appointment arrangements are coordinated by the dentist or authorized clinic personnel.",
  ],
] as const;

function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const closeMenu = () => setMenuOpen(false);
  const sectionLink = (id: string) => `#${id}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#071b18] text-[#effcf7]">
      <section
        id="home"
        className="relative isolate min-h-[760px] overflow-hidden bg-[#031f1a] sm:min-h-[820px]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_58%,rgba(54,217,179,.2),transparent_24%),radial-gradient(circle_at_16%_42%,rgba(19,91,77,.28),transparent_30%),linear-gradient(115deg,#03231d_0%,#062b24_52%,#031c18_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(153,255,225,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(153,255,225,.035)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 pb-16 pt-5 sm:px-8 lg:px-12">
          <header className="flex items-center justify-between rounded-[22px] border border-white/15 bg-white/[.07] px-4 py-3 shadow-[0_12px_60px_rgba(0,0,0,.16)] backdrop-blur-xl sm:px-6">
            <Link to="/" aria-label="Dentriq home" className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#8cf4d8]/70 text-[#8cf4d8]"
                aria-hidden="true"
              >
                <Sparkles className="h-4 w-4" strokeWidth={1.3} />
              </span>
              <span className="leading-none">
                <span className="block text-lg font-semibold tracking-tight text-white">
                  Dentriq
                </span>
                <span className="mt-1 block text-[8px] uppercase tracking-[.24em] text-white/55">
                  Cruz Nery Dental Clinic
                </span>
              </span>
            </Link>
            <nav
              className="hidden items-center gap-7 text-xs text-white/70 lg:flex"
              aria-label="Primary navigation"
            >
              {[
                ["Home", "home"],
                ["About", "about"],
                ["Services", "services"],
                ["Our approach", "approach"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <a key={id} href={sectionLink(id)} className="transition hover:text-[#a5f7df]">
                  {label}
                </a>
              ))}
              <Link
                to="/login"
                search={{ mode: "patient" }}
                className="text-[#a5f7df] transition hover:text-white"
              >
                Patient Portal
              </Link>
              <Link
                to="/login"
                search={{ mode: "staff" }}
                className="text-white/45 transition hover:text-white"
              >
                Staff Login
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden rounded-full bg-[#caffef] px-4 py-2.5 text-xs font-semibold text-[#06332b] shadow-[0_0_28px_rgba(125,255,222,.2)] transition hover:bg-white sm:inline-flex"
              >
                Contact us <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="rounded-full border border-white/20 p-2 text-white lg:hidden"
              >
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </header>
          {menuOpen && (
            <nav
              className="mt-2 grid gap-1 rounded-2xl border border-white/15 bg-[#0a3029]/95 p-3 text-sm shadow-xl backdrop-blur-xl lg:hidden"
              aria-label="Mobile navigation"
            >
              {["home", "about", "services", "approach", "contact"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2 capitalize text-white/80 hover:bg-white/10"
                >
                  {id === "home"
                    ? "Home"
                    : id === "services"
                      ? "Services"
                      : id === "approach"
                        ? "Our approach"
                        : id}
                </a>
              ))}
              <Link
                to="/login"
                search={{ mode: "patient" }}
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 text-[#a5f7df] hover:bg-white/10"
              >
                Patient Portal
              </Link>
              <Link
                to="/login"
                search={{ mode: "staff" }}
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 text-white/60 hover:bg-white/10"
              >
                Staff Login
              </Link>
            </nav>
          )}
          <div className="grid items-center gap-8 pb-4 pt-24 lg:min-h-[650px] lg:grid-cols-[.92fr_1.08fr] lg:gap-4 lg:pt-24">
            <div>
              <p className="mb-6 text-xs font-medium uppercase tracking-[.28em] text-[#91f5d8]">
                Thoughtful dental care
              </p>
              <h1 className="max-w-[650px] text-7xl font-semibold leading-[.83] tracking-[-.085em] text-white sm:text-8xl lg:text-[7.7rem]">
                Healthier
                <br />
                smiles
                <br />
                <span className="text-[#77efd0]">brighter</span>
                <br />
                <span className="text-[#77efd0]">lives.</span>
              </h1>
              <p className="mt-8 max-w-[440px] text-base leading-7 text-white/70 sm:text-lg">
                Personalized dental care designed around your needs, comfort, and long-term oral
                health.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full bg-[#a4f7dd] px-5 py-3 text-sm font-semibold text-[#06332b] shadow-[0_0_35px_rgba(118,255,220,.22)] transition hover:bg-white"
                >
                  Inquire with our team <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:border-[#8cf4d8] hover:text-[#a5f7df]"
                >
                  Explore services
                </a>
              </div>
              <p className="mt-5 text-xs text-white/45">
                Already a patient?{" "}
                <Link
                  to="/login"
                  search={{ mode: "patient" }}
                  className="text-[#a5f7df] underline-offset-4 hover:underline"
                >
                  Visit the Patient Portal
                </Link>
              </p>
            </div>
            <div className="relative mx-auto flex min-h-[330px] w-full max-w-[580px] items-center justify-center lg:min-h-[520px]">
              <div className="absolute h-64 w-64 rounded-full bg-[#65f6d2]/25 blur-3xl sm:h-80 sm:w-80" />
              <div className="absolute h-56 w-56 rounded-full border border-[#8cf4d8]/20 sm:h-72 sm:w-72" />
              <div className="relative flex min-h-[330px] w-full max-w-[580px] items-center justify-center sm:min-h-[390px] lg:min-h-[520px]">
                <DentriqTooth3D />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="bg-[#edf8f3] px-5 py-20 text-[#0b302a] sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#2d9381]">
              About Dentriq
            </p>
            <h2 className="mt-4 max-w-[440px] text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">
              Dental care built around you.
            </h2>
            <p className="mt-6 max-w-[400px] text-base leading-7 text-[#456a62]">
              At Dentriq, we believe dental care should feel clear, comfortable, and personal. Our
              goal is to help patients understand their oral health and make informed decisions
              about their care.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [
                UsersRound,
                "Patient-centered care",
                "We listen to your concerns and communicate clearly.",
              ],
              [
                ClipboardCheck,
                "Thoughtful planning",
                "Recommendations reflect your needs and clinical assessment.",
              ],
              [
                HeartHandshake,
                "A comfortable experience",
                "Respectful communication and a welcoming environment.",
              ],
            ].map(([Icon, title, body]) => (
              <article
                key={String(title)}
                className="rounded-3xl border border-[#b9ded3] bg-white/60 p-5 shadow-[0_18px_55px_rgba(31,95,80,.07)]"
              >
                <Icon className="h-5 w-5 text-[#36a992]" strokeWidth={1.5} />
                <h3 className="mt-12 text-lg font-semibold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-[#58766e]">{String(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="bg-[#08251f] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#8cf4d8]">
                Our services
              </p>
              <h2 className="mt-4 max-w-[580px] text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">
                Care for every stage of your smile.
              </h2>
            </div>
            <p className="max-w-[300px] text-sm leading-6 text-white/55">
              Explore the care areas available through Cruz Nery Dental Clinic. Contact the clinic
              to learn more.
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <article
                key={service.title}
                className="group rounded-3xl border border-white/10 bg-white/[.06] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#7cefd1]/45"
              >
                <service.icon className="h-6 w-6 text-[#8cf4d8]" strokeWidth={1.3} />
                <h3 className="mt-12 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{service.body}</p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center text-xs font-semibold text-[#a5f7df]"
                >
                  Learn more{" "}
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="approach"
        className="bg-[#0d3a31] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1180px]">
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#8cf4d8]">
            Our approach
          </p>
          <h2 className="mt-4 max-w-[650px] text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">
            A clearer path to better oral health.
          </h2>
          <div className="mt-14 grid gap-3 lg:grid-cols-3">
            {[
              [
                "01",
                "Consultation and assessment",
                "Discuss your concerns with the clinic and receive an appropriate dental assessment.",
              ],
              [
                "02",
                "Personalized treatment plan",
                "Your dentist explains relevant findings and discusses suitable options based on your needs.",
              ],
              [
                "03",
                "Dentist-coordinated scheduling",
                "The dentist or authorized clinic personnel coordinate follow-up visits according to your clinical needs.",
              ],
            ].map(([number, title, body], index) => (
              <article
                key={number}
                className="relative rounded-3xl border border-white/12 bg-[#0a2b25]/70 p-6"
              >
                <span className="text-5xl font-light text-[#75e9cc]/50">{number}</span>
                <h3 className="mt-12 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/60">{body}</p>
                {index < 2 && (
                  <ArrowRight className="absolute right-6 top-8 hidden text-[#75e9cc]/60 lg:block" />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071b18] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              [
                MessageCircle,
                "Clear communication",
                "Understand your care in language that feels approachable.",
              ],
              [
                HeartHandshake,
                "Personalized attention",
                "Your concerns and context remain part of the conversation.",
              ],
              [
                ShieldCheck,
                "Informed decisions",
                "Discuss suitable options with your dentist before care proceeds.",
              ],
            ].map(([Icon, title, body]) => (
              <div
                key={String(title)}
                className="rounded-3xl border border-white/10 bg-white/[.05] p-6"
              >
                <Icon className="h-5 w-5 text-[#8cf4d8]" />
                <h3 className="mt-10 font-semibold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">{String(body)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="bg-[#edf8f3] px-5 py-20 text-[#0b302a] sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#2d9381]">
              Questions, answered
            </p>
            <h2 className="mt-4 text-5xl font-semibold leading-[.95] tracking-[-.06em]">
              Clear care starts with clarity.
            </h2>
          </div>
          <div className="divide-y divide-[#b9ded3] border-y border-[#b9ded3]">
            {FAQS.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return (
                <div key={question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#2d9381] transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="max-w-[680px] pb-5 pr-10 text-sm leading-6 text-[#58766e]">
                      {answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="bg-[radial-gradient(circle_at_80%_10%,rgba(108,245,210,.22),transparent_32%),#0b332b] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#8cf4d8]">
              Contact the clinic
            </p>
            <h2 className="mt-4 max-w-[600px] text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">
              Let&apos;s talk about your dental care.
            </h2>
            <p className="mt-6 max-w-[500px] text-base leading-7 text-white/65">
              Have a question about our services or your dental care? Get in touch with the clinic,
              and our team can guide you on the next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="tel:+63285550142"
                className="rounded-full bg-[#a4f7dd] px-5 py-3 text-sm font-semibold text-[#06332b]"
              >
                Call the clinic
              </a>
              <a
                href="mailto:frontdesk@cruznery.clinic"
                className="rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white hover:border-[#8cf4d8]"
              >
                Email the clinic
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/12 bg-white/[.07] p-6 backdrop-blur-xl">
            <p className="text-sm font-semibold text-[#a5f7df]">Cruz Nery Dental Clinic</p>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-white/40">Telephone</dt>
                <dd className="mt-1">(02) 8555 0142</dd>
              </div>
              <div>
                <dt className="text-white/40">Email</dt>
                <dd className="mt-1 break-all">frontdesk@cruznery.clinic</dd>
              </div>
              <div>
                <dt className="text-white/40">Business hours</dt>
                <dd className="mt-1">Monday–Saturday, 8:00 AM–5:00 PM</dd>
              </div>
            </dl>
            <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-white/45">
              Contacting the clinic does not automatically create or confirm an appointment.
              Arrangements remain coordinated by the dentist or authorized clinic personnel.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#bff8e5] px-5 py-16 text-[#07352d] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-[#248b77]">
              Your smile deserves thoughtful care
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
              Start with a conversation.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-[#07352d] px-5 py-3 text-sm font-semibold text-white"
            >
              Contact us <ArrowRight className="ml-2 inline h-4 w-4" />
            </a>
            <a
              href="#services"
              className="rounded-full border border-[#4a9a88] px-5 py-3 text-sm font-semibold"
            >
              Explore services
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#041410] px-5 py-12 text-white sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1180px] gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#8cf4d8]/60 text-[#8cf4d8]">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-lg font-semibold">Dentriq</span>
            </div>
            <p className="mt-4 max-w-[250px] text-sm leading-6 text-white/45">
              Personalized dental care through Cruz Nery Dental Clinic.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8cf4d8]">
              Explore
            </p>
            <div className="mt-4 grid gap-2 text-sm text-white/55">
              <a href="#about" className="hover:text-white">
                About
              </a>
              <a href="#services" className="hover:text-white">
                Services
              </a>
              <a href="#approach" className="hover:text-white">
                Our approach
              </a>

              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8cf4d8]">
              Patient resources
            </p>
            <div className="mt-4 grid gap-2 text-sm text-white/55">
              <Link to="/login" search={{ mode: "patient" }} className="hover:text-white">
                Patient Portal
              </Link>
              <a href="#contact" className="hover:text-white">
                Contact the clinic
              </a>
              <Link
                to="/login"
                search={{ mode: "staff" }}
                className="text-white/35 hover:text-white"
              >
                Staff Login
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#8cf4d8]">
              Contact
            </p>
            <div className="mt-4 grid gap-2 text-sm text-white/55">
              <a href="tel:+63285550142" className="hover:text-white">
                (02) 8555 0142
              </a>
              <a href="mailto:frontdesk@cruznery.clinic" className="break-all hover:text-white">
                frontdesk@cruznery.clinic
              </a>
              <span>Mon–Sat, 8:00 AM–5:00 PM</span>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1180px] justify-between gap-4 pt-6 text-xs text-white/35">
          <span>© {new Date().getFullYear()} Dentriq Dental Clinic</span>
          <span>Care coordinated by your clinic team.</span>
        </div>
      </footer>
    </main>
  );
}
