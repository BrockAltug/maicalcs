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

export default function DurationCalculatorPage() {
  const [calculationType, setCalculationType] = useState("between")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [baseTime, setBaseTime] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [results, setResults] = useState<{
    totalMinutes: number
    hours: number
    minutes: number
    decimal: number
    resultTime?: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateDuration = () => {
    try {
      if (calculationType === "between") {
        if (!startTime || !endTime) {
          alert("Please enter both start and end times.")
          return
        }

        const [startHour, startMin] = startTime.split(":").map(Number)
        const [endHour, endMin] = endTime.split(":").map(Number)

        const startMinutes = startHour * 60 + startMin
        let endMinutes = endHour * 60 + endMin

        // Handle overnight duration
        if (endMinutes < startMinutes) {
          endMinutes += 24 * 60
        }

        const totalMinutes = endMinutes - startMinutes
        const durationHours = Math.floor(totalMinutes / 60)
        const durationMinutes = totalMinutes % 60
        const decimal = Number.parseFloat((totalMinutes / 60).toFixed(2))

        setResults({
          totalMinutes,
          hours: durationHours,
          minutes: durationMinutes,
          decimal,
          formula: `${startTime} to ${endTime}`,
        })
      } else {
        if (!baseTime || (!hours && !minutes)) {
          alert("Please enter base time and duration to add.")
          return
        }

        const [baseHour, baseMin] = baseTime.split(":").map(Number)
        const hoursToAdd = Number.parseInt(hours || "0")
        const minutesToAdd = Number.parseInt(minutes || "0")

        const baseMinutes = baseHour * 60 + baseMin
        const totalMinutesToAdd = hoursToAdd * 60 + minutesToAdd
        const resultMinutes = baseMinutes + totalMinutesToAdd

        const resultHour = Math.floor(resultMinutes / 60) % 24
        const resultMin = resultMinutes % 60

        const resultTime = `${resultHour.toString().padStart(2, "0")}:${resultMin.toString().padStart(2, "0")}`

        setResults({
          totalMinutes: totalMinutesToAdd,
          hours: hoursToAdd,
          minutes: minutesToAdd,
          decimal: Number.parseFloat((totalMinutesToAdd / 60).toFixed(2)),
          resultTime,
          formula: `${baseTime} + ${hoursToAdd}h ${minutesToAdd}m`,
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
    setStartTime("")
    setEndTime("")
    setBaseTime("")
    setHours("")
    setMinutes("")
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
              Duration Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate time duration between two times or add duration to a start time with MaiCalcs. Perfect for work
              hours, meeting durations, and time tracking.
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
                  <span>Duration Calculation</span>
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
                      <SelectItem value="between">Duration Between Times</SelectItem>
                      <SelectItem value="add">Add Duration to Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "between" ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="baseTime">Base Time</Label>
                      <Input
                        id="baseTime"
                        type="time"
                        value={baseTime}
                        onChange={(e) => setBaseTime(e.target.value)}
                        className="text-lg font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hours">Hours to Add</Label>
                        <Input
                          id="hours"
                          type="number"
                          placeholder="Hours"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="text-lg font-mono"
                          min="0"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="minutes">Minutes to Add</Label>
                        <Input
                          id="minutes"
                          type="number"
                          placeholder="Minutes"
                          value={minutes}
                          onChange={(e) => setMinutes(e.target.value)}
                          className="text-lg font-mono"
                          min="0"
                          max="59"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Duration Features:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Calculate time between two times</p>
                    <p>• Add duration to start time</p>
                    <p>• Handle overnight durations</p>
                    <p>• Convert to decimal hours</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 09:00 to 17:00 = 8 hours</p>
                    <p>• 14:30 + 2h 15m = 16:45</p>
                    <p>• 23:00 to 07:00 = 8 hours (overnight)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDuration} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Duration Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Hours:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.hours}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.hours.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Minutes:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.minutes}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.minutes.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Minutes:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-pink-600 font-mono">{results.totalMinutes}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalMinutes.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Decimal Hours:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.decimal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.decimal.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {results.resultTime && (
                      <div className="bg-indigo-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Result Time:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-indigo-600 font-mono">{results.resultTime}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyResult(results.resultTime!)}
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
                          • Duration: {results.hours}h {results.minutes}m
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Work hours calculation</p>
                        <p>• Meeting duration tracking</p>
                        <p>• Project time estimation</p>
                        <p>• Schedule planning</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter times to calculate duration</p>
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
