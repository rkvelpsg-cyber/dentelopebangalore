"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    treatment: "Teeth Cleaning",
    image:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1903&h=597&fit=crop&auto=format",
    alt: "Professional dental cleaning with mirror and tool",
    headline: "Professional\nTeeth Cleaning",
    sub: "Remove plaque, tartar, and stains with a thorough professional clean — the foundation of lasting oral health.",
    cta: "Book a Cleaning",
    ctaSecondary: "Learn More",
    treatmentHref: "/treatments/teeth-cleaning",
    align: "left",
    accent: "#1a73c8",
  },
  {
    id: 2,
    treatment: "Teeth Whitening",
    image:
      "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?w=1903&h=597&fit=crop&auto=format",
    alt: "Woman with a bright white smile",
    headline: "Radiant\nTeeth Whitening",
    sub: "Achieve a dazzling smile up to 8 shades brighter with our safe, in-clinic whitening treatments.",
    cta: "Whiten My Smile",
    ctaSecondary: "See Results",
    treatmentHref: "/treatments/teeth-whitening",
    align: "right",
    accent: "#c87d1a",
  },
  {
    id: 3,
    treatment: "Dental Implants",
    image:
      "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=1903&h=597&fit=crop&auto=format",
    alt: "Dental implant model showing tooth structure",
    headline: "Permanent\nDental Implants",
    sub: "Restore missing teeth with titanium implants that look, feel, and function just like natural teeth — for life.",
    cta: "Get a Free Assessment",
    ctaSecondary: "How It Works",
    treatmentHref: "/treatments/dental-implants",
    align: "left",
    accent: "#1a73c8",
  },
  {
    id: 4,
    treatment: "Braces & Aligners",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1903&h=597&fit=crop&auto=format",
    alt: "Close-up of dental braces on teeth",
    headline: "Braces &\nClear Aligners",
    sub: "Straighten your smile discreetly and comfortably — traditional braces or invisible aligners tailored to you.",
    cta: "Start Straightening",
    ctaSecondary: "Compare Options",
    treatmentHref: "/treatments/braces-aligners",
    align: "right",
    accent: "#1a8c5a",
  },
  {
    id: 5,
    treatment: "Root Canal (RCT)",
    image:
      "https://images.unsplash.com/photo-1777793389944-f7165259a05c?w=1903&h=597&fit=crop&auto=format",
    alt: "Dentist showing a model of a tooth",
    headline: "Pain-Free\nRoot Canal (RCT)",
    sub: "Save your natural tooth with a precise, comfortable root canal procedure. Modern RCT is quick and virtually painless.",
    cta: "Book a Consultation",
    ctaSecondary: "Know More",
    treatmentHref: "/treatments/root-canal",
    align: "left",
    accent: "#c8471a",
  },
  {
    id: 6,
    treatment: "Smile Makeover",
    image:
      "https://images.unsplash.com/photo-1776400985210-92f654712d30?w=1903&h=597&fit=crop&auto=format",
    alt: "Woman before and after dental cosmetic improvements",
    headline: "Total\nSmile Makeover",
    sub: "Combine whitening, veneers, and reshaping into one comprehensive plan designed around your unique smile goals.",
    cta: "Design My Smile",
    ctaSecondary: "View Transformations",
    treatmentHref: "/treatments/smile-makeover",
    align: "center",
    accent: "#8c1ac8",
  },
  {
    id: 7,
    treatment: "Kids Dentistry",
    image:
      "https://images.unsplash.com/photo-1631051103633-24959376b92d?w=1903&h=597&fit=crop&auto=format",
    alt: "Child at the dentist",
    headline: "Gentle\nKids Dentistry",
    sub: "A friendly, fun environment where children feel safe — building healthy dental habits that last a lifetime.",
    cta: "Book for My Child",
    ctaSecondary: "Our Approach",
    treatmentHref: "/treatments/kids-dentistry",
    align: "left",
    accent: "#1a8c5a",
  },
  {
    id: 8,
    treatment: "Gum Treatment",
    image:
      "https://images.unsplash.com/photo-1664529845836-433c172142ca?w=1903&h=597&fit=crop&auto=format",
    alt: "Close-up of mouth showing gums",
    headline: "Advanced\nGum Treatment",
    sub: "Treat gum disease, bleeding gums, and recession with specialized periodontal therapy that protects your smile.",
    cta: "Treat My Gums",
    ctaSecondary: "Learn More",
    treatmentHref: "/treatments/gum-treatment",
    align: "right",
    accent: "#1a73c8",
  },
  {
    id: 9,
    treatment: "Tooth Extraction",
    image:
      "https://images.unsplash.com/photo-1655149141574-dee136cc76b9?w=1903&h=597&fit=crop&auto=format",
    alt: "Dental extraction procedure",
    headline: "Safe &\nComfortable Extractions",
    sub: "When a tooth must go, our gentle technique and local anaesthesia ensure a smooth, stress-free experience.",
    cta: "Get an Appointment",
    ctaSecondary: "What to Expect",
    treatmentHref: "/treatments/tooth-extraction",
    align: "left",
    accent: "#c8471a",
  },
  {
    id: 10,
    treatment: "Veneers & Crowns",
    image:
      "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?w=1903&h=597&fit=crop&auto=format",
    alt: "Close-up of perfectly white teeth with veneers",
    headline: "Veneers &\nDental Crowns",
    sub: "Ultra-thin porcelain veneers and precision crowns crafted to restore shape, colour, and confidence in your smile.",
    cta: "Explore Veneers",
    ctaSecondary: "View Gallery",
    treatmentHref: "/treatments/veneers-crowns",
    align: "right",
    accent: "#c87d1a",
  },
];

