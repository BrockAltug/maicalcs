"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Gauge, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function FuelConsumptionCalculator() {
  const [distance, setDistance] = useState("")
  const [fuelUsed, setFuelUsed] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("miles")
  const [fuelUnit, setFuelUnit] = useState("gallons")
  const [results, setResults] = useState<{ mpg: number; l100km: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateConsumption = () => {
    const dist = Number.parseFloat(distance)
    const fuel = Number.parseFloat(fuelUsed)

    if (isNaN(dist) || isNaN(fuel) || dist <= 0 || fuel <= 0) {
      alert("Please enter valid positive numbers for distance and fuel used.")
      return
    }

    let distInMiles = dist
    if (distanceUnit === "km") distInMiles = dist * 0.621371

    let fuelInGallons = fuel
    if (fuelUnit === "liters") fuelInGallons = fuel * 0.264172

    const mpg = distInMiles / fuelInGallons
    const l100km = 235.214 / mpg

    setResults({ mpg, l100km })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setDistance("")
    setFuelUsed("")
    setDistanceUnit("miles")
    setFuelUnit("gallons")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Gauge className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fuel Consumption Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your vehicle's fuel efficiency in MPG and L/100km based on distance traveled and fuel used.
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
                  <span>Your Data</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="distance">Distance Traveled</Label>
                  <div className="flex">
                    <Input
                      id="distance"
                      type="number"
                      placeholder="e.g., 300"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                      <SelectTrigger className="w-[120px] rounded-l-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miles">miles</SelectItem>
                        <SelectItem value="km">km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fuelUsed">Fuel Used</Label>
                  <div className="flex">
                    <Input
                      id="fuelUsed"
                      type="number"
                      placeholder="e.g., 12"
                      value={fuelUsed}
                      onChange={(e) => setFuelUsed(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Select value={fuelUnit} onValueChange={setFuelUnit}>
                      <SelectTrigger className="w-[120px] rounded-l-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gallons">gallons</SelectItem>
                        <SelectItem value="liters">liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">How to Measure:</h4>
                  <p className="text-sm text-indigo-700">
                    Fill your tank, reset your trip meter, drive, then refill. Use the distance driven and the amount of
                    fuel added to get an accurate reading.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    City and highway driving yield different results. Measure them separately for a clearer picture of
                    your car's efficiency.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateConsumption} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                  <span>Your Efficiency</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">MPG:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">{results.mpg.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.mpg.toFixed(2))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">L/100km:</span>
                        <span className="text-2xl font-bold text-purple-600 font-mono">
                          {results.l100km.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Understanding the Results:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>
                          <strong>MPG (Miles Per Gallon):</strong> Higher is better. Common in the US & UK.
                        </li>
                        <li>
                          <strong>L/100km (Liters per 100km):</strong> Lower is better. Common in Europe & Canada.
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your data to calculate fuel efficiency</p>
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
