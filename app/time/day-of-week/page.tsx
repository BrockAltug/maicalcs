"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function DayOfWeekCalculatorPage() {
  const [date, setDate] = useState("")
  const [results, setResults] = useState<{
    dayOfWeek: string
    dayNumber: number
    isWeekend: boolean
    weekOfYear: number
    dayOfYear: number
    monthName: string
    yearType: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateDayOfWeek = () => {
    try {
      if (!date) {
        alert("Please enter a date.")
        return
      }

      const inputDate = new Date(date)

      if (isNaN(inputDate.getTime())) {
        alert("Please enter a valid date.")
        return
      }

      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]

      const dayOfWeek = dayNames[inputDate.getDay()]
      const dayNumber = inputDate.getDay()
      const isWeekend = dayNumber === 0 || dayNumber === 6
      const monthName = monthNames[inputDate.getMonth()]

      // Calculate week of year
      const startOfYear = new Date(inputDate.getFullYear(), 0, 1)
      const pastDaysOfYear = (inputDate.getTime() - startOfYear.getTime()) / 86400000
      const weekOfYear = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)

      // Calculate day of year
      const dayOfYear = Math.floor(pastDaysOfYear) + 1

      // Check if leap year
      const year = inputDate.getFullYear()
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      const yearType = isLeapYear ? "Leap Year" : "Regular Year"

      setResults({
        dayOfWeek,
        dayNumber,
        isWeekend,
        weekOfYear,
        dayOfYear,
        monthName,
        yearType,
        formula: `${date} falls on ${dayOfWeek}`,
      })
    } catch (error) {
      alert("Invalid input. Please check your date.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setDate("")
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
              Day of the Week Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find what day of the week any date falls on with MaiCalcs. Perfect for historical dates, future planning,
              and calendar calculations.
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
                  <span>Date Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Day Information:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Day of week (Sunday = 0, Saturday = 6)</p>
                    <p>• Weekend vs weekday classification</p>
                    <p>• Week and day of year calculations</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2024-01-01 = Monday</p>
                    <p>• 2000-01-01 = Saturday</p>
                    <p>• 1969-07-20 = Sunday (Moon landing)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDayOfWeek} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Day Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Day of Week:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.dayOfWeek}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.dayOfWeek)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Day Number:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.dayNumber}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.dayNumber.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weekend:</span>
                        <span
                          className={`text-xl font-bold font-mono ${results.isWeekend ? "text-red-600" : "text-green-600"}`}
                        >
                          {results.isWeekend ? "YES" : "NO"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Week of Year:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.weekOfYear}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Day of Year:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">{results.dayOfYear}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Month:</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">{results.monthName}</span>
                      </div>
                    </div>

                    <div className="bg-rose-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Year Type:</span>
                        <span className="text-lg font-bold text-rose-600 font-mono">{results.yearType}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Result:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Date: {date}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Historical date research</p>
                        <p>• Event planning and scheduling</p>
                        <p>• Calendar calculations</p>
                        <p>• Day-specific planning</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a date to find what day of the week it falls on</p>
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
