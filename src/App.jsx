import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import StatsGrid from './components/StatsGrid'
import CompaniesTable from './components/CompaniesTable'

function App() {
  const [stats, setStats] = useState(null)
  const backend = import.meta.env.VITE_BACKEND_URL || ''

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const res = await fetch(`${backend}/api/companies/stats`)
        const json = await res.json()
        if (!ignore) setStats(json)
      } catch (e) {
        console.error(e)
      }
    }
    load()
    return () => { ignore = true }
  }, [backend])

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <StatsGrid stats={stats} />
      <CompaniesTable />
    </div>
  )
}

export default App