export default function HeroCarousel({
  onBookClick,
}: {
  onBookClick?: () => void;
}) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (fading || index === current) return;
      setFading(true);
      setTimeout(() => {
        setCurrent(index);
        setFading(false);
      }, 380);
    },
    [current, fading],
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current % slides.length];
  const isRight = slide.align === "right";
  const isCenter = slide.align === "center";
  const contentAlign = isRight
    ? "flex-end"
    : isCenter
      ? "center"
      : "flex-start";
  const textAlign: "right" | "center" | "left" = isRight
    ? "right"
    : isCenter
      ? "center"
      : "left";

  const gradient = isRight
    ? "linear-gradient(to left, rgba(5,20,50,0.90) 0%, rgba(5,20,50,0.55) 42%, transparent 72%)"
    : isCenter
      ? "linear-gradient(to top, rgba(5,20,50,0.92) 0%, rgba(5,20,50,0.45) 55%, transparent 100%)"
      : "linear-gradient(to right, rgba(5,20,50,0.92) 0%, rgba(5,20,50,0.55) 42%, transparent 75%)";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1903,
        height: 597,
        overflow: "hidden",
        background: "#0a1628",
        fontFamily: "system-ui, sans-serif",
      }}
      className="carousel-root"
    >
      <style>{`
        @media (max-width: 640px) {
          .carousel-root { height: 520px !important; }
          .carousel-content { padding: 0 20px 40px !important; }
          .carousel-buttons { flex-wrap: wrap !important; gap: 8px !important; }
          .carousel-btn-primary, .carousel-btn-secondary {
            padding: 10px 16px !important;
            font-size: 0.78rem !important;
            flex: 1 1 auto !important;
            text-align: center !important;
            justify-content: center !important;
          }
          .carousel-headline { font-size: 1.7rem !important; }
          .carousel-sub { font-size: 0.82rem !important; }
        }
      `}</style>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: i === current ? 1 : 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 700ms ease",
          }}
        >
          <img
            src={s.image}
            alt={s.alt}
            loading={i === 0 ? "eager" : "lazy"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{ position: "absolute", inset: 0, background: gradient }}
          />
        </div>
      ))}

      {/* Text overlay */}
      <div
        className="carousel-content"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: contentAlign,
          padding: "0 72px 56px",
          opacity: fading ? 0 : 1,
          transition: "opacity 350ms ease",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 580,
            textAlign,
            alignItems: contentAlign,
          }}
        >
          {/* Treatment tag */}
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.13)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#fff",
              width: "fit-content",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: slide.accent,
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {slide.treatment}
          </span>

          {/* Headline */}
          <h2
            className="carousel-headline"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2rem, 3.4vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              color: "#fff",
              whiteSpace: "pre-line",
              textShadow: "0 2px 20px rgba(0,0,0,0.4)",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {slide.headline}
          </h2>

          {/* Subtext */}
          <p
            className="carousel-sub"
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontSize: "clamp(0.88rem, 1.05vw, 1.05rem)",
              fontWeight: 300,
              color: "rgba(215,230,255,0.88)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 440,
            }}
          >
            {slide.sub}
          </p>

          {/* Buttons */}
          <div
            className="carousel-buttons"
            style={{
              display: "flex",
              gap: 12,
              justifyContent: contentAlign,
              marginTop: 6,
            }}
          >
            <a
              href="#"
              className="carousel-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onBookClick?.();
              }}
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "0.87rem",
                letterSpacing: "0.04em",
                color: "#fff",
                background: slide.accent,
                border: "none",
                borderRadius: 4,
                padding: "12px 28px",
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                boxShadow: `0 4px 18px ${slide.accent}77`,
              }}
            >
              {slide.cta}
            </a>
            <a
              href={slide.treatmentHref}
              className="carousel-btn-secondary"
              style={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: "0.87rem",
                letterSpacing: "0.04em",
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                border: "1.5px solid rgba(255,255,255,0.4)",
                borderRadius: 4,
                padding: "12px 28px",
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                backdropFilter: "blur(6px)",
              }}
            >
              {slide.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.13)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          color: "#fff",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.13)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          color: "#fff",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* 10 dots */}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
      >
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to ${s.treatment}`}
            title={s.treatment}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              border: "none",
              cursor: "pointer",
              padding: 0,
              background:
                i === current
                  ? slides[current % slides.length].accent
                  : "rgba(255,255,255,0.38)",
              transition: "width 0.35s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 36,
          zIndex: 20,
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "0.72rem",
          fontWeight: 500,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.1em",
        }}
      >
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 3,
          zIndex: 20,
          width: `${((current + 1) / slides.length) * 100}%`,
          background: slide.accent,
          transition: "width 0.5s ease, background 0.5s ease",
          borderRadius: "0 2px 0 0",
        }}
      />
    </div>
  );
}
