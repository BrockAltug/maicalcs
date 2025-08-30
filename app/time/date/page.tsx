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

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState("")
  const [operation, setOperation] = useState("add")
  const [amount, setAmount] = useState("")
  const [unit, setUnit] = useState("days")
  const [results, setResults] = useState<{
    resultDate: string
    daysDifference: number
    weeksDifference: number
    monthsDifference: number
    yearsDifference: number
    dayOfWeek: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateDate = () => {
    try {
      if (!startDate || !amount) {
        alert("Please enter both date and amount.")
        return
      }

      const date = new Date(startDate)
      const value = Number.parseInt(amount)

      if (isNaN(value)) {
        alert("Please enter a valid number.")
        return
      }

      const resultDate = new Date(date)
      const multiplier = operation === "add" ? 1 : -1

      switch (unit) {
        case "days":
          resultDate.setDate(date.getDate() + value * multiplier)
          break
        case "weeks":
          resultDate.setDate(date.getDate() + value * 7 * multiplier)
          break
        case "months":
          resultDate.setMonth(date.getMonth() + value * multiplier)
          break
        case "years":
          resultDate.setFullYear(date.getFullYear() + value * multiplier)
          break
      }

      const timeDiff = Math.abs(resultDate.getTime() - date.getTime())
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
      const weeksDiff = Math.floor(daysDiff / 7)
      const monthsDiff = Math.abs(
        resultDate.getMonth() - date.getMonth() + 12 * (resultDate.getFullYear() - date.getFullYear()),
      )
      const yearsDiff = Math.abs(resultDate.getFullYear() - date.getFullYear())

      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const dayOfWeek = dayNames[resultDate.getDay()]

      setResults({
        resultDate: resultDate.toISOString().split("T")[0],
        daysDifference: daysDiff,
        weeksDifference: weeksDiff,
        monthsDifference: monthsDiff,
        yearsDifference: yearsDiff,
        dayOfWeek,
        formula: `${startDate} ${operation} ${value} ${unit}`,
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
    setStartDate("")
    setOperation("add")
    setAmount("")
    setUnit("days")
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
              Date Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Add or subtract days, weeks, months, or years from any date with MaiCalcs. Perfect for planning,
              scheduling, and date calculations.
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
                  <Label htmlFor="operation">Operation</Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add (+)</SelectItem>
                      <SelectItem value="subtract">Subtract (-)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg font-mono"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Time Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                      <SelectItem value="months">Months</SelectItem>
                      <SelectItem value="years">Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Date Operations:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Add: Move forward in time</p>
                    <p>• Subtract: Move backward in time</p>
                    <p>• Automatic leap year handling</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2024-01-01 + 30 days = 2024-01-31</p>
                    <p>• 2024-06-15 - 2 months = 2024-04-15</p>
                    <p>• 2024-03-01 + 1 year = 2025-03-01</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDate} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Date Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result Date:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.resultDate}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.resultDate)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Day of Week:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.dayOfWeek}</span>
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

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Days Difference:</span>
                        <span className="text-xl font-bold text-violet-600 font-mono">{results.daysDifference}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weeks Difference:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.weeksDifference}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Months Difference:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">{results.monthsDifference}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Years Difference:</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">{results.yearsDifference}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Start: {startDate}</p>
                        <p>• Result: {results.resultDate}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Project deadline planning</p>
                        <p>• Event scheduling</p>
                        <p>• Contract date calculations</p>
                        <p>• Age and anniversary tracking</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a date and amount to calculate date operations</p>
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
