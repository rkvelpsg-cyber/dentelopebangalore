"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Link from "next/link";
import {
  Phone,
  Calendar,
  ChevronDown,
  CheckCircle,
  ArrowLeft,
  Star,
} from "lucide-react";
import { getTreatmentBySlug, TREATMENT_DATA } from "../treatments-data";

const OR = "#e8531a";
const CREAM = "#efe5cc";
const DARK = "#1a1a1a";

const C = { phone: "+91 98765 43210", wa: "919876543210" };

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
          placeholder="+91 98765 43210"
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

  return (
    <div
      className="min-h-screen"
      style={{ background: "#fdf8f2", fontFamily: "Inter, sans-serif" }}
    >
      {/* navbar */}
      <header
        className="sticky top-0 z-50 bg-white shadow-sm"
        style={{ borderBottom: "1px solid #f0e0d0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dentelope.svg"
              alt="Dentelope logo"
              className="h-12 w-auto"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dentelope_tagline.png"
              alt="Dentelope — Advanced Dental Care"
              className="h-10 w-auto hidden sm:block"
            />
          </Link>
          <Link
            href="/#treatments"
            className="ml-2 flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All Treatments
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="#book"
              className="flex items-center gap-2 text-sm font-bold text-white px-4 py-2 rounded-lg transition hover:opacity-90"
              style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
            >
              <Calendar className="w-4 h-4" /> Book Now
            </a>
            <a
              href={`tel:${C.phone}`}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border transition hover:bg-orange-50"
              style={{ color: OR, borderColor: `${OR}55` }}
            >
              <Phone className="w-4 h-4" /> Call
            </a>
          </div>
        </div>
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
                { icon: "💰", label: "Starting From", val: treatment.price },
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
              <a
                href="#book"
                className="flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-xl transition hover:opacity-90"
                style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
              >
                <Calendar className="w-4 h-4" /> Book Free Consultation
              </a>
              <a
                href={`tel:${C.phone}`}
                className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border transition hover:bg-orange-50"
                style={{ color: OR, borderColor: `${OR}55` }}
              >
                <Phone className="w-4 h-4" /> {C.phone}
              </a>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              {
                icon: "🎓",
                title: "MDS Specialists",
                desc: "Post-graduate dentists only",
              },
              {
                icon: "🏅",
                title: "ISO 9001 Certified",
                desc: "NABH-compliant sterilisation",
              },
              {
                icon: "💳",
                title: "0% EMI Available",
                desc: "Up to 24 months, no interest",
              },
              {
                icon: "📋",
                title: "Transparent Pricing",
                desc: "Full quote before any procedure",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 border border-orange-50 shadow-sm flex flex-col gap-2"
              >
                <span className="text-3xl">{icon}</span>
                <h3
                  className="font-bold text-gray-900 text-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
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
              <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-orange-100">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">
                  Starting From
                </p>
                <p
                  className="text-3xl font-extrabold"
                  style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
                >
                  {treatment.price}
                </p>
              </div>
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
                      <span className="text-sm font-bold" style={{ color: OR }}>
                        {t.price}
                      </span>
                      <ArrowLeft className="w-4 h-4 text-gray-300 group-hover:text-orange-400 rotate-180 transition-all group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>

        {/* sidebar */}
        <div id="book">
          <BookingFormMini treatmentLabel={treatment.label} />
          <div className="mt-6 rounded-2xl border border-orange-50 p-5 bg-white shadow-sm space-y-3">
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
              "10,000+ happy patients in Whitefield",
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
      <footer className="py-8 mt-8" style={{ background: DARK, color: "#ccc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dentelope.svg"
              alt="Dentelope logo"
              className="h-9 w-auto"
            />
            <div className="flex flex-col leading-none gap-[2px]">
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.95rem",
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
                  fontSize: "0.58rem",
                  fontStyle: "italic",
                  color: "#a0a0a0",
                }}
              >
                Advanced Dental Care
              </span>
            </div>
          </Link>
          <p className="text-xs text-center" style={{ color: "#888" }}>
            3 Tsn Babu, Nallurhalli, Whitefield, Bengaluru – 560 066 · {C.phone}
          </p>
          <Link href="/" className="text-xs hover:text-orange-400 transition">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
