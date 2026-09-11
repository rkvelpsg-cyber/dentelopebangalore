import { useState, useEffect, useRef, useCallback } from "react";
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
  FacebookIcon as Facebook,
  InstagramIcon as Instagram,
  YoutubeIcon as Youtube,
  MessageCircle,
  Twitter,
  Sparkles,
  Zap,
  Heart,
  Baby,
  Layers,
  Stethoscope,
  Quote,
  Download,
  Pause,
  Play,
  Search,
  Users,
  ThumbsUp,
  BadgeCheck,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ── carousel images ────────────────────────────────────────────────────────────
import slide0 from "@/imports/image.png";
import slide1 from "@/imports/Variant7-5.jpg";
import slide2 from "@/imports/Variant7-1.jpg";
import slide3 from "@/imports/image-3.png";
import slide4 from "@/imports/image-4.png";
import slide5 from "@/imports/image-5.png";

// ── Clove Dental–exact colour palette ─────────────────────────────────────────
const OR = "#e8531a"; // primary orange
const OR2 = "#f26522"; // orange variant
const CREAM = "#efe5cc"; // warm beige section bg
const CREAM2 = "#fdf8f2"; // page bg (very light cream)
const DARK = "#1a1a1a"; // near-black text
const GRAY = "#6b6b6b"; // body muted
const WHITE = "#ffffff";

// ── brand ─────────────────────────────────────────────────────────────────────
const C = {
  name: "Dentelope",
  phone: "+91-6364609627",
  wa: "916364609627",
  email: "care@dentelope.in",
  address:
    "3 Tsn Babu, Opposite to SBB Sapphire\nVictorian View Layout, Nallurhalli\nWhitefield, Bengaluru – 560 066",
  city: "Whitefield, Bengaluru",
  rating: "4.9",
  reviews: "842",
  patients: "10,000+",
  years: "12+",
};

// ── hero slides ────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    img: slide0,
    badge: "35% OFF",
    label: "Teeth Whitening",
    headline: "Make Heads Turn",
    sub: "When You Smile",
    body: "Whistle Smile. Beautiful Smile. Professional laser whitening — visible results in one visit.",
    stats: [],
    validity: "Valid till 31st Jul '26",
  },
  {
    img: slide1,
    badge: "20% OFF",
    label: "Braces",
    headline: "Close Gaps & Straighten",
    sub: "with Braces",
    body: "Expert orthodontists. Metal, ceramic & clear aligner options.",
    stats: ["30,000+ ongoing ortho patients"],
    validity: "Valid till 31st Jul '26",
  },
  {
    img: slide2,
    badge: "30% OFF",
    label: "Kids Dentistry",
    headline: "Imagine Your Child with",
    sub: "No Cavities & Toothache",
    body: "Child specialists: zero cavities · aligned teeth · fresh breath · no irritable grinding.",
    stats: [],
    validity: "Valid till 31st Jul '26",
  },
  {
    img: slide3,
    badge: "35% OFF",
    label: "Clear Aligners",
    headline: "You Are Unstoppable",
    sub: "When You Smile Confidently",
    body: "Invisible aligners crafted for your lifestyle. Remove for meals, wear day & night.",
    stats: [],
    validity: "Valid till 31st Jul '26",
  },
  {
    img: slide4,
    badge: "25% OFF",
    label: "Styled Braces",
    headline: "Straighten Your Teeth",
    sub: "with Styled Braces",
    body: "Show off your style · Enjoy stunning looks · Choose your favourite colour.",
    stats: [],
    validity: "Valid till 31st Jul '26",
  },
  {
    img: slide5,
    badge: "20% OFF",
    label: "Dental Implants",
    headline: "Fix Missing Teeth with",
    sub: "Premium Dental Implants",
    body: "75+ specialist implantologists · 1,700+ implants placed every month.",
    stats: ["75+ implantologists", "1700+ per month"],
    validity: "Valid till 31st Jul '26",
  },
];

// ── nav ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
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
    ],
  },
  { label: "Membership Plans", sub: [] },
  { label: "Patient Safety", sub: [] },
  { label: "Our Doctors", sub: [] },
  { label: "Find a Clinic", sub: [] },
  { label: "Instant Callback", sub: [] },
];

