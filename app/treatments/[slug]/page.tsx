"use client";

import { notFound } from "next/navigation";
import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Phone,
  Calendar,
  ChevronDown,
  CheckCircle,
  ArrowLeft,
  Star,
  MessageCircle,
  Search,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import {
  getTreatmentBySlug,
  TREATMENT_DATA,
  LABEL_TO_SLUG,
} from "../treatments-data";
import BookingModal from "@/components/BookingModal";

const OR = "#e8531a";
const CREAM = "#efe5cc";
const DARK = "#1a1a1a";

const C = {
  phone: "+91 80737 62560",
  wa: "918073762560",
  email: "care@dentelope.in",
};

const NAV_LINKS = [
  { label: "About", sub: [] },
  {
    label: "Treatments",
    sub: [
      "Teeth Cleaning",
      "Teeth Whitening",
      "Dental Implants",
      "Braces / Aligners",
      "Root Canal (RCT)",
      "Smile Makeover",
      "Kids Dentistry",
      "Gum Treatment",
      "Tooth Extraction",
      "Veneers & Crowns",
      "Dental Bridges",
      "Dentures",
      "Tooth Fillings",
      "Wisdom Tooth Surgery",
      "Laser Gum Surgery",
      "Implant Dentures",
    ],
  },
  { label: "Patient Speaks", sub: [] },
  { label: "Dental Blog", sub: [] },
  { label: "Our Doctors", sub: [] },
];

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconTwitterX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4" style={{ fill: OR, color: OR }} />
      ))}
    </div>
  );
}

function OrangePill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
      style={{ background: "#fff0e8", color: OR, border: `1px solid ${OR}30` }}
    >
      {children}
    </span>
  );
}

function FAQList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
        >
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-sm text-gray-900 pr-4">
              {f.q}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BookingFormMini({ treatmentLabel }: { treatmentLabel: string }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div
        className="rounded-2xl border border-orange-100 p-8 shadow-md sticky top-24 flex flex-col items-center text-center gap-4"
        style={{ background: "#fff" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: "#fff0e8" }}
        >
          <CheckCircle className="w-7 h-7" style={{ color: OR }} />
        </div>
        <h3
          className="font-bold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Appointment Requested!
        </h3>
        <p className="text-sm text-gray-500">
          Our team will call you within 30 minutes to confirm your slot.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-orange-100 p-6 shadow-md sticky top-24"
      style={{ background: "#fff" }}
    >
      <h3
        className="text-lg font-extrabold text-gray-900 mb-4"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Book a FREE Consultation
      </h3>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <input
          type="text"
          required
          placeholder="Your Name"
          className="w-full rounded-xl border border-gray-200 bg-[#faf5ee] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="tel"
          required
          placeholder="+91 80737 62560"
          className="w-full rounded-xl border border-gray-200 bg-[#faf5ee] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="text"
          readOnly
          value={treatmentLabel}
          className="w-full rounded-xl border border-gray-200 bg-[#f5ead8] px-4 py-3 text-sm text-orange-700 font-medium"
        />
        <input
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          className="w-full rounded-xl border border-gray-200 bg-[#faf5ee] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition"
          style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
        >
          <Calendar className="w-4 h-4" /> Book Appointment
        </button>
        <p className="text-center text-xs text-gray-400">
          Free · No obligation · Response in 30 min
        </p>
      </form>
      <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
        <a
          href={`https://wa.me/${C.wa}?text=Hi%2C+I%27d+like+to+book+for+${encodeURIComponent(treatmentLabel)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-semibold text-sm transition hover:bg-green-50"
          style={{ color: "#25d366", borderColor: "#25d36650" }}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.882l6.198-1.624A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 0 1-4.99-1.366l-.358-.213-3.68.965.982-3.586-.232-.368A9.794 9.794 0 0 1 2.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z" />
          </svg>
          WhatsApp Us
        </a>
        <a
          href={`tel:${C.phone}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border font-semibold text-sm transition hover:bg-orange-50"
          style={{ color: OR, borderColor: `${OR}40` }}
        >
          <Phone className="w-4 h-4" /> {C.phone}
        </a>
      </div>
    </div>
  );
}

