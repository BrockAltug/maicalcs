"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function RoofingCalculatorPage() {
  const [roofType, setRoofType] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [pitch, setPitch] = useState("")
  const [results, setResults] = useState<{
    area: number
    adjustedArea: number
    shingles: number
    underlayment: number
    ridgeLength: number
    cost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateRoofing = () => {
    try {
      if (!roofType || !length || !width || !pitch) {
        alert("Please fill in all fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)
      const p = Number.parseFloat(pitch)

      if (l <= 0 || w <= 0 || p <= 0) {
        alert("All values must be positive numbers.")
        return
      }

      // Calculate roof area with pitch adjustment
      const baseArea = l * w
      const pitchMultiplier = Math.sqrt(1 + Math.pow(p / 12, 2))
      const adjustedArea = baseArea * pitchMultiplier

      // Add 10% waste factor
      const wasteArea = adjustedArea * 1.1

      // Calculate materials based on roof type
      let shingles = 0
      let ridgeLength = 0

      if (roofType === "gable") {
        shingles = Math.ceil(wasteArea / 3.05) // bundles (3.05 m² per bundle)
        ridgeLength = l // Ridge runs along the length
      } else if (roofType === "hip") {
        shingles = Math.ceil(wasteArea / 3.05)
        ridgeLength = l + w // Hip roof has more ridge
      } else if (roofType === "shed") {
        shingles = Math.ceil(wasteArea / 3.05)
        ridgeLength = 0 // No ridge on shed roof
      } else if (roofType === "gambrel") {
        shingles = Math.ceil(wasteArea / 3.05)
        ridgeLength = l * 1.5 // More complex ridge system
      }

      const underlayment = Math.ceil(wasteArea / 37.16) // rolls (37.16 m² per roll)

      // Cost estimation
      const shingleCost = shingles * 35 // $35 per bundle
      const underlaymentCost = underlayment * 45 // $45 per roll
      const ridgeCost = ridgeLength * 8 // $8 per linear meter
      const cost = shingleCost + underlaymentCost + ridgeCost

      setResults({
        area: baseArea,
        adjustedArea: wasteArea,
        shingles,
        underlayment,
        ridgeLength,
        cost,
        formula: `${l}m × ${w}m × pitch factor (${pitchMultiplier.toFixed(2)}) = ${adjustedArea.toFixed(2)} m²`,
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
    setRoofType("")
    setLength("")
    setWidth("")
    setPitch("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Home className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Roofing Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate shingles, underlayment, and roofing materials needed with MaiCalcs. Perfect for roofing
              contractors and homeowners.
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
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span>Roof Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="roofType">Roof Type</Label>
                  <Select value={roofType} onValueChange={setRoofType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select roof type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gable">Gable Roof</SelectItem>
                      <SelectItem value="hip">Hip Roof</SelectItem>
                      <SelectItem value="shed">Shed Roof</SelectItem>
                      <SelectItem value="gambrel">Gambrel Roof</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Length (meters)</Label>
                  <Input
                    id="length"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Enter roof length"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">Width (meters)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Enter roof width"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitch">Roof Pitch (rise/run)</Label>
                  <Input
                    id="pitch"
                    type="number"
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    placeholder="Enter pitch (e.g., 6 for 6/12)"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Roofing Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Adjusted area for pitch</p>
                    <p>• Shingle bundles needed</p>
                    <p>• Underlayment rolls</p>
                    <p>• Ridge length calculation</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Gable roof: 12m × 8m, 6/12 pitch</p>
                    <p>• Hip roof: 10m × 10m, 4/12 pitch</p>
                    <p>• Shed roof: 6m × 4m, 2/12 pitch</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateRoofing} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <ArrowRight className="h-5 w-5 text-red-600" />
                  <span>Roofing Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Base Area:</span>
                        <span className="text-xl font-bold text-orange-600 font-mono">
                          {results.area.toFixed(2)} m²
                        </span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Adjusted Area:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.adjustedArea.toFixed(2)} m²
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.adjustedArea.toFixed(2)} m²`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Shingle Bundles:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">{results.shingles} bundles</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Underlayment Rolls:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.underlayment} rolls
                        </span>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Ridge Length:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">
                          {results.ridgeLength.toFixed(1)} m
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Estimated Cost:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-emerald-600 font-mono">
                            ${results.cost.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`$${results.cost.toFixed(2)}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Roof type: {roofType}</p>
                        <p>
                          • Total materials: {results.shingles} bundles + {results.underlayment} rolls
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Roofing material estimation</p>
                        <p>• Project cost budgeting</p>
                        <p>• Contractor bidding</p>
                        <p>• DIY roofing projects</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select roof type and enter dimensions to calculate materials needed</p>
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