// ── treatments ────────────────────────────────────────────────────────────────
const TREATMENTS = [
  {
    icon: Stethoscope,
    label: "Teeth Cleaning",
    price: "₹500",
    desc: "Scaling, polishing & oral hygiene assessment.",
    popular: false,
  },
  {
    icon: Sparkles,
    label: "Teeth Whitening",
    price: "₹3,500",
    desc: "Laser whitening — brighter smile in one visit.",
    popular: true,
  },
  {
    icon: Layers,
    label: "Dental Implants",
    price: "₹18,000",
    desc: "Titanium implants that look & feel natural.",
    popular: true,
  },
  {
    icon: Zap,
    label: "Braces / Aligners",
    price: "₹22,000",
    desc: "Metal, ceramic & Invisalign by MDS specialists.",
    popular: true,
  },
  {
    icon: Heart,
    label: "Root Canal (RCT)",
    price: "₹4,500",
    desc: "Painless rotary RCT — save your natural tooth.",
    popular: true,
  },
  {
    icon: Award,
    label: "Smile Makeover",
    price: "₹8,000",
    desc: "Veneers, crowns & bonding for your dream smile.",
    popular: false,
  },
  {
    icon: Baby,
    label: "Kids Dentistry",
    price: "₹400",
    desc: "Child-friendly specialists. Zero fear, healthy teeth.",
    popular: false,
  },
  {
    icon: Shield,
    label: "Gum Treatment",
    price: "₹1,200",
    desc: "Scaling, root planing & periodontal therapy.",
    popular: false,
  },
  {
    icon: Stethoscope,
    label: "Tooth Extraction",
    price: "₹600",
    desc: "Painless extractions incl. wisdom teeth, same-day.",
    popular: false,
  },
  {
    icon: Sparkles,
    label: "Veneers & Crowns",
    price: "₹6,000",
    desc: "Porcelain & zirconia restorations crafted to perfection.",
    popular: false,
  },
  {
    icon: Zap,
    label: "Digital X-Rays",
    price: "₹300",
    desc: "90% less radiation. Instant digital results.",
    popular: false,
  },
  {
    icon: Award,
    label: "Sedation Dentistry",
    price: "On consult",
    desc: "Anxiety-free dentistry with oral or IV sedation.",
    popular: false,
  },
];

