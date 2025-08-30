"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

interface TimeEntry {
  id: number
  date: string
  startTime: string
  endTime: string
  breakMinutes: number
}

export default function TimeCardCalculatorPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: 1, date: "", startTime: "", endTime: "", breakMinutes: 0 },
  ])
  const [hourlyRate, setHourlyRate] = useState("")
  const [results, setResults] = useState<{
    totalHours: number
    regularHours: number
    overtimeHours: number
    totalPay: number
    regularPay: number
    overtimePay: number
    dailyBreakdown: Array<{
      date: string
      hours: number
      pay: number
    }>
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const addEntry = () => {
    const newId = Math.max(...entries.map((e) => e.id)) + 1
    setEntries([...entries, { id: newId, date: "", startTime: "", endTime: "", breakMinutes: 0 }])
  }

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id))
    }
  }

  const updateEntry = (id: number, field: keyof TimeEntry, value: string | number) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)))
  }

  const calculateTimeCard = () => {
    try {
      let totalMinutes = 0
      const dailyBreakdown: Array<{ date: string; hours: number; pay: number }> = []

      for (const entry of entries) {
        if (!entry.date || !entry.startTime || !entry.endTime) {
          continue // Skip incomplete entries
        }

        const start = new Date(`${entry.date}T${entry.startTime}:00`)
        const end = new Date(`${entry.date}T${entry.endTime}:00`)

        if (end <= start) {
          end.setDate(end.getDate() + 1) // Next day
        }

        const workMinutes = (end.getTime() - start.getTime()) / (1000 * 60) - entry.breakMinutes
        const workHours = workMinutes / 60

        if (workHours > 0) {
          totalMinutes += workMinutes
          dailyBreakdown.push({
            date: entry.date,
            hours: Number(workHours.toFixed(2)),
            pay: 0, // Will be calculated later
          })
        }
      }

      const totalHours = totalMinutes / 60
      const regularHours = Math.min(totalHours, 40) // Standard 40-hour work week
      const overtimeHours = Math.max(0, totalHours - 40)

      const rate = Number.parseFloat(hourlyRate) || 0
      const regularPay = regularHours * rate
      const overtimePay = overtimeHours * rate * 1.5 // Time and a half
      const totalPay = regularPay + overtimePay

      // Update daily breakdown with pay
      dailyBreakdown.forEach((day) => {
        day.pay = Number((day.hours * rate).toFixed(2))
      })

      setResults({
        totalHours: Number(totalHours.toFixed(2)),
        regularHours: Number(regularHours.toFixed(2)),
        overtimeHours: Number(overtimeHours.toFixed(2)),
        totalPay: Number(totalPay.toFixed(2)),
        regularPay: Number(regularPay.toFixed(2)),
        overtimePay: Number(overtimePay.toFixed(2)),
        dailyBreakdown,
        formula: `${entries.filter((e) => e.date && e.startTime && e.endTime).length} work days calculated`,
      })
    } catch (error) {
      alert("Invalid input. Please check your time entries.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setEntries([{ id: 1, date: "", startTime: "", endTime: "", breakMinutes: 0 }])
    setHourlyRate("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Clock className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Time Card Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate total work hours from multiple time card entries with MaiCalcs. Perfect for payroll
              calculations, time tracking, and work hour management.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>Time Card Entries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {entries.map((entry, index) => (
                    <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Day {index + 1}</span>
                        {entries.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEntry(entry.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Date</Label>
                          <Input
                            type="date"
                            value={entry.date}
                            onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Break (min)</Label>
                          <Input
                            type="number"
                            value={entry.breakMinutes}
                            onChange={(e) => updateEntry(entry.id, "breakMinutes", Number(e.target.value) || 0)}
                            className="text-sm"
                            min="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Start Time</Label>
                          <Input
                            type="time"
                            value={entry.startTime}
                            onChange={(e) => updateEntry(entry.id, "startTime", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">End Time</Label>
                          <Input
                            type="time"
                            value={entry.endTime}
                            onChange={(e) => updateEntry(entry.id, "endTime", e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={addEntry} variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Day
                </Button>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="0.00"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Calculation Rules:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Regular hours: First 40 hours</p>
                    <p>• Overtime: Hours beyond 40 (1.5x rate)</p>
                    <p>• Break time is deducted</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 5 days × 8 hours = 40 hours regular</p>
                    <p>• 45 total hours = 40 regular + 5 OT</p>
                    <p>• 30 min break = -0.5 hours per day</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTimeCard} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-violet-600" />
                  <span>Time Card Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Hours:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.totalHours}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalHours.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Regular Hours:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.regularHours}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.regularHours.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Overtime Hours:</span>
                        <span className="text-xl font-bold text-violet-600 font-mono">{results.overtimeHours}</span>
                      </div>
                    </div>

                    {hourlyRate && (
                      <>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Total Pay:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-blue-600 font-mono">${results.totalPay}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(`$${results.totalPay}`)}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-emerald-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Regular Pay:</span>
                            <span className="text-lg font-bold text-emerald-600 font-mono">${results.regularPay}</span>
                          </div>
                        </div>

                        <div className="bg-amber-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Overtime Pay:</span>
                            <span className="text-lg font-bold text-amber-600 font-mono">${results.overtimePay}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {results.dailyBreakdown.length > 0 && (
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <h4 className="font-semibold text-indigo-800 mb-2">Daily Breakdown:</h4>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {results.dailyBreakdown.map((day, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-indigo-700">{day.date}:</span>
                              <span className="text-indigo-700 font-mono">
                                {day.hours}h {hourlyRate && `($${day.pay})`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Overtime rate: 1.5x regular rate</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Weekly payroll calculations</p>
                        <p>• Time sheet management</p>
                        <p>• Labor cost tracking</p>
                        <p>• Employee hour verification</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Add time entries to calculate total work hours</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner />
      </div>

      <Footer />
    </div>
  )
}
