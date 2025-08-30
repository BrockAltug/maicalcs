"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Timer, Footprints } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PaceCalculatorPage() {
  const [distance, setDistance] = useState("")
  const [unit, setUnit] = useState("km")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [results, setResults] = useState<{
    pacePerKm: string
    pacePerMile: string
    speedKph: string
    speedMph: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePace = () => {
    try {
      const dist = Number.parseFloat(distance)
      const h = Number.parseInt(hours) || 0
      const m = Number.parseInt(minutes) || 0
      const s = Number.parseInt(seconds) || 0

      if (dist <= 0 || (h === 0 && m === 0 && s === 0)) {
        alert("Please enter a valid distance and time.")
        return
      }

      const totalSeconds = h * 3600 + m * 60 + s
      const distKm = unit === "km" ? dist : dist * 1.60934
      const distMiles = unit === "miles" ? dist : dist / 1.60934

      const secPerKm = totalSeconds / distKm
      const secPerMile = totalSeconds / distMiles

      const formatPace = (sec: number) => {
        const paceMin = Math.floor(sec / 60)
        const paceSec = Math.round(sec % 60)
        return `${paceMin.toString().padStart(2, "0")}:${paceSec.toString().padStart(2, "0")}`
      }

      const speedKph = distKm / (totalSeconds / 3600)
      const speedMph = distMiles / (totalSeconds / 3600)

      setResults({
        pacePerKm: formatPace(secPerKm),
        pacePerMile: formatPace(secPerMile),
        speedKph: speedKph.toFixed(2),
        speedMph: speedMph.toFixed(2),
        formula: `Pace = ${h}h ${m}m ${s}s / ${dist} ${unit}`,
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
    setDistance("")
    setHours("")
    setMinutes("")
    setSeconds("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Timer className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Pace Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your running, walking, or cycling pace and speed based on distance and time.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-red-600" />
                  <span>Run Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="distance"
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      placeholder="e.g., 10"
                    />
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="km">km</SelectItem>
                        <SelectItem value="miles">miles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="hh" />
                    <Input
                      type="number"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      placeholder="mm"
                    />
                    <Input
                      type="number"
                      value={seconds}
                      onChange={(e) => setSeconds(e.target.value)}
                      placeholder="ss"
                    />
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Pace Formula:</h4>
                  <p className="text-sm text-red-700">Pace = Time / Distance</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Training Tip:</h4>
                  <p className="text-sm text-green-700">
                    Consistent pacing is key for endurance events. Use this calculator to set targets for your training
                    runs.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePace} className="flex-1 bg-red-600 hover:bg-red-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-orange-600" />
                  <span>Your Pace & Speed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Pace per km:</span>
                        <span className="text-xl font-bold text-red-600 font-mono">{results.pacePerKm} /km</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium text-gray-700">Pace per mile:</span>
                        <span className="text-xl font-bold text-red-600 font-mono">{results.pacePerMile} /mi</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Speed (kph):</span>
                        <span className="text-xl font-bold text-green-600 font-mono">{results.speedKph} km/h</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium text-gray-700">Speed (mph):</span>
                        <span className="text-xl font-bold text-green-600 font-mono">{results.speedMph} mph</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <p className="text-sm text-yellow-700 font-mono">{results.formula}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Footprints className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter distance and time to calculate your pace.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <AdBanner />
      </div>

      <Footer />
    </div>
  )
}
