import { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { fetchHoldings, fetchCapitalGains } from './api/mockData'
import { Holding, CapitalGains } from './types'

function App() {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [initialCapitalGains, setInitialCapitalGains] = useState<CapitalGains | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ])
        setHoldings(holdingsData)
        setInitialCapitalGains(gainsData.capitalGains)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading data...</div>
  }

  if (!initialCapitalGains) {
    return <div className="min-h-screen flex items-center justify-center">Failed to load capital gains</div>
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8 flex justify-center">
      <div className="w-full max-w-7xl">
        <Dashboard holdings={holdings} initialCapitalGains={initialCapitalGains} />
      </div>
    </div>
  )
}

export default App
