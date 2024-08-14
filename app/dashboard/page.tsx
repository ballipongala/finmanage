'use client'

import DashboardChart from '@/components/DashboardChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data - replace with actual data fetching logic
const incomeData = [
  { name: 'Salary', value: 5000 },
  { name: 'Investments', value: 1000 },
  { name: 'Freelance', value: 800 },
]

const expenseData = [
  { name: 'Rent', value: 1500 },
  { name: 'Groceries', value: 500 },
  { name: 'Utilities', value: 300 },
  { name: 'Entertainment', value: 200 },
]

export default function DashboardPage() {
  const totalIncome = incomeData.reduce((sum, item) => sum + item.value, 0)
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalIncome}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalExpenses}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardChart data={incomeData} title="Income Breakdown" />
        <DashboardChart data={expenseData} title="Expense Breakdown" />
      </div>
    </div>
  )
}