export default function TreatmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const treatment = getTreatmentBySlug(slug);
  if (!treatment) notFound();

  const [scrolled, setScrolled] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 10), []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#fdf8f2", fontFamily: "Inter, sans-serif" }}
    >
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultTreatment={treatment.label}
      />
      {/* navbar */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
        style={{ borderBottom: "1px solid #f0e0d0" }}
      >
        <div className="w-full px-4 sm:px-6 flex items-center h-[88px] gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dentelope.svg"
              alt="Dentelope logo"
              className="h-16 w-auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dentelope_tagline.png"
              alt="Dentelope — Advanced Dental Care"
              className="h-20 w-auto"
            />
          </Link>
          <nav className="hidden xl:flex items-center flex-1 text-sm font-medium text-gray-600 justify-center">
            <Link
              href="/#treatments"
              className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-orange-500 hover:bg-orange-50 transition-colors text-orange-500 whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Treatments
            </Link>
            {NAV_LINKS.map((n) => (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => setOpenNav(n.label)}
                onMouseLeave={() => setOpenNav(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-orange-500 hover:bg-orange-50 transition-colors whitespace-nowrap">
                  {n.label}{" "}
                  {n.sub.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
                {n.sub.length > 0 && openNav === n.label && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 min-w-[200px] z-50">
                    {n.sub.map((s) => (
                      <Link
                        key={s}
                        href={
                          LABEL_TO_SLUG[s]
                            ? `/treatments/${LABEL_TO_SLUG[s]}`
                            : "#"
                        }
                        className="block px-5 py-2.5 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <button className="hidden xl:flex w-8 h-8 items-center justify-center rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors ml-auto">
            <Search className="w-4 h-4" />
          </button>
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <a
              href="#book"
              className="flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-lg transition hover:opacity-90"
              style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </a>
            <a
              href={`tel:${C.phone}`}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg border transition hover:bg-orange-50"
              style={{
                color: OR,
                borderColor: `${OR}55`,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
          <button
            className="xl:hidden ml-auto p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
            <Link
              href="/#treatments"
              className="flex items-center gap-1.5 py-2.5 text-sm font-medium text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              <ArrowLeft className="w-4 h-4" /> All Treatments
            </Link>
            {NAV_LINKS.map((n) => (
              <div key={n.label}>
                <button
                  onClick={() =>
                    setOpenNav(openNav === n.label ? null : n.label)
                  }
                  className="w-full flex items-center justify-between py-2.5 text-sm font-medium text-gray-700 hover:text-orange-500"
                >
                  {n.label}
                  {n.sub.length > 0 && (
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${openNav === n.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {openNav === n.label &&
                  n.sub.map((s) => (
                    <Link
                      key={s}
                      href={
                        LABEL_TO_SLUG[s]
                          ? `/treatments/${LABEL_TO_SLUG[s]}`
                          : "#"
                      }
                      className="block pl-4 py-2 text-sm text-gray-500 hover:text-orange-500"
                      onClick={() => setMenuOpen(false)}
                    >
                      {s}
                    </Link>
                  ))}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <a
                href="#book"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-sm font-bold text-white py-3 rounded-xl w-full"
                style={{ background: OR }}
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </a>
              <a
                href={`tel:${C.phone}`}
                className="flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl border w-full"
                style={{ color: OR, borderColor: `${OR}55` }}
              >
                <Phone className="w-4 h-4" /> {C.phone}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* hero */}
      <section
        className="py-14 sm:py-20"
        style={{
          background: `linear-gradient(135deg, #fff8f2 0%, ${CREAM} 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <OrangePill>{treatment.label}</OrangePill>
            <h1
              className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {treatment.tagline}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              {treatment.heroDesc}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { icon: "⏱️", label: "Duration", val: treatment.duration },
                { icon: "📅", label: "Sessions", val: treatment.sessions },
                { icon: "😌", label: "Pain Level", val: treatment.painLevel },
              ].map(({ icon, label, val }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-orange-50"
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      {label}
                    </p>
                    <p
                      className="text-sm font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {val}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={() => setBookingOpen(true)}
                className="flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-xl transition hover:opacity-90"
                style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </button>
              <a
                href={`tel:${C.phone}`}
                className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border transition hover:bg-orange-50"
                style={{ color: OR, borderColor: `${OR}55` }}
              >
                <Phone className="w-4 h-4" /> {C.phone}
              </a>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={treatment.heroImage}
                alt={treatment.label}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl" />
            </div>
            {/* floating badge */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg">
              <span className="text-2xl">🦷</span>
              <div>
                <p
                  className="font-bold text-gray-900 text-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {treatment.label}
                </p>
                <p className="text-xs text-gray-500">
                  MDS Specialists · ISO 9001 Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* main content + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-12">
          {/* overview */}
          <section>
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              What is <span style={{ color: OR }}>{treatment.label}</span>?
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {treatment.overview}
            </p>
          </section>

          {/* benefits */}
          <section>
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Why Choose Dentelope for{" "}
              <span style={{ color: OR }}>{treatment.label}</span>?
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {treatment.benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-orange-50 shadow-sm"
                >
                  <CheckCircle
                    className="w-5 h-5 mt-0.5 shrink-0"
                    style={{ color: OR }}
                  />
                  <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </section>

          {/* procedure steps */}
          <section>
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              The <span style={{ color: OR }}>Procedure</span> — Step by Step
            </h2>
            <div className="relative">
              <div
                className="absolute left-6 top-0 bottom-0 w-0.5"
                style={{ background: `${OR}30` }}
              />
              <div className="space-y-6">
                {treatment.steps.map((s) => (
                  <div key={s.step} className="flex gap-5 relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-extrabold text-white text-sm z-10"
                      style={{
                        background: OR,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {s.step}
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-orange-50 shadow-sm flex-1">
                      <h3
                        className="font-bold text-gray-900 mb-1 text-sm"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* pricing */}
          <section
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: `linear-gradient(135deg, #fff8f2 0%, ${CREAM} 100%)`,
              border: `1px solid ${OR}25`,
            }}
          >
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Pricing &amp; <span style={{ color: OR }}>EMI Options</span>
            </h2>
            <p className="text-gray-500 text-sm mb-5">
              All prices are indicative. A detailed quote is provided after your
              free consultation — no surprises.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="space-y-1.5">
                {[
                  "0% EMI available for 3–24 months",
                  "HDFC, Bajaj Finserv, ZestMoney accepted",
                  "All major insurance plans accepted",
                  "Transparent itemised invoice",
                ].map((p) => (
                  <div
                    key={p}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle
                      className="w-4 h-4 shrink-0"
                      style={{ color: OR }}
                    />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section id="faq">
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Frequently Asked <span style={{ color: OR }}>Questions</span>
            </h2>
            <FAQList faqs={treatment.faqs} />
          </section>

          {/* other treatments */}
          <section>
            <h2
              className="text-2xl font-extrabold text-gray-900 mb-5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Explore Other <span style={{ color: OR }}>Treatments</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {TREATMENT_DATA.filter((t) => t.slug !== treatment.slug)
                .slice(0, 6)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={`/treatments/${t.slug}`}
                    className="flex items-center justify-between bg-white rounded-xl px-4 py-3.5 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group"
                  >
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                      {t.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-orange-400 rotate-180 transition-all group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>

        {/* sidebar */}
        <div id="book" className="space-y-6">
          {/* Book Appointment CTA card */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-orange-100">
            <div className="px-6 py-5" style={{ background: OR }}>
              <p className="text-white/75 text-xs font-semibold uppercase tracking-widest">
                Dentelope Advanced Dental Care
              </p>
              <h3
                className="text-xl font-extrabold text-white mt-1"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Book Appointment
              </h3>
              <p className="text-white/70 text-xs mt-1">
                Quick response · No charges · MDS specialists
              </p>
            </div>
            <div className="bg-white px-6 py-5 space-y-3">
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full flex items-center justify-center gap-2 text-sm font-bold text-white py-3.5 rounded-xl hover:opacity-90 transition"
                style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
              >
                <Calendar className="w-4 h-4" /> Book Appointment for{" "}
                {treatment.label}
              </button>
              <a
                href={`https://wa.me/${C.wa}?text=${encodeURIComponent(`Hi, I'd like to book an appointment for ${treatment.label}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition hover:bg-green-50"
                style={{ color: "#25d366", borderColor: "#25d36640" }}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.847L.057 23.882l6.198-1.624A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 0 1-4.99-1.366l-.358-.213-3.68.965.982-3.586-.232-.368A9.794 9.794 0 0 1 2.182 12C2.182 6.565 6.565 2.182 12 2.182S21.818 6.565 21.818 12 17.435 21.818 12 21.818z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href={`tel:${C.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition hover:bg-orange-50"
                style={{ color: OR, borderColor: `${OR}40` }}
              >
                <Phone className="w-4 h-4" /> {C.phone}
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-orange-50 p-5 bg-white shadow-sm space-y-3">
            <h4
              className="font-bold text-gray-900 text-sm"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Why Patients Choose Dentelope
            </h4>
            {[
              "Pain-free procedures with advanced anaesthesia",
              "MDS specialists — no juniors or trainees",
              "ISO 9001 & NABH-compliant sterilisation",
              "3D digital X-rays & AI diagnostics",
              "2,000+ happy patients in Whitefield",
            ].map((p) => (
              <div
                key={p}
                className="flex items-start gap-2 text-xs text-gray-600"
              >
                <CheckCircle
                  className="w-3.5 h-3.5 mt-0.5 shrink-0"
                  style={{ color: OR }}
                />
                {p}
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
              <Stars />
              <span className="text-xs text-gray-500 font-medium">
                4.9 · 842 Google reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer style={{ background: "#2a0e00", color: "#c9a98a" }}>
        <div className="w-full px-6 sm:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-10 gap-y-10">
          {/* col 1 — brand + contact */}
          <div className="lg:col-span-2 space-y-5 flex flex-col items-start">
            <div className="flex items-center gap-3 pl-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/dentelope.svg"
                alt="Dentelope logo"
                className="h-24 w-20 shrink-0 object-contain"
              />
              <div className="flex flex-col leading-none gap-1 items-center">
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.35rem",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    color: "#C8960C",
                  }}
                >
                  DENTELOPE
                </span>
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.75rem",
                    fontStyle: "italic",
                    color: "#c9a98a",
                  }}
                >
                  Advanced Dental Care
                </span>
                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg, #C8960C, #ffd700, #C8960C)",
                    margin: "2px 0",
                  }}
                />
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#c9a98a",
                  }}
                >
                  Smile Without Limits!
                </span>
              </div>
            </div>
            <div className="space-y-2 pl-[108px]">
              <p
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: OR }}
              >
                Connect with Us
              </p>
              <a
                href={`tel:${C.phone}`}
                className="flex items-center gap-2 text-sm font-semibold text-white hover:opacity-80 transition-opacity"
              >
                <Phone className="w-4 h-4 shrink-0" style={{ color: OR }} />
                {C.phone}
              </a>
              <a
                href={`mailto:${C.email}`}
                className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity"
              >
                <MessageCircle
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: OR }}
                />
                {C.email}
              </a>
              <p
                className="flex items-start gap-2 text-xs"
                style={{ color: "#c9a98a" }}
              >
                <MapPin
                  className="w-3.5 h-3.5 shrink-0 mt-0.5"
                  style={{ color: OR }}
                />
                3 TSN Babu, Opposite to SBB Sapphire, Victorian View Layout,
                Nallurhalli, Whitefield, Bengaluru, Karnataka – 560066
              </p>
            </div>
            <div className="flex gap-2.5 pl-[108px]">
              {(
                [
                  IconInstagram,
                  IconFacebook,
                  IconTwitterX,
                  IconYoutube,
                  IconLinkedin,
                ] as Array<React.FC<{ className?: string }>>
              ).map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors hover:border-orange-400 hover:text-orange-400"
                  style={{
                    borderColor: "rgba(201,169,138,0.35)",
                    color: "#c9a98a",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* col 2 — Dentelope Advantage */}
          <div>
            <h5
              className="text-sm font-bold mb-5"
              style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
            >
              Dentelope Advantage
            </h5>
            <ul className="space-y-3 text-sm">
              {[
                "Clinics Near Me",
                "Patient Testimonials",
                "Online Payments",
                "Membership Plans",
                "0% EMI Options",
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
              <h5
                className="text-sm font-bold pt-4 pb-1"
                style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
              >
                Dental Specialists
              </h5>
              {[
                "Endodontist",
                "Pedodontist",
                "Implantologist",
                "Orthodontist",
                "Periodontist",
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* col 3 — Treatments */}
          <div>
            <h5
              className="text-sm font-bold mb-5"
              style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
            >
              Treatments
            </h5>
            <ul className="space-y-3 text-sm">
              {TREATMENT_DATA.slice(0, 10).map((t) => (
                <li key={t.label}>
                  <Link
                    href={`/treatments/${t.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 4 — Quick Links */}
          <div>
            <h5
              className="text-sm font-bold mb-5"
              style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
            >
              Quick Links
            </h5>
            <ul className="space-y-3 text-sm">
              {[
                "About Us",
                "Vision & Mission",
                "Our Promise",
                "Outreach Programs",
                "Awards & Recognition",
                "Gallery",
                "Contact Us",
                "Aligner Programme",
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* col 5 — Explore Dentelope */}
          <div>
            <h5
              className="text-sm font-bold mb-5"
              style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
            >
              Explore Dentelope
            </h5>
            <ul className="space-y-3 text-sm">
              {[
                "Book Appointment",
                "Dental Blog",
                "Career Openings",
                "News & Media",
                "Dental Education Videos",
                "Dental Problems, Symptoms & Treatments",
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* privacy / terms bar */}
        <div style={{ borderTop: "1px solid rgba(201,169,138,0.18)" }}>
          <div className="w-full px-6 sm:px-10 py-4 flex justify-end gap-6 text-xs">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* copyright strip */}
        <div style={{ background: "#1e0900" }}>
          <div
            className="w-full px-6 sm:px-10 py-3 text-center text-xs"
            style={{ color: "rgba(201,169,138,0.5)" }}
          >
            All Rights Reserved &ndash; {new Date().getFullYear()}, Dentelope
            Dental Clinic (a brand name of M/s. Dentelope Healthcare Private
            Limited).
          </div>
        </div>
      </footer>
    </div>
  );
}
