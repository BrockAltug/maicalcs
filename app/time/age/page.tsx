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

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])
  const [results, setResults] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
    totalWeeks: number
    totalMonths: number
    totalHours: number
    totalMinutes: number
    nextBirthday: string
    daysUntilBirthday: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateAge = () => {
    try {
      if (!birthDate) {
        alert("Please enter your birth date.")
        return
      }

      const birth = new Date(birthDate)
      const current = new Date(currentDate)

      if (birth > current) {
        alert("Birth date cannot be in the future.")
        return
      }

      // Calculate exact age
      let years = current.getFullYear() - birth.getFullYear()
      let months = current.getMonth() - birth.getMonth()
      let days = current.getDate() - birth.getDate()

      if (days < 0) {
        months--
        const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0)
        days += lastMonth.getDate()
      }

      if (months < 0) {
        years--
        months += 12
      }

      // Calculate totals
      const timeDiff = current.getTime() - birth.getTime()
      const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24))
      const totalWeeks = Math.floor(totalDays / 7)
      const totalMonths = years * 12 + months
      const totalHours = totalDays * 24
      const totalMinutes = totalHours * 60

      // Calculate next birthday
      const nextBirthday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate())
      if (nextBirthday < current) {
        nextBirthday.setFullYear(current.getFullYear() + 1)
      }
      const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - current.getTime()) / (1000 * 3600 * 24))

      setResults({
        years,
        months,
        days,
        totalDays,
        totalWeeks,
        totalMonths,
        totalHours,
        totalMinutes,
        nextBirthday: nextBirthday.toISOString().split("T")[0],
        daysUntilBirthday,
        formula: `From ${birthDate} to ${currentDate}`,
      })
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
    setBirthDate("")
    setCurrentDate(new Date().toISOString().split("T")[0])
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
              Age Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your exact age in years, months, days, hours, and minutes with MaiCalcs. Perfect for age
              verification, birthday planning, and life milestone tracking.
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
                  <span>Birth Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentDate">Calculate Age As Of</Label>
                  <Input
                    id="currentDate"
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Age Calculations:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Exact age in years, months, days</p>
                    <p>• Total days, weeks, hours lived</p>
                    <p>• Next birthday countdown</p>
                    <p>• Life milestone tracking</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Born 1990-05-15, today: 34 years old</p>
                    <p>• Total days lived: ~12,400 days</p>
                    <p>• Next birthday in 127 days</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateAge} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Age Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Exact Age:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.years}y {results.months}m {results.days}d
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(`${results.years} years, ${results.months} months, ${results.days} days`)
                            }
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Days:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.totalDays.toLocaleString()}
                          </span>
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

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Weeks:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">
                          {results.totalWeeks.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Hours:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">
                          {results.totalHours.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Minutes:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">
                          {results.totalMinutes.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Next Birthday:</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">{results.nextBirthday}</span>
                      </div>
                    </div>

                    <div className="bg-rose-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Days Until Birthday:</span>
                        <span className="text-lg font-bold text-rose-600 font-mono">{results.daysUntilBirthday}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Period:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Birth Date: {birthDate}</p>
                        <p>• Current Date: {currentDate}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Age verification for services</p>
                        <p>• Birthday and anniversary planning</p>
                        <p>• Life milestone tracking</p>
                        <p>• Legal age requirements</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your birth date to calculate your exact age</p>
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
