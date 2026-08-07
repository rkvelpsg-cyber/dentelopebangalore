export default function DoctorDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf8f3]">
      <div className="text-center max-w-md mx-auto px-6 py-16">
        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-orange-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-3-3v6M12 3a9 9 0 100 18A9 9 0 0012 3z"
            />
          </svg>
        </div>
        <h1
          className="text-3xl font-extrabold text-gray-900 mb-3"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Doctor Dashboard
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-4">
          We&apos;re building something great here. The full dashboard for
          managing and monitoring patient records is coming soon.
        </p>
        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold px-5 py-2.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          More details will be available soon
        </div>
        <p className="mt-6 text-xs text-gray-400">
          For urgent access, please contact the clinic admin.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-lg transition hover:opacity-90"
          style={{ background: "#e85d1a", fontFamily: "Poppins, sans-serif" }}
        >
          ← Back to Home Page
        </a>
      </div>
    </div>
  );
}
