"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, ThermometerSun, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SidewalkTemperatureCalculator() {
  const [airTemp, setAirTemp] = useState("")
  const [tempUnit, setTempUnit] = useState("F")
  const [sunExposure, setSunExposure] = useState("full")
  const [results, setResults] = useState<{ sidewalkTempF: number; sidewalkTempC: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateSidewalkTemp = () => {
    const temp = Number.parseFloat(airTemp)
    if (isNaN(temp)) {
      alert("Please enter a valid air temperature.")
      return
    }

    let tempInF = temp
    if (tempUnit === "C") {
      tempInF = temp * 1.8 + 32
    }

    let tempIncrease = 0
    if (sunExposure === "full") {
      tempIncrease = 50
    } else if (sunExposure === "partial") {
      tempIncrease = 30
    } else if (sunExposure === "shade") {
      tempIncrease = 10
    }

    const sidewalkTempF = tempInF + tempIncrease
    const sidewalkTempC = (sidewalkTempF - 32) / 1.8

    setResults({ sidewalkTempF, sidewalkTempC })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setAirTemp("")
    setTempUnit("F")
    setSunExposure("full")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <ThermometerSun className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Sidewalk Temperature Estimator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate how hot pavement can get based on the air temperature. Important for pet safety!
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
                  <span>Weather Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="airTemp">Air Temperature</Label>
                  <div className="flex">
                    <Input
                      id="airTemp"
                      type="number"
                      placeholder="e.g., 85"
                      value={airTemp}
                      onChange={(e) => setAirTemp(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Select value={tempUnit} onValueChange={setTempUnit}>
                      <SelectTrigger className="w-[120px] rounded-l-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="F">°F</SelectItem>
                        <SelectItem value="C">°C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sunExposure">Sun Exposure</Label>
                  <Select value={sunExposure} onValueChange={setSunExposure}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full, direct sun</SelectItem>
                      <SelectItem value="partial">Partly cloudy / partial sun</SelectItem>
                      <SelectItem value="shade">Full shade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    The 5-Second Rule: If you can't hold the back of your hand on the pavement for 5 seconds, it's too
                    hot for your dog's paws.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSidewalkTemp} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Estimate
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
                  <span>Estimated Pavement Temp</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Temperature:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">
                            {results.sidewalkTempF.toFixed(1)}°F
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.sidewalkTempF.toFixed(1))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end items-center mt-1">
                        <span className="text-lg font-bold text-purple-600 font-mono">
                          {results.sidewalkTempC.toFixed(1)}°C
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Pet Paw Safety:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>Walk pets on grass or during cooler parts of the day (early morning, late evening).</li>
                        <li>Consider protective dog booties for hot climates.</li>
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Disclaimer:</h4>
                      <p className="text-sm text-gray-700">
                        This is an estimation. Actual temperatures can vary based on surface color, material, and time
                        of day.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter conditions to estimate pavement temperature</p>
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
