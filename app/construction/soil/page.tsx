"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SoilCalculatorPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [depth, setDepth] = useState("")
  const [soilType, setSoilType] = useState("topsoil")
  const [unit, setUnit] = useState("meters")
  const [results, setResults] = useState<{
    volume: number
    cubicYards: number
    tonnage: number
    bags: number
    cost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const soilTypes = {
    topsoil: { density: 1.2, cost: 40, bagSize: 0.04 }, // tonnes/m³, $/tonne, m³/bag
    compost: { density: 0.8, cost: 50, bagSize: 0.04 },
    sand: { density: 1.6, cost: 25, bagSize: 0.04 },
    clay: { density: 1.8, cost: 30, bagSize: 0.04 },
    gravel: { density: 1.7, cost: 35, bagSize: 0.04 },
  }

  const calculateSoil = () => {
    try {
      if (!length || !width || !depth) {
        alert("Please fill in all fields.")
        return
      }

      let l = Number.parseFloat(length)
      let w = Number.parseFloat(width)
      let d = Number.parseFloat(depth)

      if (l <= 0 || w <= 0 || d <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      // Convert to meters if needed
      if (unit === "feet") {
        l = l * 0.3048
        w = w * 0.3048
        d = d * 0.0254 // inches to meters
      } else {
        d = d / 100 // cm to meters
      }

      const volume = l * w * d
      const cubicYards = volume * 1.308

      const soil = soilTypes[soilType as keyof typeof soilTypes]
      const tonnage = volume * soil.density
      const bags = Math.ceil(volume / soil.bagSize)
      const cost = tonnage * soil.cost

      const unitLabel = unit === "feet" ? "ft" : "m"
      const depthUnit = unit === "feet" ? "in" : "cm"

      setResults({
        volume,
        cubicYards,
        tonnage,
        bags,
        cost,
        formula: `${length}${unitLabel} × ${width}${unitLabel} × ${depth}${depthUnit} = ${volume.toFixed(3)} m³`,
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
    setLength("")
    setWidth("")
    setDepth("")
    setSoilType("topsoil")
    setUnit("meters")
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
              <Mountain className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Soil Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate soil, dirt, and fill material quantities with MaiCalcs. Perfect for landscaping and gardening
              projects.
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
                  <span>Soil Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Metric (meters/cm)</SelectItem>
                      <SelectItem value="feet">Imperial (feet/inches)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Length ({unit === "feet" ? "feet" : "meters"})</Label>
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
                  <Label htmlFor="width">Width ({unit === "feet" ? "feet" : "meters"})</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="depth">Depth ({unit === "feet" ? "inches" : "cm"})</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="Enter depth"
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="topsoil">Topsoil</SelectItem>
                      <SelectItem value="compost">Compost</SelectItem>
                      <SelectItem value="sand">Sand</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="gravel">Gravel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Soil Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Volume in cubic meters/yards</p>
                    <p>• Weight in tonnes</p>
                    <p>• Number of bags needed</p>
                    <p>• Cost estimation</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Typical Depths:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Lawn: 10-15cm (4-6 inches)</p>
                    <p>• Garden beds: 20-30cm (8-12 inches)</p>
                    <p>• Tree planting: 30-45cm (12-18 inches)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSoil} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Soil Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Volume:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.volume.toFixed(3)} m³
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.volume.toFixed(3)} m³`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Cubic Yards:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.cubicYards.toFixed(2)} yd³
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Tonnage:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.tonnage.toFixed(2)} tonnes
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Bags Needed:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">{results.bags} bags</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Estimated Cost:</span>
                        <span className="text-xl font-bold text-emerald-600 font-mono">${results.cost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Soil type: {soilType}</p>
                        <p>• Total weight: {results.tonnage.toFixed(2)} tonnes</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Landscaping and gardening</p>
                        <p>• Lawn installation</p>
                        <p>• Raised bed construction</p>
                        <p>• Site preparation and grading</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mountain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions and soil type to calculate quantities needed</p>
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