// ── why us ────────────────────────────────────────────────────────────────────
const WHY = [
  {
    icon: "💉",
    title: "Pain-Free Procedures",
    desc: "Computer-controlled anaesthesia makes even root canals feel effortless.",
  },
  {
    icon: "🎓",
    title: "MDS Specialists Only",
    desc: "Every procedure by a post-graduate specialist. Never a junior or trainee.",
  },
  {
    icon: "🏅",
    title: "Quality Care",
    desc: "Clinical-grade sterilisation and strict safety protocols.",
  },
  {
    icon: "📸",
    title: "3D Digital Precision",
    desc: "CBCT scans, intraoral cameras & AI diagnostics for predictable results.",
  },
  {
    icon: "💳",
    title: "0% EMI Available",
    desc: "No-cost EMI for 3–24 months via HDFC, BajajFinserv, ZestMoney.",
  },
  {
    icon: "📋",
    title: "Transparent Pricing",
    desc: "Full cost breakdown before any procedure begins. No surprise bills.",
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

// ── reviews ───────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Priya Ramesh",
    init: "PR",
    rating: 5,
    treatment: "Smile Makeover",
    date: "Jun 2025",
    text: "Best dental experience I've had in Bengaluru. Dr. Sneha was thorough with the consultation — no rushed explanations, no upselling. My veneers look completely natural. Zero pain throughout.",
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
    text: "My 6-year-old was terrified of dentists. The team at Dentelope turned it into a fun adventure — stickers, music, the works. She's excited about her next visit. That says it all.",
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
    text: "Two implants, completely seamless. CT planning was thorough, crowns indistinguishable from natural teeth. Pricing was exactly what was quoted — not a rupee more.",
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
    a: "Yes — your first consultation at Dentelope is completely free. Our specialist will examine your teeth, discuss your concerns and present a detailed treatment plan at no charge.",
  },
  {
    q: "Are the procedures painful?",
    a: "We use computer-controlled anaesthesia with vibration-dampening delivery. The vast majority of patients feel no pain — even during root canals and implant procedures.",
  },
  {
    q: "Do you accept dental insurance?",
    a: "Yes. We're empanelled with Star Health, HDFC Ergo, Bajaj Allianz, Aditya Birla Health and most corporate TPA cashless networks. Our team handles all paperwork.",
  },
  {
    q: "What EMI options are available?",
    a: "0% EMI for 3–24 months via HDFC Flexipay, BajajFinserv, ZestMoney and select credit cards. Available for treatments above ₹10,000.",
  },
  {
    q: "How do I book an appointment?",
    a: "Use the form on this page, call/WhatsApp +91-6364609627, or walk in. Same-day slots available for most non-surgical treatments.",
  },
  {
    q: "What are your clinic timings?",
    a: "Open all 7 days: 9:00 AM – 9:00 PM. Emergency dental care available on call outside these hours.",
  },
  {
    q: "How hygienic is the clinic?",
    a: "Hospital-grade sterilisation, single-use consumables and strict infection-control protocols throughout.",
  },
  {
    q: "Do you treat children?",
    a: "Absolutely. Dedicated pediatric dentists, a fun kids' zone and behaviour management training — designed to make young patients feel completely at ease.",
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
    title: "Complete Guide to Dental Implants in India — Costs & Recovery",
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

// ── tiny helpers ──────────────────────────────────────────────────────────────
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

// ── hero carousel ─────────────────────────────────────────────────────────────
function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (i: number) => setCur((i + SLIDES.length) % SLIDES.length),
    [],
  );
  const next = useCallback(() => go(cur + 1), [cur, go]);
  const prev = useCallback(() => go(cur - 1), [cur, go]);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, 5500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* slides */}
      <div
        className="relative w-full"
        style={{
          minHeight: "340px",
          maxHeight: "500px",
          aspectRatio: "1440/480",
        }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === cur ? 1 : 0, zIndex: i === cur ? 2 : 1 }}
          >
            <ImageWithFallback
              src={s.img}
              alt={`${s.label} at Dentelope`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* arrow buttons — styled exactly like Clove Dental's thin arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <ChevronLeft className="w-5 h-5" style={{ color: DARK }} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <ChevronRight className="w-5 h-5" style={{ color: DARK }} />
        </button>

        {/* pause */}
        <button
          onClick={() => setPaused((p) => !p)}
          className="absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 transition"
          style={{ background: "rgba(255,255,255,0.7)" }}
        >
          {paused ? (
            <Play className="w-3.5 h-3.5 text-gray-700" />
          ) : (
            <Pause className="w-3.5 h-3.5 text-gray-700" />
          )}
        </button>
      </div>

      {/* dot bar — Clove Dental style: small dots below the banner */}
      <div
        className="flex items-center justify-center gap-2 py-2.5"
        style={{ background: "#f5ead8" }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className="flex items-center gap-1.5 transition-all px-1"
            title={s.label}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: i === cur ? 24 : 8,
                height: 8,
                background: i === cur ? OR : "#c9b89a",
              }}
            />
          </button>
        ))}
        <span className="text-xs ml-2 font-medium" style={{ color: GRAY }}>
          {SLIDES[cur].label}
        </span>
      </div>
    </div>
  );
}

