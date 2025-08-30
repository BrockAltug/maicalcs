"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Fuel, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("")
  const [efficiency, setEfficiency] = useState("")
  const [price, setPrice] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("miles")
  const [efficiencyUnit, setEfficiencyUnit] = useState("mpg")
  const [priceUnit, setPriceUnit] = useState("gallon")
  const [results, setResults] = useState<{ totalCost: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateFuelCost = () => {
    const dist = Number.parseFloat(distance)
    const eff = Number.parseFloat(efficiency)
    const prc = Number.parseFloat(price)

    if (isNaN(dist) || isNaN(eff) || isNaN(prc) || dist <= 0 || eff <= 0 || prc <= 0) {
      alert("Please enter valid positive numbers for all fields.")
      return
    }

    let distInMiles = dist
    if (distanceUnit === "km") distInMiles = dist * 0.621371

    let effInMpg = eff
    if (efficiencyUnit === "l100km") effInMpg = 235.214 / eff
    if (efficiencyUnit === "kml") effInMpg = eff * 2.35214

    let pricePerGallon = prc
    if (priceUnit === "liter") pricePerGallon = prc * 3.78541

    const gallonsNeeded = distInMiles / effInMpg
    const totalCost = gallonsNeeded * pricePerGallon

    setResults({ totalCost })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setDistance("")
    setEfficiency("")
    setPrice("")
    setDistanceUnit("miles")
    setEfficiencyUnit("mpg")
    setPriceUnit("gallon")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Fuel className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Fuel Cost Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate the total fuel cost for a trip based on distance, fuel efficiency, and gas price.
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
                  <span>Trip Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="distance">Trip Distance</Label>
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
                  <Label htmlFor="efficiency">Fuel Efficiency</Label>
                  <div className="flex">
                    <Input
                      id="efficiency"
                      type="number"
                      placeholder="e.g., 25"
                      value={efficiency}
                      onChange={(e) => setEfficiency(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Select value={efficiencyUnit} onValueChange={setEfficiencyUnit}>
                      <SelectTrigger className="w-[140px] rounded-l-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mpg">MPG</SelectItem>
                        <SelectItem value="l100km">L/100km</SelectItem>
                        <SelectItem value="kml">km/L</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Gas Price</Label>
                  <div className="flex">
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g., 3.50"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Select value={priceUnit} onValueChange={setPriceUnit}>
                      <SelectTrigger className="w-[120px] rounded-l-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gallon">per gallon</SelectItem>
                        <SelectItem value="liter">per liter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    Check local gas prices online before your trip for the most accurate cost estimate.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={calculateFuelCost} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                  <span>Trip Cost</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Estimated Cost:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">
                            ${results.totalCost.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalCost.toFixed(2))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Planning Tips:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>Use this tool to budget for road trips or daily commutes.</li>
                        <li>Consider round-trip distance if necessary.</li>
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Disclaimer:</h4>
                      <p className="text-sm text-gray-700">
                        Actual fuel consumption can be affected by driving style, terrain, weather, and vehicle load.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter trip details to estimate the fuel cost</p>
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
