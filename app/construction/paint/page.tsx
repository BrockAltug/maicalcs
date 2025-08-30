"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PaintCalculatorPage() {
  const [surfaceType, setSurfaceType] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [coats, setCoats] = useState("2")
  const [results, setResults] = useState<{
    area: number
    paintNeeded: number
    gallons: number
    liters: number
    cost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePaint = () => {
    try {
      if (!surfaceType || !length || !width) {
        alert("Please fill in required fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)
      const h = height ? Number.parseFloat(height) : 0
      const numCoats = Number.parseFloat(coats)

      if (l <= 0 || w <= 0 || numCoats <= 0) {
        alert("All values must be positive numbers.")
        return
      }

      let area = 0
      let coverage = 10 // m² per liter (average coverage)

      if (surfaceType === "wall") {
        if (!height) {
          alert("Please enter height for wall calculation.")
          return
        }
        if (h <= 0) {
          alert("Height must be a positive number.")
          return
        }
        // Calculate wall area (2 walls of length×height + 2 walls of width×height)
        area = 2 * (l * h + w * h)
      } else if (surfaceType === "ceiling" || surfaceType === "floor") {
        area = l * w
      } else if (surfaceType === "room") {
        if (!height) {
          alert("Please enter height for room calculation.")
          return
        }
        if (h <= 0) {
          alert("Height must be a positive number.")
          return
        }
        // Calculate total room area (walls + ceiling)
        area = 2 * (l * h + w * h) + l * w
      }

      // Adjust coverage based on surface type
      if (surfaceType === "ceiling") {
        coverage = 8 // Ceilings typically need more paint
      } else if (surfaceType === "room") {
        coverage = 9 // Mixed surfaces
      }

      const totalArea = area * numCoats
      const paintNeeded = totalArea / coverage // liters
      const gallons = paintNeeded * 0.264172 // Convert to gallons
      const liters = paintNeeded

      // Cost calculation: $35 per gallon
      const cost = Math.ceil(gallons) * 35

      setResults({
        area,
        paintNeeded,
        gallons,
        liters,
        cost,
        formula: `${area.toFixed(2)} m² × ${numCoats} coats ÷ ${coverage} m²/L = ${paintNeeded.toFixed(2)} L`,
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
    setSurfaceType("")
    setLength("")
    setWidth("")
    setHeight("")
    setCoats("2")
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
              <Paintbrush className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Paint Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate paint quantities needed for walls and surfaces with MaiCalcs. Perfect for interior and exterior
              painting projects.
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
                  <span>Paint Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="surfaceType">Surface Type</Label>
                  <Select value={surfaceType} onValueChange={setSurfaceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select surface type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wall">Walls Only</SelectItem>
                      <SelectItem value="ceiling">Ceiling Only</SelectItem>
                      <SelectItem value="floor">Floor Only</SelectItem>
                      <SelectItem value="room">Entire Room</SelectItem>
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
                    placeholder="Enter length"
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">Width (meters)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Enter width"
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                {(surfaceType === "wall" || surfaceType === "room") && (
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (meters)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Enter height"
                      className="text-lg font-mono"
                      step="0.1"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="coats">Number of Coats</Label>
                  <Select value={coats} onValueChange={setCoats}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Coat</SelectItem>
                      <SelectItem value="2">2 Coats</SelectItem>
                      <SelectItem value="3">3 Coats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Paint Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Coverage area calculation</p>
                    <p>• Paint quantity in liters/gallons</p>
                    <p>• Multiple coats consideration</p>
                    <p>• Cost estimation</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Coverage Rates:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Walls: 10 m² per liter</p>
                    <p>• Ceilings: 8 m² per liter</p>
                    <p>• Primer: 12 m² per liter</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePaint} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Paint Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Surface Area:</span>
                        <span className="text-xl font-bold text-orange-600 font-mono">
                          {results.area.toFixed(2)} m²
                        </span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Paint Needed (Liters):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.liters.toFixed(2)} L
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.liters.toFixed(2)} L`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Paint Needed (Gallons):</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.gallons.toFixed(2)} gal
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Estimated Cost:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">${results.cost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Surface type: {surfaceType}</p>
                        <p>• Number of coats: {coats}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Interior wall painting</p>
                        <p>• Ceiling painting projects</p>
                        <p>• Exterior house painting</p>
                        <p>• Commercial painting jobs</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Paintbrush className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select surface type and enter dimensions to calculate paint needed</p>
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