// ── features strip ────────────────────────────────────────────────────────────
function FeaturesStrip() {
  const items = [
    {
      icon: "💉",
      label: "Pain-Free Care",
      sub: "Computer-controlled anaesthesia",
    },
    { icon: "🎓", label: "MDS Specialists", sub: "Post-graduate doctors only" },
    { icon: "🏅", label: "Quality Care", sub: "Safe clinic standards" },
    { icon: "💳", label: "0% EMI", sub: "Up to 24 months, zero cost" },
    { icon: "🆓", label: "Free Consultation", sub: "First visit at no charge" },
    { icon: "📋", label: "Transparent Pricing", sub: "No hidden fees, ever" },
  ];

  return (
    <div style={{ background: WHITE, borderBottom: "1px solid #efe5cc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-1.5 py-3 px-2 rounded-2xl cursor-pointer transition-all group"
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
        </div>
      </div>
    </div>
  );
}

// ── treatments carousel ────────────────────────────────────────────────────────
function TreatmentsCarousel() {
  const [idx, setIdx] = useState(0);
  const cols = 4;
  const max = Math.max(0, TREATMENTS.length - cols);

  return (
    <section id="treatments" className="py-20" style={{ background: CREAM2 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
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
              treatment by MDS specialists with the latest technology.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              disabled={idx === 0}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition disabled:opacity-30 text-gray-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-gray-400 font-medium">
              {idx + 1}–{Math.min(idx + cols, TREATMENTS.length)} /{" "}
              {TREATMENTS.length}
            </span>
            <button
              onClick={() => setIdx((i) => Math.min(max, i + 1))}
              disabled={idx >= max}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-orange-400 hover:text-orange-500 transition disabled:opacity-30 text-gray-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${idx} * (100% / ${cols} + 16px / ${cols})))`,
            }}
          >
            {TREATMENTS.map((t) => {
              const Icon = t.icon;
              return (
                <a
                  key={t.label}
                  href="#book"
                  style={{
                    width: `calc((100% - ${(cols - 1) * 16}px) / ${cols})`,
                    minWidth: "210px",
                  }}
                  className="shrink-0 group bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-200 relative cursor-pointer"
                >
                  {t.popular && (
                    <span
                      className="absolute -top-2 -right-2 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase text-white"
                      style={{ background: OR }}
                    >
                      Popular
                    </span>
                  )}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "#fff0e8" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: OR }} />
                  </div>
                  <div>
                    <h3
                      className="font-bold text-gray-900 text-sm leading-snug"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {t.label}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <span className="font-bold text-sm" style={{ color: OR }}>
                      {t.price}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? 22 : 8,
                height: 8,
                background: i === idx ? OR : "#ddd",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── main app ──────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [revIdx, setRevIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedDoctorBio, setExpandedDoctorBio] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const maxRev = REVIEWS.length - 3;

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{ background: CREAM2, fontFamily: "Inter, sans-serif" }}
    >
      {/* ── top strip ─────────────────────────────────────────────────────── */}
      <div
        className="hidden lg:block"
        style={{ background: "#fff8f2", borderBottom: "1px solid #ffe0cc" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-2 text-xs text-gray-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" style={{ color: OR }} /> All 7 days: 9
              AM–9 PM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" style={{ color: OR }} /> Whitefield,
              Bengaluru
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${C.phone}`}
              className="flex items-center gap-1.5 hover:text-orange-500 transition-colors"
            >
              <Phone className="w-3 h-3" style={{ color: OR }} /> {C.phone}
            </a>
            <a
              href={`https://wa.me/${C.wa}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-green-500" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── navbar ────────────────────────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
        style={{ borderBottom: "1px solid #f0e0d0" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-[64px] gap-3">
          {/* logo */}
          <a href="#" className="flex items-center gap-2.5 mr-3 shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg text-white"
              style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
            >
              D
            </div>
            <div>
              <div
                className="font-extrabold text-gray-900 text-lg leading-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Dentelope
              </div>
              <div
                className="text-[9px] font-semibold tracking-widest uppercase mt-0.5"
                style={{ color: OR }}
              >
                Dental Clinic · Whitefield
              </div>
            </div>
          </a>

          {/* desktop nav — mirrors Clove Dental nav items exactly */}
          <nav className="hidden xl:flex items-center flex-1 text-sm font-medium text-gray-600">
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
                      <a
                        key={s}
                        href="#"
                        className="block px-5 py-2.5 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* search icon */}
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

        {/* mobile menu */}
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
                    <a
                      key={s}
                      href="#"
                      className="block pl-4 py-2 text-sm text-gray-500 hover:text-orange-500"
                    >
                      {s}
                    </a>
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

      {/* ── hero carousel ─────────────────────────────────────────────────── */}
      <HeroCarousel />

      {/* ── features strip ────────────────────────────────────────────────── */}
      <FeaturesStrip />

      {/* ── google rating bar ─────────────────────────────────────────────── */}
      <div style={{ background: WHITE, borderBottom: "1px solid #efe5cc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png"
              alt="Google"
              className="h-6 opacity-80"
            />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-extrabold text-2xl text-gray-900"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {C.rating}
                </span>
                <Stars count={5} size={5} />
              </div>
              <p className="text-xs text-gray-500">
                {C.reviews} verified patient reviews
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            {[
              { icon: Users, v: C.patients, l: "Patients Treated" },
              { icon: ThumbsUp, v: C.years + " Yrs", l: "Of Excellence" },
              { icon: BadgeCheck, v: "15+", l: "Specialist Doctors" },
            ].map(({ icon: Icon, v, l }) => (
              <div key={l} className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "#fff0e8" }}
                >
                  <Icon className="w-5 h-5" style={{ color: OR }} />
                </div>
                <div>
                  <div
                    className="font-extrabold text-gray-900 text-base leading-tight"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {v}
                  </div>
                  <div className="text-xs text-gray-500">{l}</div>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#book"
            className="text-sm font-bold text-white px-5 py-2.5 rounded-xl transition hover:opacity-90 flex items-center gap-2"
            style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
          >
            <Calendar className="w-4 h-4" /> Book Free Consultation
          </a>
        </div>
      </div>

      {/* ── hero + form split ─────────────────────────────────────────────── */}
      <section id="book" className="py-16" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-start">
          {/* left */}
          <div className="space-y-7">
            <div>
              <OrangePill>Whitefield's Most Trusted Clinic</OrangePill>
              <h2
                className="mt-4 text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Best Dental Clinic
                <br />
                in <span style={{ color: OR }}>Whitefield</span>
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                Advanced, pain-free dentistry by specialist doctors — from
                routine check-ups to complete smile transformations. Trusted by{" "}
                {C.patients} families.
              </p>
            </div>

            {/* address/timing cards */}
            <div className="space-y-3">
              {[
                { icon: MapPin, l: "Our Location", v: C.address },
                {
                  icon: Clock,
                  l: "Working Hours",
                  v: "Open all 7 days: 9:00 AM – 9:00 PM",
                },
                { icon: Phone, l: "Phone & WhatsApp", v: C.phone },
              ].map(({ icon: Icon, l, v }) => (
                <div
                  key={l}
                  className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#fff0e8" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: OR }} />
                  </div>
                  <div>
                    <p
                      className="font-bold text-gray-900 text-sm"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {l}
                    </p>
                    <p className="text-gray-500 text-sm mt-0.5 whitespace-pre-line">
                      {v}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${C.wa}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3.5 rounded-xl transition text-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <a
                href={`tel:${C.phone}`}
                className="flex items-center gap-2 font-bold px-6 py-3.5 rounded-xl border transition text-sm"
                style={{
                  color: OR,
                  borderColor: `${OR}55`,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>

            {/* trust chips */}
            <div className="flex flex-wrap gap-2">
              {[
                "Quality Care",
                "Pain-Free Tech",
                "0% EMI",
                "Free Consultation",
                "Safe Clinical Standards",
              ].map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                  style={{
                    background: WHITE,
                    borderColor: "#e0d0c0",
                    color: GRAY,
                  }}
                >
                  ✓ {chip}
                </span>
              ))}
            </div>
          </div>

          {/* right: booking form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b" style={{ background: OR }}>
              <p className="text-white/80 text-xs font-semibold tracking-widest uppercase">
                ✦ Zero Cost First Visit ✦
              </p>
              <h3
                className="text-xl font-extrabold text-white mt-0.5"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Book Your Appointment
              </h3>
              <p className="text-white/70 text-xs mt-0.5">
                Slots fill up fast — confirm yours today
              </p>
            </div>
            <div className="p-6">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── treatments carousel ───────────────────────────────────────────── */}
      <TreatmentsCarousel />

      {/* ── why Dentelope ─────────────────────────────────────────────────── */}
      <section id="why-us" className="py-20" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* image side */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1777444969135-caf869407707?w=720&h=800&fit=crop&auto=format"
                  alt="Dentelope specialist reviewing X-ray"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "500px" }}
                />
              </div>
              {/* floating review card */}
              <div className="absolute -right-4 bottom-10 bg-white border border-gray-100 rounded-2xl shadow-xl p-5 max-w-[220px]">
                <Stars count={5} size={3} />
                <p className="text-xs text-gray-700 mt-2 leading-snug">
                  "Truly painless. The best dental experience I've had
                  anywhere."
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5">
                  — Kiran D., Whitefield
                </p>
              </div>
              {/* patient count chip */}
              <div
                className="absolute -left-4 top-10 rounded-2xl px-5 py-4 shadow-xl border border-orange-100"
                style={{ background: OR }}
              >
                <div
                  className="text-2xl font-extrabold text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  10,000+
                </div>
                <div className="text-xs text-white/80 mt-0.5">
                  Smiles Transformed
                </div>
              </div>
            </div>

            {/* content side */}
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
                  never feel intimidating. Here's why patients drive across
                  Bengaluru to visit us.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {WHY.map((w) => (
                  <div
                    key={w.title}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <h4
                      className="font-bold text-gray-900 text-sm mt-2 mb-1"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {w.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {w.desc}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="#book"
                className="inline-flex items-center gap-2 text-white font-bold px-7 py-4 rounded-xl transition hover:opacity-90 text-sm"
                style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── doctors ───────────────────────────────────────────────────────── */}
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
              committed to extraordinary results and genuine patient comfort.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 justify-center">
            {DOCTORS.map((d) => {
              const isExpanded = expandedDoctorBio === d.name;
              return (
                <div
                  key={d.name}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 max-w-4xl mx-auto w-full"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    <div className="sm:w-80 h-64 sm:h-auto overflow-hidden bg-gray-50 shrink-0">
                      <img
                        src={d.img}
                        alt={d.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex-1">
                      <h3
                        className="font-extrabold text-gray-900 text-xl leading-snug"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {d.name}
                      </h3>
                      <p
                        className="font-semibold text-sm mt-2"
                        style={{ color: OR }}
                      >
                        {d.role}
                      </p>
                      <p
                        className={`mt-4 text-gray-600 text-sm leading-relaxed ${isExpanded ? "" : "line-clamp-3"}`}
                      >
                        {d.bio}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedDoctorBio(isExpanded ? null : d.name)
                        }
                        className="mt-2 text-sm font-semibold underline underline-offset-2 cursor-pointer"
                        style={{ color: OR }}
                      >
                        {isExpanded ? "less" : "more"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── reviews ───────────────────────────────────────────────────────── */}
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
                  {C.rating}/5 · {C.reviews} Google reviews
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

          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(-${revIdx} * (100% / 3 + 20px / 3)))`,
              }}
            >
              {REVIEWS.map((r) => (
                <div
                  key={r.name}
                  style={{
                    width: "calc((100% - 40px) / 3)",
                    minWidth: "280px",
                  }}
                  className="shrink-0 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
                >
                  <Stars count={r.rating} size={4} />
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed italic line-clamp-5">
                    "{r.text}"
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
              href="#"
              className="inline-flex items-center gap-2 text-sm font-bold border px-6 py-3 rounded-xl transition hover:bg-orange-50"
              style={{
                color: OR,
                borderColor: `${OR}55`,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Read All {C.reviews} Reviews on Google{" "}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── insurance partners ────────────────────────────────────────────── */}
      <div
        className="py-10 border-y border-gray-100"
        style={{ background: WHITE }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
            Insurance & Payment Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:border-orange-300 hover:text-orange-500 transition-all cursor-pointer bg-white"
              >
                {p}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            + All major credit cards · 0% EMI · Cashless TPA accepted
          </p>
        </div>
      </div>

      {/* ── full CTA section ──────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: OR }}
      >
        {/* subtle pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white space-y-6">
            <h2
              className="text-4xl lg:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Book Your Free
              <br />
              Consultation Today
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              No obligations, no pressure. Just honest advice from a specialist
              who genuinely cares about your long-term oral health.
            </p>
            <div className="space-y-4">
              {[
                { icon: Phone, l: C.phone, s: "Call or WhatsApp anytime" },
                { icon: MapPin, l: "Whitefield, Bengaluru", s: C.address },
                {
                  icon: Clock,
                  l: "All 7 Days: 9 AM–9 PM",
                  s: "Open every day",
                },
              ].map(({ icon: Icon, l, s }) => (
                <div key={l} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{l}</p>
                    <p className="text-white/70 text-xs mt-0.5 whitespace-pre-line">
                      {s}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${C.wa}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl transition text-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
              <a
                href={`tel:${C.phone}`}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold px-5 py-3 rounded-xl transition text-sm"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>

          {/* embedded form on orange */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3
                className="text-xl font-extrabold text-gray-900"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Request a Callback
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                We respond within 30 minutes
              </p>
            </div>
            <div className="p-6">
              <BookingForm compact />
            </div>
          </div>
        </div>
      </section>

      {/* ── blog ─────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: CREAM2 }}>
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

      {/* ── faqs ─────────────────────────────────────────────────────────── */}
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

      {/* ── location ─────────────────────────────────────────────────────── */}
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
                { icon: Clock, l: "All 7 Days", v: "9:00 AM – 9:00 PM" },
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
                <a
                  href="#book"
                  className="flex items-center justify-center gap-2 text-white font-bold py-3 rounded-xl transition hover:opacity-90 text-sm"
                  style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Victorian+View+Layout+Nallurhalli+Whitefield+Bengaluru"
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
                src="https://maps.google.com/maps?q=Victorian+View+Layout+Nallurhalli+Whitefield+Bengaluru+560066&t=&z=15&ie=UTF8&iwloc=&output=embed"
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

      {/* ── final CTA ─────────────────────────────────────────────────────── */}
      <div
        className="py-14"
        style={{ background: CREAM2, borderTop: "1px solid #efe5cc" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="flex justify-center">
            <Stars count={5} size={6} />
          </div>
          <h2
            className="text-3xl lg:text-4xl font-extrabold text-gray-900"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Rated <span style={{ color: OR }}>{C.rating}/5</span> by {C.reviews}
            + Patients in Bengaluru
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Join over {C.patients} happy patients. Book your free first
            consultation — no pressure, no obligations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#book"
              className="flex items-center gap-2 text-white font-extrabold px-8 py-4 rounded-xl transition hover:opacity-90 shadow-lg text-sm"
              style={{
                background: OR,
                fontFamily: "Poppins, sans-serif",
                boxShadow: `0 8px 24px ${OR}44`,
              }}
            >
              <Calendar className="w-4 h-4" /> Book Free Consultation
            </a>
            <a
              href={`tel:${C.phone}`}
              className="flex items-center gap-2 font-bold px-8 py-4 rounded-xl border transition hover:bg-orange-50 text-sm"
              style={{
                color: OR,
                borderColor: `${OR}55`,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <Phone className="w-4 h-4" /> {C.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── footer ────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#1a1a1a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg text-white"
                style={{ background: OR }}
              >
                D
              </div>
              <div>
                <div
                  className="font-extrabold text-white text-lg leading-none"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Dentelope
                </div>
                <div
                  className="text-[9px] font-semibold tracking-widest uppercase mt-0.5"
                  style={{ color: OR }}
                >
                  Dental Clinic
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Advanced, compassionate dental care for the whole family. Serving
              Whitefield, Bengaluru since 2012.
            </p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: OR }}
              >
                Download Our App
              </p>
              <div className="flex gap-2">
                {["App Store", "Google Play"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 hover:border-orange-400 hover:text-orange-400 transition-all"
                  >
                    <Download className="w-3 h-3" style={{ color: OR }} />
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h5
              className="font-bold text-sm mb-5 text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Treatments
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-500">
              {TREATMENTS.slice(0, 8).map((t) => (
                <li key={t.label}>
                  <a
                    href="#treatments"
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: OR }}
                    />
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className="font-bold text-sm mb-5 text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs text-gray-500">
              {[
                "About Dentelope",
                "Our Specialist Doctors",
                "Patient Reviews",
                "Book Appointment",
                "EMI & Insurance",
                "Dental Blog",
                "Careers",
                "Contact Us",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: OR }}
                    />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className="font-bold text-sm mb-5 text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Contact
            </h5>
            <ul className="space-y-4 text-xs text-gray-500">
              {[
                { icon: MapPin, v: C.address },
                { icon: Phone, v: C.phone },
                { icon: MessageCircle, v: "WhatsApp Us" },
                { icon: Clock, v: "All 7 days: 9AM–9PM" },
              ].map(({ icon: Icon, v }, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Icon
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: OR }}
                  />
                  <span className="whitespace-pre-line leading-relaxed">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Dentelope Dental Clinic, Whitefield,
              Bengaluru. All rights reserved.
            </p>
            <div className="flex gap-5 text-xs text-gray-600">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="hover:text-orange-400 transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── floating WhatsApp ─────────────────────────────────────────────── */}
      <a
        href={`https://wa.me/${C.wa}`}
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
