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

export default function TimeCalculatorPage() {
  const [hours1, setHours1] = useState("")
  const [minutes1, setMinutes1] = useState("")
  const [seconds1, setSeconds1] = useState("")
  const [hours2, setHours2] = useState("")
  const [minutes2, setMinutes2] = useState("")
  const [seconds2, setSeconds2] = useState("")
  const [operation, setOperation] = useState("add")
  const [results, setResults] = useState<{
    hours: number
    minutes: number
    seconds: number
    totalSeconds: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateTime = () => {
    try {
      const h1 = Number.parseInt(hours1) || 0
      const m1 = Number.parseInt(minutes1) || 0
      const s1 = Number.parseInt(seconds1) || 0
      const h2 = Number.parseInt(hours2) || 0
      const m2 = Number.parseInt(minutes2) || 0
      const s2 = Number.parseInt(seconds2) || 0

      if (h1 < 0 || m1 < 0 || s1 < 0 || h2 < 0 || m2 < 0 || s2 < 0) {
        alert("Please enter valid positive numbers.")
        return
      }

      const totalSeconds1 = h1 * 3600 + m1 * 60 + s1
      const totalSeconds2 = h2 * 3600 + m2 * 60 + s2

      let resultSeconds = 0
      let formula = ""

      if (operation === "add") {
        resultSeconds = totalSeconds1 + totalSeconds2
        formula = `${h1}:${m1.toString().padStart(2, "0")}:${s1.toString().padStart(2, "0")} + ${h2}:${m2.toString().padStart(2, "0")}:${s2.toString().padStart(2, "0")}`
      } else {
        resultSeconds = Math.abs(totalSeconds1 - totalSeconds2)
        formula = `${h1}:${m1.toString().padStart(2, "0")}:${s1.toString().padStart(2, "0")} - ${h2}:${m2.toString().padStart(2, "0")}:${s2.toString().padStart(2, "0")}`
      }

      const hours = Math.floor(resultSeconds / 3600)
      const minutes = Math.floor((resultSeconds % 3600) / 60)
      const seconds = resultSeconds % 60

      setResults({
        hours,
        minutes,
        seconds,
        totalSeconds: resultSeconds,
        formula,
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
    setHours1("")
    setMinutes1("")
    setSeconds1("")
    setHours2("")
    setMinutes2("")
    setSeconds2("")
    setOperation("add")
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
              Time Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Add, subtract, and calculate time differences with precision using MaiCalcs. Perfect for time tracking,
              scheduling, and duration calculations.
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
                  <span>Time Values</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">First Time</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="hours1">Hours</Label>
                      <Input
                        id="hours1"
                        type="number"
                        placeholder="0"
                        value={hours1}
                        onChange={(e) => setHours1(e.target.value)}
                        className="text-lg font-mono"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minutes1">Minutes</Label>
                      <Input
                        id="minutes1"
                        type="number"
                        placeholder="0"
                        value={minutes1}
                        onChange={(e) => setMinutes1(e.target.value)}
                        className="text-lg font-mono"
                        min="0"
                        max="59"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seconds1">Seconds</Label>
                      <Input
                        id="seconds1"
                        type="number"
                        placeholder="0"
                        value={seconds1}
                        onChange={(e) => setSeconds1(e.target.value)}
                        className="text-lg font-mono"
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
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

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Second Time</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="hours2">Hours</Label>
                      <Input
                        id="hours2"
                        type="number"
                        placeholder="0"
                        value={hours2}
                        onChange={(e) => setHours2(e.target.value)}
                        className="text-lg font-mono"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minutes2">Minutes</Label>
                      <Input
                        id="minutes2"
                        type="number"
                        placeholder="0"
                        value={minutes2}
                        onChange={(e) => setMinutes2(e.target.value)}
                        className="text-lg font-mono"
                        min="0"
                        max="59"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="seconds2">Seconds</Label>
                      <Input
                        id="seconds2"
                        type="number"
                        placeholder="0"
                        value={seconds2}
                        onChange={(e) => setSeconds2(e.target.value)}
                        className="text-lg font-mono"
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Time Formats:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• HH:MM:SS (Hours:Minutes:Seconds)</p>
                    <p>• 24-hour format supported</p>
                    <p>• Automatic overflow handling</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2:30:15 + 1:45:30 = 4:15:45</p>
                    <p>• 5:20:00 - 2:15:30 = 3:04:30</p>
                    <p>• 0:45:30 + 0:30:45 = 1:16:15</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTime} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Time Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.hours}:{results.minutes.toString().padStart(2, "0")}:
                            {results.seconds.toString().padStart(2, "0")}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(
                                `${results.hours}:${results.minutes.toString().padStart(2, "0")}:${results.seconds.toString().padStart(2, "0")}`,
                              )
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
                        <span className="font-medium text-gray-700">Total Seconds:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.totalSeconds}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalSeconds.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Hours:</span>
                        <span className="text-xl font-bold text-violet-600 font-mono">{results.hours}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Operation: {operation === "add" ? "Addition" : "Subtraction"}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Work hour calculations</p>
                        <p>• Project time tracking</p>
                        <p>• Schedule planning</p>
                        <p>• Duration measurements</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter time values to calculate time operations</p>
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
