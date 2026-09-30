"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Menu,
  X,
  CheckCircle,
  ArrowRight,
  Calendar,
  Shield,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  Zap,
  Heart,
  Baby,
  Layers,
  Stethoscope,
  Download,
  Search,
  Users,
  ThumbsUp,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import {
  LABEL_TO_SLUG,
  TREATMENT_DATA,
} from "@/app/treatments/treatments-data";
import HeroCarousel from "@/components/herocarousel";
import BookingModal from "@/components/BookingModal";

// ── social brand icons (inline SVG) ───────────────────────────────────────────
function IconFacebook({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
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
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function IconTwitterX({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconYoutube({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ── colour palette ─────────────────────────────────────────────────────────────
const OR = "#e8531a";
const CREAM = "#efe5cc";
const CREAM2 = "#fdf8f2";
const DARK = "#1a1a1a";
const GRAY = "#6b6b6b";
const WHITE = "#ffffff";

// ── brand ─────────────────────────────────────────────────────────────────────
const C = {
  name: "Dentelope",
  phone: "+91-6364609627",
  wa: "916364609627",
  email: "care@dentelope.in",
  address:
    "3 Tsn Babu, Opposite to SBB Sapphire\nVictorian View Layout, Nallurhalli\nWhitefield, Bengaluru \u2013 560 066",
  city: "Whitefield, Bengaluru",
  rating: "5.0",
  patients: "2,000+",
  years: "12+",
};

// ── nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About", href: "#about", sub: [] },
  {
    label: "Treatments",
    href: "#treatments",
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
  { label: "Patient Speaks", href: "#patient-speaks", sub: [] },
  { label: "Dental Blog", href: "#blog", sub: [] },
  { label: "Our Doctors", href: "#doctors", sub: [] },
];

const TREATMENTS = [
  {
    icon: Stethoscope,
    label: "Teeth Cleaning",
    desc: "Scaling, polishing & oral hygiene assessment.",
    popular: false,
  },
  {
    icon: Sparkles,
    label: "Teeth Whitening",
    desc: "Laser whitening — brighter smile in one visit.",
    popular: true,
  },
  {
    icon: Layers,
    label: "Dental Implants",
    desc: "Titanium implants that look & feel natural.",
    popular: true,
  },
  {
    icon: Zap,
    label: "Braces / Aligners",
    desc: "Metal, ceramic & Invisalign by MDS specialists.",
    popular: true,
  },
  {
    icon: Heart,
    label: "Root Canal (RCT)",
    desc: "Painless rotary RCT — save your natural tooth.",
    popular: true,
  },
  {
    icon: Award,
    label: "Smile Makeover",
    desc: "Veneers, crowns & bonding for your dream smile.",
    popular: false,
  },
  {
    icon: Baby,
    label: "Kids Dentistry",
    desc: "Child-friendly specialists. Zero fear, healthy teeth.",
    popular: false,
  },
  {
    icon: Shield,
    label: "Gum Treatment",
    desc: "Scaling, root planing & periodontal therapy.",
    popular: false,
  },
  {
    icon: Stethoscope,
    label: "Tooth Extraction",
    desc: "Painless extractions incl. wisdom teeth, same-day.",
    popular: false,
  },
  {
    icon: Sparkles,
    label: "Veneers & Crowns",
    desc: "Porcelain & zirconia restorations crafted to perfection.",
    popular: false,
  },
  {
    icon: Zap,
    label: "Digital X-Rays",
    desc: "90% less radiation. Instant digital results.",
    popular: false,
  },
  {
    icon: Award,
    label: "Sedation Dentistry",
    desc: "Anxiety-free dentistry with oral or IV sedation.",
    popular: false,
  },
  {
    icon: Layers,
    label: "Dental Bridges",
    desc: "Natural-looking prosthetics bridging the gap of missing teeth.",
    popular: false,
  },
  {
    icon: Download,
    label: "Dentures",
    desc: "Full, partial & cast dentures for complete smile restoration.",
    popular: false,
  },
  {
    icon: Shield,
    label: "Tooth Fillings",
    desc: "Tooth-colored composite fillings to repair cavities & decay.",
    popular: false,
  },
  {
    icon: Zap,
    label: "Wisdom Tooth Surgery",
    desc: "Precision removal of impacted wisdom teeth, same-day procedure.",
    popular: false,
  },
  {
    icon: Heart,
    label: "Laser Gum Surgery",
    desc: "Minimally invasive laser periodontal therapy with fast healing.",
    popular: false,
  },
  {
    icon: Sparkles,
    label: "Implant Dentures",
    desc: "Implant-supported dentures for a secure, natural everyday feel.",
    popular: false,
  },
];

// ── why us ────────────────────────────────────────────────────────────────────
const WHY = [
  {
    icon: "🦷",
    title: "Comprehensive Dental Services",
    desc: "We offer a full spectrum of dental care — from routine cleanings and digital X-rays to advanced procedures like dental implants, root canals, laser gum surgery and smile makeovers. Whatever your dental need, our specialists handle it under one roof in Whitefield, Bengaluru.",
  },
  {
    icon: "🎓",
    title: "Experienced & Dedicated Team",
    desc: "Our team consists of MDS-qualified specialists — endodontists, orthodontists, implantologists, periodontists and paediatric dentists — who are passionate about exceptional care. Every procedure is performed by a post-graduate specialist. Never a junior or trainee.",
  },
  {
    icon: "🔬",
    title: "State-of-the-Art Technology",
    desc: "We invest in the latest dental technology to enhance accuracy and comfort. From 3D CBCT scans and intraoral cameras to laser dentistry and CAD/CAM zirconia crowns, we leverage cutting-edge tools to deliver superior results and minimise treatment time.",
  },
  {
    icon: "📋",
    title: "Personalised Treatment Plans",
    desc: "Every patient is unique, which is why we take time to listen to your concerns and goals before crafting a customised treatment plan. Whether you need preventive care or a complete smile transformation, we create a clear roadmap tailored to your needs and budget.",
  },
  {
    icon: "🏅",
    title: "Safe & Hygienic Environment",
    desc: "Our clinic follows hospital-grade sterilisation protocols, single-use instruments and strict barrier measures — so you can visit with complete peace of mind.",
  },
  {
    icon: "💬",
    title: "Commitment to Patient Education",
    desc: "We believe informed patients make better decisions. Our team takes time to explain your diagnosis, treatment options and preventive steps in plain language. We are always available to answer your questions and ensure you feel confident about your dental health journey.",
  },
];

// ── doctors ───────────────────────────────────────────────────────────────────
const DOCTORS = [
  {
    name: "Dr. Shreya Dutta., BDS (Gold Medalist)., MDS(University Rank Holder)",
    role: "Founder & Clinical Director",
    img: "/images/drShreya.jpeg",
    bio: "Dr. Shreya Dutta is the Founder & Clinical Director of Dentelope Advanced Dental Care, with over 7+ years of clinical experience in delivering advanced, patient-centered dental care. She completed her BDS from SGR Dental College, Bangalore, where she was awarded a Gold Medal for academic excellence, and earned her MDS in Pediatric and Preventive Dentistry from Rajiv Gandhi College of Dental Sciences & Hospital, Bangalore, as a University Rank Holder. Her expertise includes Pediatric Dentistry, Preventive Dental Care, Root Canal Treatment, Aesthetic Dentistry, Laser Dentistry, Sedation Dentistry, and Smile Makeovers. Known for her gentle and child-friendly approach, Dr. Shreya is committed to creating positive dental experiences while providing modern, minimally invasive treatments for children and adults. Her passion for innovation and evidence-based dentistry ensures the highest standards of care and long-lasting oral health.",
  },
  {
    name: "Dr. M N Mohit., BDS., MDS.",
    role: "Co-Founder & Clinical Director",
    img: "/images/drMohit.jpg",
    bio: "Dr. M N Mohit is the Co-Founder and Clinical Director of Dentelope Advanced Dental Care, with over 7+ years of clinical experience in providing advanced, patient-centered dental care. He completed his BDS from SGR Dental College, Bangalore, and his MDS in Pediatric and Preventive Dentistry from Vydehi Institute of Dental Sciences, Bangalore. Specializing in Pediatric Dentistry, Root Canal Treatment, Aesthetic Dentistry, Laser Dentistry, and Preventive Dental Care, Dr. Mohit is known for his gentle, child-friendly approach and expertise in managing dental anxiety. His commitment to modern technology, minimally invasive treatments, and compassionate care ensures a comfortable and positive dental experience for children and families across Bangalore.",
  },
];

function DoctorCard({ doctor }: { doctor: (typeof DOCTORS)[number] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const bioId = `doctor-bio-${doctor.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 max-w-4xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row h-full">
        <div className="sm:w-80 h-auto sm:h-auto overflow-hidden bg-gray-50 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={doctor.img}
            alt={doctor.name}
            className="w-full h-auto sm:h-full object-contain sm:object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 md:p-8 flex-1">
          <h3
            className="font-extrabold text-gray-900 text-xl leading-snug"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {doctor.name}
          </h3>
          <p className="font-semibold text-sm mt-2" style={{ color: OR }}>
            {doctor.role}
          </p>
          <p
            id={bioId}
            className={`mt-4 text-gray-600 text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}
          >
            {doctor.bio}
          </p>
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={bioId}
            onClick={() => setIsExpanded((expanded) => !expanded)}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-colors hover:text-orange-700"
            style={{ color: OR }}
          >
            {isExpanded ? "Read less" : "Read more"}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── reviews ───────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Harsh M",
    init: "HM",
    rating: 5,
    treatment: "Tooth Extraction",
    date: "Sep 2026",
    text: "The clinic is clean and premium. The rates are also affordable. Dr. Mohit removed my teeth and the experience was pleasant. I would highly recommend this clinic in Nallurhalli, Whitefield.",
  },
  {
    name: "Krishna Kumar",
    init: "KK",
    rating: 5,
    treatment: "Root Canal",
    date: "a month ago",
    text: "Got my RCT done from Dentelope. The doctors are friendly and the treatment was painless. Highly recommend this clinic in Whitefield.",
  },
  {
    name: "Praveen R",
    init: "PR",
    rating: 5,
    treatment: "Surgical Extraction",
    date: "a month ago",
    text: "Surgical extraction done at Dentelope Clinic: skilled team, clean facility, smooth recovery — very satisfied.",
  },
  {
    name: "Kamta",
    init: "K",
    rating: 5,
    treatment: "Root Canal",
    date: "2 weeks ago",
    text: "Had come here with bad tooth pain and got my root canal done. Treatment went smoothly and pain is better now.",
  },
  {
    name: "Chootu Kushawaha",
    init: "CK",
    rating: 5,
    treatment: "General Dentistry",
    date: "a month ago",
    text: "Highly recommended this clinic in Whitefield. The doctors are well experienced and take utmost care during and after the procedure.",
  },
  {
    name: "Suresh Kumar",
    init: "SK",
    rating: 5,
    treatment: "Root Canal",
    date: "May 2025",
    text: "I put off the root canal for months out of fear. Shouldn't have. The procedure was genuinely painless. Dr. Kavitha talked me through every step. Back at work the same afternoon.",
  },
  {
    name: "Ananya Singh",
    init: "AS",
    rating: 5,
    treatment: "Kids Dentistry",
    date: "Jul 2025",
    text: "My 6-year-old was terrified of dentists. The team at Dentelope turned it into a fun adventure \u2014 stickers, music, the works. She's excited about her next visit. That says it all.",
  },
  {
    name: "Raghav Nair",
    init: "RN",
    rating: 5,
    treatment: "Invisalign",
    date: "Apr 2025",
    text: "The 3D digital simulation before starting was the deciding factor. 8 months later, my teeth look exactly as predicted. Incredible technology, incredible team.",
  },
  {
    name: "Meera Joshi",
    init: "MJ",
    rating: 5,
    treatment: "Dental Implants",
    date: "Jul 2025",
    text: "Two implants, completely seamless. CT planning was thorough, crowns indistinguishable from natural teeth. Pricing was exactly what was quoted \u2014 not a rupee more.",
  },
  {
    name: "Vikram Rao",
    init: "VR",
    rating: 5,
    treatment: "General Checkup",
    date: "Mar 2025",
    text: "Refreshingly honest. Recommended only what I actually needed. A proper 30-minute consultation, clear explanations, zero upselling. This is how dentistry should be done.",
  },
];

// ── faqs ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is the first consultation free?",
    a: "Yes \u2014 your first consultation at Dentelope is completely free. Our specialist will examine your teeth, discuss your concerns and present a detailed treatment plan at no charge.",
  },
  {
    q: "Are the procedures painful?",
    a: "We use computer-controlled anaesthesia with vibration-dampening delivery. The vast majority of patients feel no pain \u2014 even during root canals and implant procedures.",
  },
  {
    q: "Do you accept dental insurance?",
    a: "Yes. We're empanelled with Star Health, HDFC Ergo, Bajaj Allianz, Aditya Birla Health and most corporate TPA cashless networks. Our team handles all paperwork.",
  },
  {
    q: "What EMI options are available?",
    a: "0% EMI for 3\u201324 months via HDFC Flexipay, BajajFinserv, ZestMoney and select credit cards. Available for treatments above \u20b910,000.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the form on this page, call/WhatsApp +91-6364609627, or walk in. Same-day slots available for most non-surgical treatments.",
  },
  {
    q: "What are your clinic timings?",
    a: "Open all 7 days: 9:00 AM \u2013 9:00 PM. Emergency dental care available on call outside these hours.",
  },
  {
    q: "How hygienic is the clinic?",
    a: "Hospital-grade sterilisation, single-use consumables and strict infection-control protocols throughout.",
  },
  {
    q: "Do you treat children?",
    a: "Absolutely. Dedicated pediatric dentists, a fun kids' zone and behaviour management training \u2014 designed to make young patients feel completely at ease.",
  },
];

const BLOGS = [
  {
    title: "5 Signs You Need a Root Canal (And Why It's Not Scary)",
    tag: "Root Canal",
    date: "Jul 10, 2025",
    img: "https://images.unsplash.com/photo-1660737217690-15182b43899e?w=560&h=340&fit=crop&auto=format",
  },
  {
    title: "Invisalign vs. Metal Braces: An Honest Comparison for 2025",
    tag: "Orthodontics",
    date: "Jun 28, 2025",
    img: "https://images.unsplash.com/photo-1631596695358-d4ae250d4737?w=560&h=340&fit=crop&auto=format",
  },
  {
    title: "Complete Guide to Dental Implants in India \u2014 Costs & Recovery",
    tag: "Implants",
    date: "Jun 15, 2025",
    img: "https://images.unsplash.com/photo-1776406987595-ba14f3510c07?w=560&h=340&fit=crop&auto=format",
  },
];

const PARTNERS = [
  "Star Health",
  "HDFC Ergo",
  "Bajaj Allianz",
  "Aditya Birla Health",
  "Care Health",
  "New India Assurance",
  "United India",
  "National Insurance",
];

// ── helpers ───────────────────────────────────────────────────────────────────
function Stars({ count = 5, size = 4 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-${size} h-${size}`}
          style={{
            fill: i < count ? OR : "transparent",
            color: i < count ? OR : "#ddd",
          }}
        />
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

// ── booking form ──────────────────────────────────────────────────────────────
function BookingForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    treatment: "",
    date: "",
  });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setForm({ name: "", phone: "", treatment: "", date: "" });
    }, 5000);
  };

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-[#faf5ee] px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition";
  const labelCls =
    "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  if (done)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "#fff0e8" }}
        >
          <CheckCircle className="w-8 h-8" style={{ color: OR }} />
        </div>
        <h3
          className="text-xl font-bold text-gray-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Appointment Requested!
        </h3>
        <p className="text-gray-500 text-sm">
          Our team will call you within 30 minutes to confirm your slot.
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className={compact ? "space-y-3" : "space-y-4"}>
      <div>
        <label className={labelCls}>Full Name</label>
        <input
          type="text"
          required
          placeholder="Priya Sharma"
          className={inputCls}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className={labelCls}>Mobile Number</label>
        <input
          type="tel"
          required
          placeholder="+91-6364609627"
          className={inputCls}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <label className={labelCls}>Treatment</label>
        <div className="relative">
          <select
            required
            className={inputCls + " appearance-none pr-10"}
            value={form.treatment}
            onChange={(e) => setForm({ ...form, treatment: e.target.value })}
          >
            <option value="">Select treatment</option>
            {TREATMENTS.map((t) => (
              <option key={t.label}>{t.label}</option>
            ))}
            <option>Not Sure — Need Advice</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
      {!compact && (
        <div>
          <label className={labelCls}>Preferred Date</label>
          <input
            type="date"
            required
            className={inputCls}
            min={new Date().toISOString().split("T")[0]}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white tracking-wide transition hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2"
        style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
      >
        <Calendar className="w-4 h-4" /> Book FREE Appointment
      </button>
      <p className="text-center text-xs text-gray-400">
        No charges · First consultation free · Quick response
      </p>
    </form>
  );
}

// ── features strip ────────────────────────────────────────────────────────────
function FeaturesStrip() {
  return (
    <div style={{ background: WHITE, borderBottom: "1px solid #efe5cc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            {
              icon: "\ud83d\udc89",
              label: "Pain-Free Care",
              sub: "Computer-controlled anaesthesia",
            },
            {
              icon: "\ud83c\udf93",
              label: "MDS Specialists",
              sub: "Post-graduate doctors only",
            },
            {
              icon: "\ud83d\udccb",
              label: "Transparent Pricing",
              sub: "No hidden fees, ever",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-1.5 py-3 px-2 rounded-2xl cursor-pointer transition-all"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#fff0e8")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "")
              }
            >
              <span className="text-2xl">{item.icon}</span>
              <p
                className="font-bold text-xs text-gray-900 leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {item.label}
              </p>
              <p className="text-[10px] text-gray-400 leading-tight">
                {item.sub}
              </p>
            </div>
          ))}
          {/* Google rating item */}
          <div className="flex flex-col items-center text-center gap-1.5 py-3 px-2 rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="h-5 opacity-80"
            />
            <div className="flex items-center gap-1">
              <span
                className="font-extrabold text-sm text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                5.0
              </span>
              <Stars count={5} size={4} />
            </div>
            <p className="text-[10px] text-gray-400">Google Rating</p>
          </div>
          {/* patients stat item */}
          <div className="flex flex-col items-center text-center gap-1.5 py-3 px-2 rounded-2xl">
            <span className="text-2xl">👥</span>
            <p
              className="font-bold text-xs text-gray-900 leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              2,000+
            </p>
            <p className="text-[10px] text-gray-400 leading-tight">
              Patients Treated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── treatments carousel ───────────────────────────────────────────────────────
function TreatmentsCarousel() {
  return (
    <section id="treatments" className="py-20" style={{ background: CREAM2 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <OrangePill>Our Treatments</OrangePill>
          <h2
            className="mt-3 text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            All Dental Services
            <br />
            <span style={{ color: OR }}>Under One Roof</span>
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-md leading-relaxed">
            From a routine cleaning to a complete smile makeover — every
            treatment by MDS specialists.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TREATMENT_DATA.map((t) => (
            <Link
              key={t.slug}
              href={`/treatments/${t.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-200 overflow-hidden flex flex-col relative"
            >
              {t.popular && (
                <span
                  className="absolute top-3 right-3 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase text-white"
                  style={{ background: OR }}
                >
                  Popular
                </span>
              )}
              <div className="w-full h-44 overflow-hidden bg-gray-100">
                <img
                  src={t.heroImage}
                  alt={t.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h3
                  className="font-bold text-gray-900 text-sm leading-snug"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {t.label}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                  {t.tagline}
                </p>
                <div className="mt-auto pt-3 flex items-center justify-end border-t border-gray-50">
                  <span className="text-xs font-semibold text-orange-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

const SEARCH_ITEMS = [
  ...TREATMENT_DATA.map((t) => ({
    label: t.label,
    sub: t.tagline,
    href: `/treatments/${t.slug}`,
    type: "treatment" as const,
  })),
  {
    label: "About Us",
    sub: "Our story & clinic info",
    href: "/#about",
    type: "page" as const,
  },
  {
    label: "Our Doctors",
    sub: "Meet our MDS specialists",
    href: "/#doctors",
    type: "page" as const,
  },
  {
    label: "Patient Reviews",
    sub: "What patients say",
    href: "/#reviews",
    type: "page" as const,
  },
  {
    label: "Dental Blog",
    sub: "Tips & dental health articles",
    href: "/#blog",
    type: "page" as const,
  },
  {
    label: "Contact Us",
    sub: "Location, hours & directions",
    href: "/#contact",
    type: "page" as const,
  },
  {
    label: "Book Appointment",
    sub: "Schedule your visit",
    href: "/#book",
    type: "page" as const,
  },
];

function SearchBox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results =
    query.trim().length > 0
      ? SEARCH_ITEMS.filter(
          (item) =>
            item.label.toLowerCase().includes(query.toLowerCase()) ||
            item.sub.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 6)
      : [];

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
    if (e.key === "Enter" && results.length > 0) navigate(results[0].href);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative hidden xl:flex items-center ml-auto"
    >
      {open ? (
        <div className="flex items-center gap-2 bg-white border border-orange-300 rounded-xl px-3 py-2 shadow-md w-72">
          <Search className="w-4 h-4 text-orange-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search treatments, pages…"
            className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
          />
          <button
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      )}
      {open && results.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden">
          {results.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left"
            >
              <span
                className="mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0"
                style={{
                  background: item.type === "treatment" ? "#fff0e8" : "#f0f4ff",
                  color: item.type === "treatment" ? OR : "#3b5bdb",
                }}
              >
                {item.type === "treatment" ? "Treatment" : "Page"}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [revIdx, setRevIdx] = useState(0);
  const [reviewVisibleCount, setReviewVisibleCount] = useState(3);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      setReviewVisibleCount(
        window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3,
      );
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxRev = Math.max(0, REVIEWS.length - reviewVisibleCount);

  useEffect(() => {
    setRevIdx((index) => Math.min(index, maxRev));
  }, [maxRev]);

  useEffect(() => {
    if (reviewsPaused) return;

    const timer = window.setInterval(() => {
      setRevIdx((index) => (index >= maxRev ? 0 : index + 1));
    }, 4500);

    return () => window.clearInterval(timer);
  }, [maxRev, reviewsPaused]);

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{ background: CREAM2, fontFamily: "Inter, sans-serif" }}
    >
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
      {/* navbar */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
        style={{ borderBottom: "1px solid #f0e0d0" }}
      >
        <div className="w-full px-4 sm:px-6 flex items-center h-[88px] gap-3">
          <a href="#" className="flex items-center gap-2 shrink-0">
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
          </a>
          <nav className="hidden xl:flex items-center flex-1 text-sm font-medium text-gray-600 justify-center">
            {NAV_LINKS.map((n) => (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => setOpenNav(n.label)}
                onMouseLeave={() => setOpenNav(null)}
              >
                <a
                  href={n.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-orange-500 hover:bg-orange-50 transition-colors whitespace-nowrap"
                >
                  {n.label}{" "}
                  {n.sub.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </a>
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
          <SearchBox />
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <Link
              href="/doctor-dashboard"
              className="flex items-center gap-2 text-sm font-bold text-white px-4 py-2.5 rounded-lg transition hover:opacity-90"
              style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
            >
              <Shield className="w-4 h-4" /> Doctor Dashboard
            </Link>
            <button
              onClick={() => setBookingOpen(true)}
              className="flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-lg transition hover:opacity-90"
              style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
            >
              <Calendar className="w-4 h-4" /> Book Appointment
            </button>
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
              <Link
                href="/doctor-dashboard"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 text-sm font-bold text-white py-3 rounded-xl w-full"
                style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
              >
                <Shield className="w-4 h-4" /> Doctor Dashboard
              </Link>
              <button
                onClick={() => {
                  setBookingOpen(true);
                  setMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 text-sm font-bold text-white py-3 rounded-xl w-full"
                style={{ background: OR }}
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </button>
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

      <HeroCarousel onBookClick={() => setBookingOpen(true)} />
      <FeaturesStrip />

      <TreatmentsCarousel />

      {/* about */}
      <section id="about" className="py-20" style={{ background: WHITE }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* image side */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&h=700&fit=crop&auto=format"
                  alt="Dentelope Clinic Interior"
                  className="w-full h-[480px] object-cover"
                />
              </div>
              {/* floating stat card */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-6 py-4 shadow-xl border border-orange-50 hidden sm:block">
                <p
                  className="text-3xl font-extrabold"
                  style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
                >
                  2,000+
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Happy Patients
                </p>
              </div>
              {/* floating patients card */}
              <div className="absolute -top-5 -left-5 bg-white rounded-2xl px-6 py-4 shadow-xl border border-orange-50 hidden sm:block">
                <p
                  className="text-3xl font-extrabold"
                  style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
                >
                  Quality Care
                </p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Clinical Standards
                </p>
              </div>
            </div>

            {/* content side */}
            <div className="space-y-6">
              <div>
                <OrangePill>Our Story</OrangePill>
                <h2
                  className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  About <span style={{ color: OR }}>Dentelope</span>
                  <br />
                  Advanced Dental Care
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Dentelope Advanced Dental Clinic was born from a vision — to
                make specialist-grade dental care accessible, comfortable, and
                completely pain-free for every family in Whitefield, Bengaluru.
                From day one, we set out to raise the bar: MDS-qualified doctors
                only, hospital-grade sterilisation, and transparent pricing with
                no hidden costs.
              </p>
              <p className="text-gray-600 leading-relaxed">
                In a short time we have had the privilege of caring for 2,000+
                patients and counting. Our clinic combines cutting-edge
                technology — 3D digital X-rays, laser dentistry, AI-assisted
                diagnostics — with a warm, personal approach. We believe every
                smile tells a story, and we’re honoured to be part of yours.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "2,000+", l: "Patients Treated" },
                  { v: "20+", l: "Specialist Doctors" },
                  { v: "Quality Care", l: "Clinical Standards" },
                  { v: "Sterile Care", l: "Hospital Hygiene" },
                ].map(({ v, l }) => (
                  <div
                    key={l}
                    className="rounded-2xl px-5 py-4 border"
                    style={{ background: "#fff8f2", borderColor: `${OR}20` }}
                  >
                    <p
                      className="text-2xl font-extrabold"
                      style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
                    >
                      {v}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 font-medium">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
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
          </div>
        </div>
      </section>

      {/* why us */}
      <section id="why-us" className="py-20" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1777444969135-caf869407707?w=720&h=800&fit=crop&auto=format"
                  alt="Dentelope specialist"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "500px" }}
                />
              </div>
              <div className="absolute -right-4 bottom-10 bg-white border border-gray-100 rounded-2xl shadow-xl p-5 max-w-[220px]">
                <Stars count={5} size={3} />
                <p className="text-xs text-gray-700 mt-2 leading-snug">
                  &ldquo;Truly painless. The best dental experience I&apos;ve
                  had anywhere.&rdquo;
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5">
                  — Kiran D., Whitefield
                </p>
              </div>
              <div
                className="absolute -left-4 top-10 rounded-2xl px-5 py-4 shadow-xl border border-orange-100"
                style={{ background: OR }}
              >
                <div
                  className="text-2xl font-extrabold text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  2,000+
                </div>
                <div className="text-xs text-white/80 mt-0.5">
                  Smiles Transformed
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <OrangePill>Why Choose Dentelope</OrangePill>
                <h2
                  className="mt-4 text-4xl font-extrabold text-gray-900 leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Dentistry that puts
                  <br />
                  <span style={{ color: OR }}>your comfort first</span>
                </h2>
                <p className="mt-3 text-gray-500 leading-relaxed">
                  We built Dentelope on one simple belief — dental care should
                  never feel intimidating. Here&apos;s why patients drive across
                  Bengaluru to visit us.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {WHY.map((w) => (
                  <div
                    key={w.title}
                    className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-300 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-2xl inline-block transition-transform duration-300 group-hover:scale-125">
                      {w.icon}
                    </span>
                    <h4
                      className="font-bold text-gray-900 text-sm mt-2 mb-1 group-hover:text-orange-500 transition-colors duration-300"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {w.title}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-2 text-white font-bold px-7 py-4 rounded-xl transition hover:opacity-90 text-sm"
                style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
              >
                Book Appointment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* doctors */}
      <section id="doctors" className="py-20" style={{ background: WHITE }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <OrangePill>Expert Team</OrangePill>
            <h2
              className="mt-4 text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Meet Our Specialist Dentists
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
              Post-graduate MDS specialists with international training,
              committed to extraordinary results.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 justify-center">
            {DOCTORS.map((doctor) => (
              <DoctorCard key={doctor.name} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* reviews */}
      <section id="reviews" className="py-20" style={{ background: CREAM2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
            <div>
              <OrangePill>Patient Stories</OrangePill>
              <h2
                className="mt-4 text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                What Our Patients Say
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Stars count={5} size={4} />
                <span className="text-sm text-gray-500">
                  5 Star Google Rating
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setRevIdx((i) => Math.max(0, i - 1))}
                disabled={revIdx === 0}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition disabled:opacity-30 text-gray-500"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRevIdx((i) => Math.min(maxRev, i + 1))}
                disabled={revIdx >= maxRev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition disabled:opacity-30 text-gray-500"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div
            className="overflow-hidden"
            onMouseEnter={() => setReviewsPaused(true)}
            onMouseLeave={() => setReviewsPaused(false)}
            onFocus={() => setReviewsPaused(true)}
            onBlur={() => setReviewsPaused(false)}
          >
            <div
              className="reviews-track flex gap-5 transition-transform duration-500 ease-in-out"
              style={
                {
                  "--review-index": revIdx,
                } as React.CSSProperties
              }
            >
              {REVIEWS.map((r) => (
                <div
                  key={r.name}
                  className="review-card shrink-0 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
                >
                  <Stars count={r.rating} size={4} />
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed italic line-clamp-5">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                    <div
                      className="w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shrink-0 text-white"
                      style={{ background: OR }}
                    >
                      {r.init}
                    </div>
                    <div className="flex-1">
                      <p
                        className="font-bold text-gray-900 text-sm"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {r.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {r.treatment} · {r.date}
                      </p>
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png"
                      alt="Google"
                      className="w-5 h-5 opacity-60"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="https://www.google.com/search?sca_esv=403cd90e1945cb77&sxsrf=APpeQnutHj6aUWLhse4WGFlVIZjhX--_gQ:1789137049675&q=dentelope+bangalore&nfpr=1&sa=X&ved=2ahUKEwjS8LLy3uaWAxUtamwGHWO0PUEQvgUoAXoECBMQAg&biw=1912&bih=948&dpr=1#lrd=0x3bae13ab3bc55ce3:0xe846e432bcdb0036,1,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold border px-6 py-3 rounded-xl transition hover:bg-orange-50"
              style={{
                color: OR,
                borderColor: `${OR}55`,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              See Our 5-Star Google Reviews <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* patient speaks */}
      <section
        id="patient-speaks"
        className="py-20"
        style={{ background: WHITE }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <OrangePill>Video Testimonials</OrangePill>
            <h2
              className="mt-4 text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Patient <span style={{ color: OR }}>Speaks</span>
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              Hear what our happy patients have to say about their treatments at
              Dentelope
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              {
                name: "Priya Sharma",
                city: "Bengaluru",
                treatment: "Teeth Whitening",
                img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=560&fit=crop&auto=format",
              },
              {
                name: "Rahul Kumar",
                city: "Whitefield",
                treatment: "Dental Implants",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&fit=crop&auto=format",
              },
              {
                name: "Meera Nair",
                city: "Bengaluru",
                treatment: "Braces / Aligners",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=560&fit=crop&auto=format",
              },
              {
                name: "Arjun Reddy",
                city: "Whitefield",
                treatment: "Root Canal (RCT)",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=560&fit=crop&auto=format",
              },
              {
                name: "Kavya Patel",
                city: "Bengaluru",
                treatment: "Smile Makeover",
                img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=560&fit=crop&auto=format",
              },
            ].map(({ name, city, treatment, img }) => (
              <div key={name} className="flex flex-col gap-3">
                <div className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={name}
                    className="w-full aspect-[5/7] object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5 translate-x-0.5"
                        viewBox="0 0 24 24"
                        fill={OR}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* name badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-xs uppercase tracking-wider drop-shadow">
                      {name}
                    </p>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">
                      Happy Patient &middot; {treatment}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{city}</p>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: OR }}
                  >
                    {treatment}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-bold border-b-2 pb-0.5 transition hover:opacity-70"
              style={{ color: DARK, borderColor: DARK }}
            >
              View More <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* blog */}
      <section id="blog" className="py-20" style={{ background: CREAM2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
            <div>
              <OrangePill>Dental Tips</OrangePill>
              <h2
                className="mt-4 text-4xl font-extrabold text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                From Our <span style={{ color: OR }}>Dental Blog</span>
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-bold flex items-center gap-1.5 transition hover:opacity-80"
              style={{ color: OR, fontFamily: "Poppins, sans-serif" }}
            >
              View All Articles <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOGS.map((b) => (
              <article
                key={b.title}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.img}
                    alt={b.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full text-white"
                      style={{ background: OR }}
                    >
                      {b.tag}
                    </span>
                    <span className="text-xs text-gray-400">{b.date}</span>
                  </div>
                  <h3
                    className="font-bold text-gray-900 leading-snug text-sm group-hover:text-orange-500 transition-colors"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {b.title}
                  </h3>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                    style={{ color: OR }}
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* faqs */}
      <section id="faqs" className="py-20" style={{ background: WHITE }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <OrangePill>FAQs</OrangePill>
            <h2
              className="mt-4 text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Still unsure? Call us at{" "}
              <a
                href={`tel:${C.phone}`}
                className="font-bold"
                style={{ color: OR }}
              >
                {C.phone}
              </a>
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="bg-white border rounded-2xl overflow-hidden transition-all shadow-sm"
                style={{ borderColor: openFaq === i ? `${OR}55` : "#eee" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-orange-50/50 transition-colors"
                >
                  <span
                    className="font-bold text-gray-900 text-sm pr-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {f.q}
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all"
                    style={
                      openFaq === i
                        ? { background: OR }
                        : { background: "#f0e8e0" }
                    }
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                      style={{ color: openFaq === i ? WHITE : OR }}
                    />
                  </div>
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 pb-5 pt-2 text-sm text-gray-600 leading-relaxed border-t"
                    style={{ borderColor: "#fce8d8", background: "#fffaf6" }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* location */}
      <section id="contact" className="py-20" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <OrangePill>Visit Us</OrangePill>
            <h2
              className="mt-4 text-4xl font-extrabold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Find Dentelope in Whitefield
            </h2>
          </div>
          <div className="grid lg:grid-cols-[380px_1fr] gap-8 items-start">
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "#fff0e8" }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: OR }} />
                  </div>
                  <h4
                    className="font-extrabold text-gray-900"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Dentelope — Whitefield
                  </h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed pl-12 whitespace-pre-line">
                  {C.address}
                </p>
              </div>
              {[
                { icon: Clock, l: "All 7 Days", v: "9:00 AM \u2013 9:00 PM" },
                { icon: Phone, l: "Phone / WhatsApp", v: C.phone },
                { icon: MessageCircle, l: "Email", v: C.email },
              ].map(({ icon: Icon, l, v }) => (
                <div key={l} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#fff0e8" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: OR }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold text-gray-900"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {l}
                    </p>
                    <p className="text-xs text-gray-500">{v}</p>
                  </div>
                </div>
              ))}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="flex items-center justify-center gap-2 text-white font-bold py-3 rounded-xl transition hover:opacity-90 text-sm w-full"
                  style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
                <a
                  href="https://www.google.com/maps/place/Dentelope+Advanced+Dental+care%7C+Whitefield,Nallurhalli/@12.966993,77.7367919,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae13ab3bc55ce3:0xe846e432bcdb0036!8m2!3d12.966993!4d77.7393668"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 font-semibold py-3 rounded-xl border transition hover:bg-orange-50 text-sm"
                  style={{ color: OR, borderColor: `${OR}55` }}
                >
                  <MapPin className="w-4 h-4" /> Get Directions
                </a>
              </div>
            </div>
            <div
              className="rounded-2xl overflow-hidden border border-gray-200 shadow-md"
              style={{ minHeight: "420px" }}
            >
              <iframe
                title="Dentelope map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d77.7367919!3d12.966993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13ab3bc55ce3%3A0xe846e432bcdb0036!2sDentelope%20Advanced%20Dental%20care%7C%20Whitefield%2CNallurhalli!5e0!3m2!1sen!2sin!4v1691000000000"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "420px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer style={{ background: "#2a0e00", color: "#c9a98a" }}>
        <div className="w-full px-6 sm:px-10 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-x-10 gap-y-10">
          {/* col 1 — brand + contact */}
          <div className="lg:col-span-2 space-y-5 flex flex-col items-start sm:items-start">
            <div className="flex items-center gap-3 pl-0 sm:pl-4">
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
            <div className="space-y-2 pl-0 sm:pl-[108px] w-full">
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
            <div className="flex gap-2.5 pl-0 sm:pl-[108px]">
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
              {TREATMENTS.slice(0, 10).map((t) => (
                <li key={t.label}>
                  <a
                    href="#treatments"
                    className="hover:text-white transition-colors"
                  >
                    {t.label}
                  </a>
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

      {/* floating WhatsApp */}
      <a
        href={`https://wa.me/${C.wa}?text=${encodeURIComponent("Hi, I'd like to book an appointment at Dentelope Advanced Dental Care. Please let me know the available slots.")}`}
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
        style={{ boxShadow: "0 8px 30px rgba(34,197,94,0.4)" }}
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>
    </div>
  );
}
