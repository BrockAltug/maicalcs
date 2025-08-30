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

export default function MonthsCalculatorPage() {
  const [calculationType, setCalculationType] = useState("between")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [baseDate, setBaseDate] = useState("")
  const [monthsToAdd, setMonthsToAdd] = useState("")
  const [results, setResults] = useState<{
    months: number
    years: number
    days: number
    totalDays: number
    totalWeeks: number
    resultDate?: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateMonths = () => {
    try {
      if (calculationType === "between") {
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

        let years = end.getFullYear() - start.getFullYear()
        let months = end.getMonth() - start.getMonth()
        let days = end.getDate() - start.getDate()

        if (days < 0) {
          months--
          const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0)
          days += lastMonth.getDate()
        }

        if (months < 0) {
          years--
          months += 12
        }

        const totalMonths = years * 12 + months
        const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        const totalWeeks = Math.floor(totalDays / 7)

        setResults({
          months: totalMonths,
          years,
          days,
          totalDays,
          totalWeeks,
          formula: `From ${startDate} to ${endDate}`,
        })
      } else {
        if (!baseDate || !monthsToAdd) {
          alert("Please enter both base date and months to add.")
          return
        }

        const base = new Date(baseDate)
        const monthsNum = Number.parseInt(monthsToAdd)

        if (isNaN(monthsNum)) {
          alert("Please enter a valid number of months.")
          return
        }

        const result = new Date(base)
        result.setMonth(result.getMonth() + monthsNum)

        const totalDays = Math.floor((result.getTime() - base.getTime()) / (1000 * 60 * 60 * 24))
        const totalWeeks = Math.floor(totalDays / 7)
        const years = Math.floor(monthsNum / 12)
        const remainingMonths = monthsNum % 12

        setResults({
          months: monthsNum,
          years,
          days: remainingMonths,
          totalDays,
          totalWeeks,
          resultDate: result.toISOString().split("T")[0],
          formula: `${baseDate} + ${monthsNum} months`,
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
    setBaseDate("")
    setMonthsToAdd("")
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
              Months Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate months between dates or add months to a date with MaiCalcs. Perfect for project planning,
              pregnancy tracking, and subscription management.
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
                  <span>Months Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculationType">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="between">Months Between Dates</SelectItem>
                      <SelectItem value="add">Add Months to Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "between" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="baseDate">Base Date</Label>
                      <Input
                        id="baseDate"
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                        className="text-lg font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthsToAdd">Months to Add</Label>
                      <Input
                        id="monthsToAdd"
                        type="number"
                        placeholder="Enter months"
                        value={monthsToAdd}
                        onChange={(e) => setMonthsToAdd(e.target.value)}
                        className="text-lg font-mono"
                      />
                    </div>
                  </>
                )}

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Months Calculations:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Months between dates</p>
                    <p>• Years and days breakdown</p>
                    <p>• Total days and weeks</p>
                    <p>• Future/past date calculation</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Jan 2023 to Dec 2023 = 11 months</p>
                    <p>• Today + 6 months = future date</p>
                    <p>• 24 months = 2 years</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateMonths} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <ArrowRight className="h-5 w-5 text-pink-600" />
                  <span>Months Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Months:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.months}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.months.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Years:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.years}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.years.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Remaining Days:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-pink-600 font-mono">{results.days}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.days.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Days:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.totalDays}</span>
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

                    {results.resultDate && (
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Result Date:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-indigo-600 font-mono">{results.resultDate}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyResult(results.resultDate!)}
                              className="h-8 w-8 p-0"
                            >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Total weeks: {results.totalWeeks}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Pregnancy month tracking</p>
                        <p>• Subscription period calculations</p>
                        <p>• Project timeline planning</p>
                        <p>• Contract duration analysis</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dates to calculate months</p>
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
