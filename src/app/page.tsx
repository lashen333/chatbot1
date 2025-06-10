export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Section 1: Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-[#dd1082] to-[#6a00f4] text-white flex items-center justify-center text-center px-6 py-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold leading-tight">Crack the Conversion Code 🚀</h1>
          <p className="mt-6 text-lg text-white/90">
            Aenigm3 Labs uses AI to turn your traffic into sales. No fluff — just real CRO results.
          </p>
          <button className="mt-8 px-6 py-3 bg-white text-[#dd1082] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all">
            Get a Free CRO Audit
          </button>
        </div>
        <div className="absolute bottom-4 w-full text-center text-sm text-white/60">Scroll to learn more ↓</div>
      </section>

      {/* Section 2: Features Section */}
      <section className="bg-white text-gray-900 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose Aenigm3 Labs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Audits</h3>
              <p className="text-gray-700">Our intelligent systems identify friction points in your funnel and suggest improvements instantly.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">A/B Testing on Autopilot</h3>
              <p className="text-gray-700">We run continuous experiments to find what converts best so you don’t have to guess.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Funnel Optimization</h3>
              <p className="text-gray-700">We design and refine your landing pages to convert more visitors into customers.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
