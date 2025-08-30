"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function DaysCalculatorPage() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [operation, setOperation] = useState("between")
  const [daysToAdd, setDaysToAdd] = useState("")
  const [includeWeekends, setIncludeWeekends] = useState("yes")
  const [results, setResults] = useState<{
    totalDays: number
    businessDays: number
    weekends: number
    weeks: number
    months: number
    years: number
    resultDate?: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const calculateDays = () => {
    try {
      if (operation === "between") {
        if (!startDate || !endDate) {
          alert("Please enter both start and end dates.")
          return
        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        if (start > end) {
          alert("Start date must be before end date.")
          return
        }

        const timeDiff = end.getTime() - start.getTime()
        const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

        // Calculate business days and weekends
        let businessDays = 0
        let weekends = 0
        const currentDate = new Date(start)

        while (currentDate <= end) {
          if (isWeekend(currentDate)) {
            weekends++
          } else {
            businessDays++
          }
          currentDate.setDate(currentDate.getDate() + 1)
        }

        const weeks = Math.floor(totalDays / 7)
        const months = Math.round(totalDays / 30.44) // Average days per month
        const years = Math.round(totalDays / 365.25) // Including leap years

        setResults({
          totalDays,
          businessDays,
          weekends,
          weeks,
          months,
          years,
          formula: `From ${startDate} to ${endDate}`,
        })
      } else {
        // Add days to date
        if (!startDate || !daysToAdd) {
          alert("Please enter both start date and number of days.")
          return
        }

        const start = new Date(startDate)
        const days = Number.parseInt(daysToAdd)

        if (isNaN(days)) {
          alert("Please enter a valid number of days.")
          return
        }

        const resultDate = new Date(start)
        let daysAdded = 0

        if (includeWeekends === "no") {
          // Add only business days
          while (daysAdded < Math.abs(days)) {
            resultDate.setDate(resultDate.getDate() + (days > 0 ? 1 : -1))
            if (!isWeekend(resultDate)) {
              daysAdded++
            }
          }
        } else {
          // Add all days
          resultDate.setDate(start.getDate() + days)
        }

        setResults({
          totalDays: Math.abs(days),
          businessDays: includeWeekends === "no" ? Math.abs(days) : 0,
          weekends: 0,
          weeks: Math.floor(Math.abs(days) / 7),
          months: Math.round(Math.abs(days) / 30.44),
          years: Math.round(Math.abs(days) / 365.25),
          resultDate: resultDate.toISOString().split("T")[0],
          formula: `${startDate} ${days > 0 ? "+" : "-"} ${Math.abs(days)} ${includeWeekends === "no" ? "business " : ""}days`,
        })
      }
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setStartDate("")
    setEndDate("")
    setOperation("between")
    setDaysToAdd("")
    setIncludeWeekends("yes")
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
              <Calendar className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Days Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate days between dates or add days to dates with MaiCalcs. Perfect for project planning, scheduling,
              and date calculations with business day options.
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
                  <span>Date Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="operation">Calculation Type</Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="between">Days Between Dates</SelectItem>
                      <SelectItem value="add">Add Days to Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                {operation === "between" ? (
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="text-lg font-mono"
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="daysToAdd">Days to Add</Label>
                      <Input
                        id="daysToAdd"
                        type="number"
                        placeholder="Enter number of days"
                        value={daysToAdd}
                        onChange={(e) => setDaysToAdd(e.target.value)}
                        className="text-lg font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="includeWeekends">Include Weekends</Label>
                      <Select value={includeWeekends} onValueChange={setIncludeWeekends}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes (All Days)</SelectItem>
                          <SelectItem value="no">No (Business Days Only)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Day Types:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Total days: All calendar days</p>
                    <p>• Business days: Monday to Friday</p>
                    <p>• Weekends: Saturday and Sunday</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Jan 1 to Jan 31 = 30 days</p>
                    <p>• Jan 1 + 30 business days = Feb 13</p>
                    <p>• Project duration calculations</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDays} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Days Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    {operation === "between" ? (
                      <>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Total Days:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-purple-600 font-mono">{results.totalDays}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(results.totalDays.toString())}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Business Days:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-green-600 font-mono">{results.businessDays}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(results.businessDays.toString())}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-violet-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Weekend Days:</span>
                            <span className="text-xl font-bold text-violet-600 font-mono">{results.weekends}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Result Date:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-purple-600 font-mono">{results.resultDate}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(results.resultDate || "")}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Days Added:</span>
                            <span className="text-xl font-bold text-green-600 font-mono">{results.totalDays}</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weeks:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.weeks}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Months (approx):</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">{results.months}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Years (approx):</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">{results.years}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Business days exclude weekends</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Project timeline planning</p>
                        <p>• Contract duration calculations</p>
                        <p>• Business day scheduling</p>
                        <p>• Deadline management</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dates to calculate days between or add days to a date</p>
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
