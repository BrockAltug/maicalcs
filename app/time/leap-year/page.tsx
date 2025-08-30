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

export default function LeapYearCalculatorPage() {
  const [year, setYear] = useState("")
  const [results, setResults] = useState<{
    isLeapYear: boolean
    daysInYear: number
    daysInFebruary: number
    nextLeapYear: number
    previousLeapYear: number
    yearsUntilNext: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateLeapYear = () => {
    try {
      const y = Number.parseInt(year)

      if (isNaN(y) || y < 1) {
        alert("Please enter a valid year.")
        return
      }

      // Leap year calculation rules:
      // 1. Divisible by 4
      // 2. If divisible by 100, must also be divisible by 400
      const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0

      const daysInYear = isLeapYear ? 366 : 365
      const daysInFebruary = isLeapYear ? 29 : 28

      // Find next leap year
      let nextLeapYear = y + 1
      while (!((nextLeapYear % 4 === 0 && nextLeapYear % 100 !== 0) || nextLeapYear % 400 === 0)) {
        nextLeapYear++
      }

      // Find previous leap year
      let previousLeapYear = y - 1
      while (!((previousLeapYear % 4 === 0 && previousLeapYear % 100 !== 0) || previousLeapYear % 400 === 0)) {
        previousLeapYear--
      }

      const yearsUntilNext = nextLeapYear - y

      setResults({
        isLeapYear,
        daysInYear,
        daysInFebruary,
        nextLeapYear,
        previousLeapYear,
        yearsUntilNext,
        formula: `${y} ${isLeapYear ? "is" : "is not"} a leap year`,
      })
    } catch (error) {
      alert("Invalid input. Please check your year.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setYear("")
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
              Leap Year Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Determine if any year is a leap year and get detailed calendar information with MaiCalcs. Perfect for date
              calculations and calendar planning.
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
                  <span>Year Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="Enter year (e.g., 2024)"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="text-lg font-mono"
                    min="1"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Leap Year Rules:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Divisible by 4: Usually a leap year</p>
                    <p>• Divisible by 100: Not a leap year</p>
                    <p>• Divisible by 400: Is a leap year</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2024: Leap year (divisible by 4)</p>
                    <p>• 1900: Not leap year (divisible by 100)</p>
                    <p>• 2000: Leap year (divisible by 400)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateLeapYear} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Leap Year Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Is Leap Year:</span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xl font-bold font-mono ${results.isLeapYear ? "text-green-600" : "text-red-600"}`}
                          >
                            {results.isLeapYear ? "YES" : "NO"}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.isLeapYear ? "YES" : "NO")}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Days in Year:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.daysInYear} days</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.daysInYear} days`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Days in February:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-violet-600 font-mono">
                            {results.daysInFebruary} days
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.daysInFebruary} days`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Next Leap Year:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.nextLeapYear}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Previous Leap Year:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">{results.previousLeapYear}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Years Until Next:</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">
                          {results.yearsUntilNext} years
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Result:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Year: {year}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Calendar and date calculations</p>
                        <p>• Age and birthday calculations</p>
                        <p>• Historical date verification</p>
                        <p>• Programming and software development</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a year to check if it's a leap year</p>
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
