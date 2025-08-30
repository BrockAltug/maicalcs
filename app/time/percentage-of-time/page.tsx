"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PercentageOfTimeCalculatorPage() {
  const [timeValue, setTimeValue] = useState("")
  const [timeUnit, setTimeUnit] = useState("hours")
  const [periodType, setPeriodType] = useState("day")
  const [results, setResults] = useState<{
    percentage: number
    timeInSeconds: number
    periodInSeconds: number
    remainingTime: number
    remainingPercentage: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const timeToSeconds = (value: number, unit: string): number => {
    switch (unit) {
      case "seconds":
        return value
      case "minutes":
        return value * 60
      case "hours":
        return value * 3600
      case "days":
        return value * 86400
      default:
        return value
    }
  }

  const getPeriodSeconds = (period: string): number => {
    switch (period) {
      case "day":
        return 86400 // 24 hours
      case "week":
        return 604800 // 7 days
      case "month":
        return 2629746 // 30.44 days average
      case "year":
        return 31556952 // 365.25 days
      default:
        return 86400
    }
  }

  const calculatePercentageOfTime = () => {
    try {
      const time = Number.parseFloat(timeValue)

      if (isNaN(time) || time < 0) {
        alert("Please enter a valid positive number.")
        return
      }

      const timeInSeconds = timeToSeconds(time, timeUnit)
      const periodInSeconds = getPeriodSeconds(periodType)

      if (timeInSeconds > periodInSeconds) {
        alert(`Time value cannot exceed the total ${periodType} duration.`)
        return
      }

      const percentage = (timeInSeconds / periodInSeconds) * 100
      const remainingTime = periodInSeconds - timeInSeconds
      const remainingPercentage = 100 - percentage

      setResults({
        percentage: Number(percentage.toFixed(4)),
        timeInSeconds,
        periodInSeconds,
        remainingTime,
        remainingPercentage: Number(remainingPercentage.toFixed(4)),
        formula: `${time} ${timeUnit} / 1 ${periodType} × 100 = ${percentage.toFixed(4)}%`,
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    const parts = []
    if (days > 0) parts.push(`${days}d`)
    if (hours > 0) parts.push(`${hours}h`)
    if (minutes > 0) parts.push(`${minutes}m`)
    if (secs > 0) parts.push(`${secs}s`)

    return parts.length > 0 ? parts.join(" ") : "0s"
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setTimeValue("")
    setTimeUnit("hours")
    setPeriodType("day")
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
              <PieChart className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Percentage of Time Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate what percentage a specific time represents of a day, week, month, or year with MaiCalcs. Perfect
              for time analysis and productivity tracking.
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
                  <span>Time Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="timeValue">Time Value</Label>
                  <Input
                    id="timeValue"
                    type="number"
                    placeholder="Enter time value"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeUnit">Time Unit</Label>
                  <Select value={timeUnit} onValueChange={setTimeUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="periodType">Period Type</Label>
                  <Select value={periodType} onValueChange={setPeriodType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day (24 hours)</SelectItem>
                      <SelectItem value="week">Week (7 days)</SelectItem>
                      <SelectItem value="month">Month (30.44 days avg)</SelectItem>
                      <SelectItem value="year">Year (365.25 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Time Period Analysis:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Calculate percentage of time periods</p>
                    <p>• Compare time against standard periods</p>
                    <p>• Analyze time distribution</p>
                    <p>• Track productivity metrics</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 8 hours = 33.33% of a day</p>
                    <p>• 2 hours = 11.90% of a week</p>
                    <p>• 30 minutes = 2.08% of a day</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePercentageOfTime} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Time Percentage Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Percentage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.percentage}%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.percentage}%`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Time in Seconds:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.timeInSeconds.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.timeInSeconds.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Period Duration:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">
                          {formatTime(results.periodInSeconds)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Remaining Time:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">
                          {formatTime(results.remainingTime)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Remaining Percentage:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">
                          {results.remainingPercentage}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Visual Representation:</span>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-6">
                          <div
                            className="bg-amber-600 h-6 rounded-full transition-all duration-300 flex items-center justify-center"
                            style={{ width: `${Math.min(results.percentage, 100)}%` }}
                          >
                            <span className="text-white text-xs font-bold">
                              {results.percentage < 10 ? "" : `${results.percentage.toFixed(1)}%`}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-amber-600 mt-1">
                          {results.percentage}% of 1 {periodType}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Period: 1 {periodType}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Work-life balance analysis</p>
                        <p>• Productivity time tracking</p>
                        <p>• Activity time distribution</p>
                        <p>• Time management optimization</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter time value to calculate percentage of time period</p>
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
