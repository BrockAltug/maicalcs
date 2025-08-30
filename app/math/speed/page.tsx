"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SpeedCalculatorPage() {
  const [distance, setDistance] = useState("")
  const [time, setTime] = useState("")
  const [speed, setSpeed] = useState("")
  const [calculateType, setCalculateType] = useState("speed")
  const [distanceUnit, setDistanceUnit] = useState("km")
  const [timeUnit, setTimeUnit] = useState("hours")
  const [results, setResults] = useState<{
    value: number
    unit: string
    conversions: { unit: string; value: number }[]
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const convertDistance = (value: number, from: string, to: string): number => {
    const toMeters: { [key: string]: number } = {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      inch: 0.0254,
      ft: 0.3048,
      yard: 0.9144,
      mile: 1609.34,
    }
    return (value * toMeters[from]) / toMeters[to]
  }

  const convertTime = (value: number, from: string, to: string): number => {
    const toSeconds: { [key: string]: number } = {
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
    }
    return (value * toSeconds[from]) / toSeconds[to]
  }

  const calculate = () => {
    try {
      const d = Number.parseFloat(distance)
      const t = Number.parseFloat(time)
      const s = Number.parseFloat(speed)

      if (calculateType === "speed" && !isNaN(d) && !isNaN(t) && d > 0 && t > 0) {
        const speedValue = d / t
        const speedUnit = `${distanceUnit}/${timeUnit}`

        const conversions = [
          { unit: "m/s", value: convertDistance(speedValue, distanceUnit, "m") / convertTime(1, timeUnit, "seconds") },
          { unit: "km/h", value: convertDistance(speedValue, distanceUnit, "km") / convertTime(1, timeUnit, "hours") },
          { unit: "mph", value: convertDistance(speedValue, distanceUnit, "mile") / convertTime(1, timeUnit, "hours") },
          {
            unit: "ft/s",
            value: convertDistance(speedValue, distanceUnit, "ft") / convertTime(1, timeUnit, "seconds"),
          },
        ]

        setResults({
          value: Number.parseFloat(speedValue.toFixed(4)),
          unit: speedUnit,
          conversions,
          formula: `Speed = Distance ÷ Time = ${d} ÷ ${t}`,
        })
      } else if (calculateType === "distance" && !isNaN(s) && !isNaN(t) && s > 0 && t > 0) {
        const distanceValue = s * t

        const conversions = [
          { unit: "m", value: convertDistance(distanceValue, distanceUnit, "m") },
          { unit: "km", value: convertDistance(distanceValue, distanceUnit, "km") },
          { unit: "miles", value: convertDistance(distanceValue, distanceUnit, "mile") },
          { unit: "ft", value: convertDistance(distanceValue, distanceUnit, "ft") },
        ]

        setResults({
          value: Number.parseFloat(distanceValue.toFixed(4)),
          unit: distanceUnit,
          conversions,
          formula: `Distance = Speed × Time = ${s} × ${t}`,
        })
      } else if (calculateType === "time" && !isNaN(s) && !isNaN(d) && s > 0 && d > 0) {
        const timeValue = d / s

        const conversions = [
          { unit: "seconds", value: convertTime(timeValue, timeUnit, "seconds") },
          { unit: "minutes", value: convertTime(timeValue, timeUnit, "minutes") },
          { unit: "hours", value: convertTime(timeValue, timeUnit, "hours") },
          { unit: "days", value: convertTime(timeValue, timeUnit, "days") },
        ]

        setResults({
          value: Number.parseFloat(timeValue.toFixed(4)),
          unit: timeUnit,
          conversions,
          formula: `Time = Distance ÷ Speed = ${d} ÷ ${s}`,
        })
      } else {
        alert("Please enter valid positive numbers for the required fields.")
        return
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
    setDistance("")
    setTime("")
    setSpeed("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-white font-bold text-lg">⚡</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Speed Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate speed, distance, or time using the fundamental relationship: Speed = Distance ÷ Time with
              MaiCalcs. Convert between different units and get detailed step-by-step solutions.
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
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Speed Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Calculate</Label>
                  <Select value={calculateType} onValueChange={setCalculateType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="speed">Speed (from distance and time)</SelectItem>
                      <SelectItem value="distance">Distance (from speed and time)</SelectItem>
                      <SelectItem value="time">Time (from distance and speed)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculateType !== "distance" && (
                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance</Label>
                    <div className="flex gap-2">
                      <Input
                        id="distance"
                        type="number"
                        placeholder="Enter distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        className="text-lg font-mono"
                        step="0.01"
                      />
                      <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mm">mm</SelectItem>
                          <SelectItem value="cm">cm</SelectItem>
                          <SelectItem value="m">m</SelectItem>
                          <SelectItem value="km">km</SelectItem>
                          <SelectItem value="inch">inch</SelectItem>
                          <SelectItem value="ft">ft</SelectItem>
                          <SelectItem value="yard">yard</SelectItem>
                          <SelectItem value="mile">mile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {calculateType !== "time" && (
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="flex gap-2">
                      <Input
                        id="time"
                        type="number"
                        placeholder="Enter time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="text-lg font-mono"
                        step="0.01"
                      />
                      <Select value={timeUnit} onValueChange={setTimeUnit}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="seconds">sec</SelectItem>
                          <SelectItem value="minutes">min</SelectItem>
                          <SelectItem value="hours">hr</SelectItem>
                          <SelectItem value="days">days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {calculateType !== "speed" && (
                  <div className="space-y-2">
                    <Label htmlFor="speed">Speed</Label>
                    <Input
                      id="speed"
                      type="number"
                      placeholder={`Enter speed (${distanceUnit}/${timeUnit})`}
                      value={speed}
                      onChange={(e) => setSpeed(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                    />
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Speed Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Speed = Distance ÷ Time</p>
                    <p>• Distance = Speed × Time</p>
                    <p>• Time = Distance ÷ Speed</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Example:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• A car travels 120 km in 2 hours</p>
                    <p>• Speed = 120 km ÷ 2 hours = 60 km/h</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <span>Calculation Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {results.value} {results.unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.value} ${results.unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Unit Conversions:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {results.conversions.map((conv, index) => (
                          <div key={index} className="bg-green-50 p-3 rounded-lg">
                            <div className="text-sm font-semibold text-green-700">{conv.unit}</div>
                            <div className="text-green-800 font-mono">{conv.value.toFixed(4)}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700">
                        <p>• {results.formula}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Vehicle speed calculations</p>
                        <p>• Travel time planning</p>
                        <p>• Physics problems</p>
                        <p>• Sports performance analysis</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div className="text-white font-bold text-lg">⚡</div>
                    </div>
                    <p className="text-gray-500">Enter values to calculate speed, distance, or time</p>
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
