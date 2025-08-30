"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Flag, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function AccFuelCalculator() {
  const [lapMinutes, setLapMinutes] = useState("")
  const [lapSeconds, setLapSeconds] = useState("")
  const [fuelPerLap, setFuelPerLap] = useState("")
  const [raceMinutes, setRaceMinutes] = useState("")
  const [extraLaps, setExtraLaps] = useState("1")
  const [results, setResults] = useState<{ totalFuelNeeded: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateFuel = () => {
    const lapMins = Number.parseFloat(lapMinutes) || 0
    const lapSecs = Number.parseFloat(lapSeconds) || 0
    const fuel = Number.parseFloat(fuelPerLap)
    const raceMins = Number.parseFloat(raceMinutes)
    const extra = Number.parseFloat(extraLaps)

    if (isNaN(fuel) || isNaN(raceMins) || (lapMins === 0 && lapSecs === 0)) {
      alert("Please enter valid numbers for all required fields.")
      return
    }

    const totalLapTimeInSeconds = lapMins * 60 + lapSecs
    if (totalLapTimeInSeconds <= 0) {
      alert("Lap time must be greater than zero.")
      return
    }
    const raceDurationInSeconds = raceMins * 60
    const raceLaps = raceDurationInSeconds / totalLapTimeInSeconds
    const totalLaps = raceLaps + extra

    const totalFuelNeeded = totalLaps * fuel

    setResults({ totalFuelNeeded })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setLapMinutes("")
    setLapSeconds("")
    setFuelPerLap("")
    setRaceMinutes("")
    setExtraLaps("1")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Flag className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ACC Fuel Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the required fuel for your Assetto Corsa Competizione races to never run out of fuel again.
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
                  <Calculator className="h-5 w-5 text-indigo-600" />
                  <span>Race Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Average Lap Time</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      placeholder="Mins"
                      value={lapMinutes}
                      onChange={(e) => setLapMinutes(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Secs"
                      value={lapSeconds}
                      onChange={(e) => setLapSeconds(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelPerLap">Fuel per Lap (liters)</Label>
                  <Input
                    id="fuelPerLap"
                    type="number"
                    placeholder="e.g., 2.8"
                    value={fuelPerLap}
                    onChange={(e) => setFuelPerLap(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="raceMinutes">Race Duration (minutes)</Label>
                  <Input
                    id="raceMinutes"
                    type="number"
                    placeholder="e.g., 20"
                    value={raceMinutes}
                    onChange={(e) => setRaceMinutes(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="extraLaps">Extra Laps for Safety</Label>
                  <Input
                    id="extraLaps"
                    type="number"
                    placeholder="e.g., 1"
                    value={extraLaps}
                    onChange={(e) => setExtraLaps(e.target.value)}
                  />
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    Always add at least one extra lap of fuel for the formation lap and to be safe from any final lap
                    battles.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={calculateFuel} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <span>Required Fuel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Fuel Needed:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">
                            {results.totalFuelNeeded.toFixed(2)} L
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalFuelNeeded.toFixed(2))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Sim Racing Tips:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>If you're good at saving fuel, you might use a slightly lower fuel-per-lap value.</li>
                        <li>Fuel usage can change with track temperature and tire wear.</li>
                        <li>This calculation includes your specified number of extra laps.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter race data to calculate required fuel</p>
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
