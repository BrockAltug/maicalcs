"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SecondsToYDHMSCalculatorPage() {
  const [seconds, setSeconds] = useState("")
  const [results, setResults] = useState<{
    years: number
    days: number
    hours: number
    minutes: number
    remainingSeconds: number
    totalSeconds: number
    formatted: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateTimeBreakdown = () => {
    try {
      const totalSecs = Number.parseFloat(seconds)

      if (isNaN(totalSecs) || totalSecs < 0) {
        alert("Please enter a valid positive number of seconds.")
        return
      }

      // Time conversion constants
      const SECONDS_PER_MINUTE = 60
      const SECONDS_PER_HOUR = 3600
      const SECONDS_PER_DAY = 86400
      const SECONDS_PER_YEAR = 31536000 // 365 days

      // Calculate breakdown
      const years = Math.floor(totalSecs / SECONDS_PER_YEAR)
      const remainingAfterYears = totalSecs % SECONDS_PER_YEAR

      const days = Math.floor(remainingAfterYears / SECONDS_PER_DAY)
      const remainingAfterDays = remainingAfterYears % SECONDS_PER_DAY

      const hours = Math.floor(remainingAfterDays / SECONDS_PER_HOUR)
      const remainingAfterHours = remainingAfterDays % SECONDS_PER_HOUR

      const minutes = Math.floor(remainingAfterHours / SECONDS_PER_MINUTE)
      const remainingSeconds = Math.floor(remainingAfterHours % SECONDS_PER_MINUTE)

      // Format the result
      const parts = []
      if (years > 0) parts.push(`${years}y`)
      if (days > 0) parts.push(`${days}d`)
      if (hours > 0) parts.push(`${hours}h`)
      if (minutes > 0) parts.push(`${minutes}m`)
      if (remainingSeconds > 0) parts.push(`${remainingSeconds}s`)

      const formatted = parts.length > 0 ? parts.join(" ") : "0s"

      setResults({
        years,
        days,
        hours,
        minutes,
        remainingSeconds,
        totalSeconds: totalSecs,
        formatted,
        formula: `${totalSecs} seconds breakdown`,
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
    setSeconds("")
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
              Seconds to YY:DD:HH:MM:SS Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert seconds to years, days, hours, minutes, and seconds format with MaiCalcs. Perfect for time
              analysis, duration calculations, and data processing.
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
                  <span>Time Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="seconds">Seconds</Label>
                  <Input
                    id="seconds"
                    type="number"
                    placeholder="Enter number of seconds"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className="text-lg font-mono"
                    step="1"
                    min="0"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Time Conversions:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• 1 minute = 60 seconds</p>
                    <p>• 1 hour = 3,600 seconds</p>
                    <p>• 1 day = 86,400 seconds</p>
                    <p>• 1 year = 31,536,000 seconds</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 3661 seconds = 1h 1m 1s</p>
                    <p>• 90061 seconds = 1d 1h 1m 1s</p>
                    <p>• 31626061 seconds = 1y 1d 1h 1m 1s</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTimeBreakdown} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Time Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Formatted:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.formatted}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.formatted)}
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

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Days:</span>
                        <span className="text-xl font-bold text-violet-600 font-mono">{results.days}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Hours:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.hours}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Minutes:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">{results.minutes}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Seconds:</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">{results.remainingSeconds}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Total seconds: {results.totalSeconds.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• System uptime analysis</p>
                        <p>• Duration formatting</p>
                        <p>• Time data processing</p>
                        <p>• Performance metrics</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter seconds to convert to years, days, hours, minutes format</p>
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
