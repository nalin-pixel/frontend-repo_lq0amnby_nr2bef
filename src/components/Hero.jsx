import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays for glassy vibe - don't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950" />

      <div className="relative z-10 mx-auto flex h-[60vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
          Microcredit Intelligence
        </span>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Clean Dashboard for Microcredit Companies
        </h1>
        <p className="max-w-2xl text-balance text-slate-300">
          Monitor portfolios, risk, and growth across markets with a minimalist, glass-morphic fintech aesthetic.
        </p>
      </div>
    </section>
  );
}

export default Hero;
