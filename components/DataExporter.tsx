'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

type EntryType = {
  id: string
  amount: number
  description: string
  category: string
  date: string
  type: 'income' | 'expense'
}

type DataExporterProps = {
  entries: EntryType[]
}

const DataExporter: React.FC<DataExporterProps> = ({ entries }) => {
  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount']
    const csvContent = [
      headers.join(','),
      ...entries.map(entry => 
        [entry.date, entry.type, entry.category, entry.description, entry.amount].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'financial_data.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <Button onClick={exportToCSV}>Export to CSV</Button>
  )
}

export default DataExporter