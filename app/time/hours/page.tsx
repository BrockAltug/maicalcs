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

export default function HoursCalculatorPage() {
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [breakMinutes, setBreakMinutes] = useState("")
  const [hourlyRate, setHourlyRate] = useState("")
  const [overtimeRate, setOvertimeRate] = useState("1.5")
  const [results, setResults] = useState<{
    totalHours: number
    regularHours: number
    overtimeHours: number
    totalPay: number
    regularPay: number
    overtimePay: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateHours = () => {
    try {
      if (!startTime || !endTime) {
        alert("Please enter both start and end times.")
        return
      }

      const start = new Date(`2000-01-01T${startTime}:00`)
      const end = new Date(`2000-01-01T${endTime}:00`)

      if (end <= start) {
        end.setDate(end.getDate() + 1) // Next day
      }

      const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60)
      const breakMins = Number.parseInt(breakMinutes) || 0
      const workMinutes = totalMinutes - breakMins
      const totalHours = workMinutes / 60

      const regularHours = Math.min(totalHours, 8)
      const overtimeHours = Math.max(0, totalHours - 8)

      const rate = Number.parseFloat(hourlyRate) || 0
      const otRate = Number.parseFloat(overtimeRate) || 1.5

      const regularPay = regularHours * rate
      const overtimePay = overtimeHours * rate * otRate
      const totalPay = regularPay + overtimePay

      setResults({
        totalHours: Number(totalHours.toFixed(2)),
        regularHours: Number(regularHours.toFixed(2)),
        overtimeHours: Number(overtimeHours.toFixed(2)),
        totalPay: Number(totalPay.toFixed(2)),
        regularPay: Number(regularPay.toFixed(2)),
        overtimePay: Number(overtimePay.toFixed(2)),
        formula: `${startTime} to ${endTime} - ${breakMins} min break`,
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
    setStartTime("")
    setEndTime("")
    setBreakMinutes("")
    setHourlyRate("")
    setOvertimeRate("1.5")
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
              Hours Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate total work hours, overtime, and payroll with MaiCalcs. Perfect for time tracking, payroll
              calculations, and work hour management.
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
                  <span>Work Hours Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="breakMinutes">Break Time (minutes)</Label>
                  <Input
                    id="breakMinutes"
                    type="number"
                    placeholder="0"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(e.target.value)}
                    className="text-lg font-mono"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="0.00"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overtimeRate">Overtime Multiplier</Label>
                  <Select value={overtimeRate} onValueChange={setOvertimeRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5">1.5x (Time and a half)</SelectItem>
                      <SelectItem value="2.0">2.0x (Double time)</SelectItem>
                      <SelectItem value="1.25">1.25x (Quarter time)</SelectItem>
                      <SelectItem value="1.0">1.0x (Regular rate)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Calculation Rules:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Regular hours: First 8 hours</p>
                    <p>• Overtime: Hours beyond 8</p>
                    <p>• Break time is deducted</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 9:00 AM to 5:00 PM = 8 hours</p>
                    <p>• 8:00 AM to 6:00 PM = 10 hours (2 OT)</p>
                    <p>• With 30 min break = -0.5 hours</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateHours} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Work Hours Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Hours:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.totalHours}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalHours.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Regular Hours:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.regularHours}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.regularHours.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Overtime Hours:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-violet-600 font-mono">{results.overtimeHours}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.overtimeHours.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {hourlyRate && (
                      <>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Total Pay:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-blue-600 font-mono">${results.totalPay}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(`$${results.totalPay}`)}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-emerald-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Regular Pay:</span>
                            <span className="text-lg font-bold text-emerald-600 font-mono">${results.regularPay}</span>
                          </div>
                        </div>

                        <div className="bg-amber-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Overtime Pay:</span>
                            <span className="text-lg font-bold text-amber-600 font-mono">${results.overtimePay}</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Work Period:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Overtime rate: {overtimeRate}x</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Payroll calculations</p>
                        <p>• Time sheet management</p>
                        <p>• Labor cost estimation</p>
                        <p>• Work hour tracking</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter start and end times to calculate work hours</p>
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
