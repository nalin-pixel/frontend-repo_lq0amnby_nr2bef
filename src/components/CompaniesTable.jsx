import { useEffect, useMemo, useState } from 'react'
import { Search, Filter } from 'lucide-react'

function CompaniesTable() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [country, setCountry] = useState('')
  const [status, setStatus] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    const controller = new AbortController()
    async function fetchData() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (q) params.set('q', q)
        if (country) params.set('country', country)
        if (status) params.set('status', status)
        const res = await fetch(`${backend}/api/companies?${params.toString()}`, { signal: controller.signal })
        const json = await res.json()
        setData(json)
      } catch (e) {
        if (e.name !== 'AbortError') console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => controller.abort()
  }, [q, country, status, backend])

  const countries = useMemo(() => Array.from(new Set(data.map(d => d.country))).filter(Boolean).sort(), [data])
  const statuses = ['active', 'suspended', 'closed']

  return (
    <section className="mx-auto my-10 max-w-7xl px-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search companies..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          />
        </div>
        <div className="flex gap-3">
          <select value={country} onChange={(e)=>setCountry(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
            <option value="">All Countries</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
            <option value="">All Status</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <table className="w-full text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Portfolio</th>
              <th className="px-4 py-3">Borrowers</th>
              <th className="px-4 py-3">PAR30</th>
              <th className="px-4 py-3">Rate</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="px-4 py-6 text-center text-slate-400">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan="7" className="px-4 py-6 text-center text-slate-400">No companies found</td></tr>
            ) : (
              data.map((c) => (
                <tr key={c.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 font-medium text-white">{c.name}</td>
                  <td className="px-4 py-3">{c.country}</td>
                  <td className="px-4 py-3">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(c.portfolio_usd || 0)}</td>
                  <td className="px-4 py-3">{(c.active_borrowers || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">{(c.par30 || 0).toFixed(2)}%</td>
                  <td className="px-4 py-3">{(c.avg_interest_rate || 0).toFixed(1)}%</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${c.status === 'active' ? 'bg-green-500/20 text-green-300' : c.status === 'suspended' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{c.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CompaniesTable
