'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DetailedFinancialReport from '@/components/DetailedFinancialReport'
import DataExporter from '@/components/DataExporter'

type EntryType = {
  id: string
  amount: number
  description: string
  category: string
  date: string
  type: 'income' | 'expense'
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [entries, setEntries] = useState<EntryType[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchEntries()
    }
  }, [status, router])

  const fetchEntries = async () => {
    const response = await fetch('/api/entries')
    if (response.ok) {
      const data = await response.json()
      setEntries(data)
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>
      <DetailedFinancialReport entries={entries} />
      <DataExporter entries={entries} />
    </div>
  )
}