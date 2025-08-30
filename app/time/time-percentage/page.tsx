"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function TimePercentageCalculatorPage() {
  const [calculationType, setCalculationType] = useState("elapsed")
  const [totalTime, setTotalTime] = useState("")
  const [elapsedTime, setElapsedTime] = useState("")
  const [percentage, setPercentage] = useState("")
  const [timeUnit, setTimeUnit] = useState("minutes")
  const [results, setResults] = useState<{
    percentage: number
    elapsedTime: number
    remainingTime: number
    totalTime: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateTimePercentage = () => {
    try {
      if (calculationType === "elapsed") {
        const total = Number.parseFloat(totalTime)
        const elapsed = Number.parseFloat(elapsedTime)

        if (isNaN(total) || isNaN(elapsed) || total <= 0 || elapsed < 0) {
          alert("Please enter valid positive numbers.")
          return
        }

        if (elapsed > total) {
          alert("Elapsed time cannot be greater than total time.")
          return
        }

        const percentageResult = (elapsed / total) * 100
        const remainingTime = total - elapsed

        setResults({
          percentage: Number(percentageResult.toFixed(2)),
          elapsedTime: elapsed,
          remainingTime,
          totalTime: total,
          formula: `${elapsed} / ${total} × 100 = ${percentageResult.toFixed(2)}%`,
        })
      } else {
        const total = Number.parseFloat(totalTime)
        const percent = Number.parseFloat(percentage)

        if (isNaN(total) || isNaN(percent) || total <= 0 || percent < 0 || percent > 100) {
          alert("Please enter valid values (percentage should be 0-100).")
          return
        }

        const elapsedResult = (percent / 100) * total
        const remainingTime = total - elapsedResult

        setResults({
          percentage: percent,
          elapsedTime: elapsedResult,
          remainingTime,
          totalTime: total,
          formula: `${percent}% of ${total} = ${elapsedResult.toFixed(2)}`,
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
    setTotalTime("")
    setElapsedTime("")
    setPercentage("")
    setTimeUnit("minutes")
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
              Time Percentage Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate what percentage of time has elapsed or find elapsed time from percentage with MaiCalcs. Perfect
              for project tracking and time management.
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
                  <span>Time Percentage Calculation</span>
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
                      <SelectItem value="elapsed">Calculate Percentage from Time</SelectItem>
                      <SelectItem value="fromPercentage">Calculate Time from Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalTime">Total Time</Label>
                  <Input
                    id="totalTime"
                    type="number"
                    placeholder="Enter total time"
                    value={totalTime}
                    onChange={(e) => setTotalTime(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                    min="0"
                  />
                </div>

                {calculationType === "elapsed" ? (
                  <div className="space-y-2">
                    <Label htmlFor="elapsedTime">Elapsed Time</Label>
                    <Input
                      id="elapsedTime"
                      type="number"
                      placeholder="Enter elapsed time"
                      value={elapsedTime}
                      onChange={(e) => setElapsedTime(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                      min="0"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Percentage (%)</Label>
                    <Input
                      id="percentage"
                      type="number"
                      placeholder="Enter percentage"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                  </div>
                )}

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

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Time Percentage Features:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Calculate percentage of elapsed time</p>
                    <p>• Find elapsed time from percentage</p>
                    <p>• Calculate remaining time</p>
                    <p>• Support for various time units</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 30 min of 60 min = 50%</p>
                    <p>• 25% of 8 hours = 2 hours</p>
                    <p>• 3 days of 10 days = 30%</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTimePercentage} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                        <span className="font-medium text-gray-700">Elapsed Time:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.elapsedTime} {timeUnit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.elapsedTime} ${timeUnit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Remaining Time:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-pink-600 font-mono">
                            {results.remainingTime} {timeUnit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.remainingTime} ${timeUnit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Time:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">
                          {results.totalTime} {timeUnit}
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Progress Bar:</span>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-emerald-600 h-4 rounded-full transition-all duration-300"
                            style={{ width: `${results.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-emerald-600 mt-1">{results.percentage}% Complete</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Time unit: {timeUnit}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Project progress tracking</p>
                        <p>• Time management analysis</p>
                        <p>• Deadline monitoring</p>
                        <p>• Performance measurement</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter time values to calculate percentage</p>
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
