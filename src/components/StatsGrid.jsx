import { TrendingUp, Users, Globe2, Wallet } from 'lucide-react'

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-cyan-300 ring-1 ring-white/20">
          <Icon size={22} />
        </div>
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          {sub && <p className="text-xs text-slate-400">{sub}</p>}
        </div>
      </div>
    </div>
  )
}

function StatsGrid({ stats }) {
  const formatMoney = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n || 0)

  return (
    <section className="relative mx-auto -mt-16 max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Wallet} label="Total Portfolio" value={formatMoney(stats?.total_portfolio_usd || 0)} sub={`${stats?.total_companies || 0} companies`} />
        <StatCard icon={Users} label="Active Borrowers" value={(stats?.active_borrowers || 0).toLocaleString()} />
        <StatCard icon={TrendingUp} label="Avg. PAR30" value={`${stats?.avg_par30 || 0}%`} />
        <StatCard icon={Globe2} label="Markets" value={stats?.countries_count || 0} />
      </div>
    </section>
  )
}

export default StatsGrid
