'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type EntryType = {
  id: string
  amount: number
  description: string
  category: string
  date: string
  type: 'income' | 'expense'
}

type DetailedFinancialReportProps = {
  entries: EntryType[]
}

const DetailedFinancialReport: React.FC<DetailedFinancialReportProps> = ({ entries }) => {
  const monthlyData = entries.reduce((acc, entry) => {
    const date = new Date(entry.date)
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
    if (!acc[monthYear]) {
      acc[monthYear] = { income: 0, expense: 0 }
    }
    acc[monthYear][entry.type] += entry.amount
    return acc
  }, {} as Record<string, { income: number; expense: number }>)

  const chartData = Object.entries(monthlyData).map(([date, data]) => ({
    date,
    income: data.income,
    expense: data.expense,
    balance: data.income - data.expense,
  }))

  const totalIncome = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0)
  const totalExpense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalExpense.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#8884d8" />
                <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
                <Line type="monotone" dataKey="balance" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailedFinancialReport