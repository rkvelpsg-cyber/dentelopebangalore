"use client";

import { useState, useEffect } from "react";
import { X, Calendar, CheckCircle } from "lucide-react";

const OR = "#e8531a";
const DOCTOR_WA = "918073762560";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultTreatment?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultTreatment = "",
}: Props) {
  const [form, setForm] = useState({
    name: "",
    sex: "",
    phone: "",
    email: "",
    address: "",
    treatment: defaultTreatment,
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // sync defaultTreatment when modal opens for a different treatment
  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, treatment: defaultTreatment }));
      setSubmitted(false);
    }
  }, [isOpen, defaultTreatment]);

  // prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const set = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      `📅 *New Appointment Request — Dentelope*\n\n` +
      `👤 *Name:* ${form.name}\n` +
      `⚥ *Sex:* ${form.sex}\n` +
      `📞 *Contact:* ${form.phone}\n` +
      `📧 *Email:* ${form.email}\n` +
      `🏠 *Address:* ${form.address}\n` +
      `🦷 *Treatment:* ${form.treatment}\n` +
      `📝 *Details:* ${form.details || "—"}`;
    window.open(
      `https://wa.me/${DOCTOR_WA}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
        {/* modal header */}
        <div
          className="px-6 py-5 flex items-center justify-between rounded-t-3xl"
          style={{ background: OR }}
        >
          <div>
            <p className="text-white/75 text-xs font-semibold uppercase tracking-widest">
              Dentelope Advanced Dental Care
            </p>
            <h3
              className="text-xl font-extrabold text-white mt-0.5"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Book Appointment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "#fff0e8" }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: OR }} />
            </div>
            <h4
              className="text-lg font-bold text-gray-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Appointment Request Sent!
            </h4>
            <p className="text-sm text-gray-500 max-w-xs">
              Your details have been sent to our team via WhatsApp. We will call
              you shortly to confirm your slot.
            </p>
            <button
              onClick={onClose}
              className="mt-2 text-sm font-bold text-white px-8 py-3 rounded-xl hover:opacity-90 transition"
              style={{ background: OR }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* name */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Full Name <span style={{ color: OR }}>*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* sex */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Sex <span style={{ color: OR }}>*</span>
              </label>
              <select
                required
                value={form.sex}
                onChange={(e) => set("sex", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* contact */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Contact Number <span style={{ color: OR }}>*</span>
              </label>
              <input
                required
                type="tel"
                placeholder="+91 80737 62560"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* email */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* address */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Address
              </label>
              <input
                type="text"
                placeholder="Your locality / area"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* treatment */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Treatment Enquiry <span style={{ color: OR }}>*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Dental Implants, Teeth Whitening…"
                value={form.treatment}
                onChange={(e) => set("treatment", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            {/* additional details */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Additional Details
              </label>
              <textarea
                rows={3}
                placeholder="Any specific concerns or questions…"
                value={form.details}
                onChange={(e) => set("details", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition"
              style={{ background: OR, fontFamily: "Poppins, sans-serif" }}
            >
              <Calendar className="w-4 h-4" /> Send Appointment Request
            </button>
            <p className="text-center text-xs text-gray-400">
              Sent securely via WhatsApp · No charges · Quick response
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
