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

export default function WeeksCalculatorPage() {
  const [calculationType, setCalculationType] = useState("between")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [baseDate, setBaseDate] = useState("")
  const [weeksToAdd, setWeeksToAdd] = useState("")
  const [results, setResults] = useState<{
    weeks: number
    days: number
    totalDays: number
    months: number
    resultDate?: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateWeeks = () => {
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

        const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        const weeks = Math.floor(totalDays / 7)
        const remainingDays = totalDays % 7
        const months = Number.parseFloat((totalDays / 30.44).toFixed(2)) // Average days per month

        setResults({
          weeks,
          days: remainingDays,
          totalDays,
          months,
          formula: `${startDate} to ${endDate}`,
        })
      } else {
        if (!baseDate || !weeksToAdd) {
          alert("Please enter both base date and weeks to add.")
          return
        }

        const base = new Date(baseDate)
        const weeksNum = Number.parseFloat(weeksToAdd)

        if (isNaN(weeksNum)) {
          alert("Please enter a valid number of weeks.")
          return
        }

        const result = new Date(base)
        result.setDate(result.getDate() + weeksNum * 7)

        const totalDays = Math.floor((result.getTime() - base.getTime()) / (1000 * 60 * 60 * 24))
        const months = Number.parseFloat((totalDays / 30.44).toFixed(2))

        setResults({
          weeks: weeksNum,
          days: totalDays % 7,
          totalDays,
          months,
          resultDate: result.toISOString().split("T")[0],
          formula: `${baseDate} + ${weeksNum} weeks`,
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
    setWeeksToAdd("")
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
              Weeks Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate weeks between dates or add weeks to a date with MaiCalcs. Perfect for project planning,
              pregnancy tracking, and schedule management.
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
                  <span>Weeks Calculation</span>
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
                      <SelectItem value="between">Weeks Between Dates</SelectItem>
                      <SelectItem value="add">Add Weeks to Date</SelectItem>
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
                      <Label htmlFor="weeksToAdd">Weeks to Add</Label>
                      <Input
                        id="weeksToAdd"
                        type="number"
                        placeholder="Enter weeks"
                        value={weeksToAdd}
                        onChange={(e) => setWeeksToAdd(e.target.value)}
                        className="text-lg font-mono"
                        step="0.1"
                      />
                    </div>
                  </>
                )}

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Weeks Calculations:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Weeks between dates</p>
                    <p>• Remaining days breakdown</p>
                    <p>• Total days calculation</p>
                    <p>• Approximate months</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 14 days = 2 weeks</p>
                    <p>• Today + 4 weeks = future date</p>
                    <p>• 40 weeks ≈ 9.2 months</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateWeeks} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Weeks Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weeks:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.weeks}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.weeks.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Remaining Days:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.days}</span>
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

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Days:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-pink-600 font-mono">{results.totalDays}</span>
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

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Approximate Months:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.months}</span>
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
                        <p>
                          • {results.weeks} weeks + {results.days} days
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Pregnancy week tracking</p>
                        <p>• Project milestone planning</p>
                        <p>• Course duration calculation</p>
                        <p>• Event countdown planning</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dates to calculate weeks</p>
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
