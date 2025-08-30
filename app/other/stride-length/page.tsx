"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Footprints, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function StrideLengthCalculator() {
  const [distance, setDistance] = useState("")
  const [steps, setSteps] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("km")
  const [results, setResults] = useState<{ strideCm: number; strideInches: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateStrideLength = () => {
    const dist = Number.parseFloat(distance)
    const stps = Number.parseFloat(steps)

    if (isNaN(dist) || isNaN(stps) || dist <= 0 || stps <= 0) {
      alert("Please enter valid positive numbers for distance and steps.")
      return
    }

    let distanceInCm = dist
    if (distanceUnit === "km") {
      distanceInCm *= 100000
    } else if (distanceUnit === "miles") {
      distanceInCm *= 160934
    } else if (distanceUnit === "meters") {
      distanceInCm *= 100
    } else if (distanceUnit === "feet") {
      distanceInCm *= 30.48
    }

    const strideCm = distanceInCm / stps
    const strideInches = strideCm / 2.54

    setResults({ strideCm, strideInches })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setDistance("")
    setSteps("")
    setDistanceUnit("km")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Footprints className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Stride Length Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Determine your average stride length based on the distance you've covered and the steps you've taken.
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
                  <Label htmlFor="distance">Distance Covered</Label>
                  <div className="flex items-center">
                    <Input
                      id="distance"
                      type="number"
                      placeholder="e.g., 5"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                      <SelectTrigger className="w-[120px] rounded-l-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="km">km</SelectItem>
                        <SelectItem value="miles">miles</SelectItem>
                        <SelectItem value="meters">meters</SelectItem>
                        <SelectItem value="feet">feet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="steps">Number of Steps</Label>
                  <Input
                    id="steps"
                    type="number"
                    placeholder="e.g., 6250"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                  />
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">How it works:</h4>
                  <p className="text-sm text-indigo-700">
                    This calculator divides the total distance (converted to cm) by the total number of steps to find
                    the average length of a single stride.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    Your stride length differs between walking and running. Calculate them separately for better
                    accuracy.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateStrideLength} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                  <span>Your Stride Length</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Centimeters:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">
                            {results.strideCm.toFixed(2)} cm
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.strideCm.toFixed(2))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Inches:</span>
                        <span className="text-2xl font-bold text-purple-600 font-mono">
                          {results.strideInches.toFixed(2)} in
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Accuracy Tips:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>Use a GPS watch for accurate distance.</li>
                        <li>Count steps on a known distance track.</li>
                        <li>Maintain a consistent pace during measurement.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your data to calculate your stride length</p>
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
