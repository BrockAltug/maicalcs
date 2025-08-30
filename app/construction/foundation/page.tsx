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

export default function FoundationCalculatorPage() {
  const [foundationType, setFoundationType] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [thickness, setThickness] = useState("")
  const [depth, setDepth] = useState("")
  const [results, setResults] = useState<{
    volume: number
    cubicYards: number
    bags: number
    weight: number
    cost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateFoundation = () => {
    try {
      if (!foundationType || !length || !width || !thickness) {
        alert("Please fill in all required fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)
      const t = Number.parseFloat(thickness) / 100 // Convert cm to meters
      const d = depth ? Number.parseFloat(depth) / 100 : 0

      if (l <= 0 || w <= 0 || t <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      let volume = 0
      let formula = ""

      if (foundationType === "slab") {
        volume = l * w * t
        formula = `${l}m × ${w}m × ${thickness}cm = ${volume.toFixed(3)} m³`
      } else if (foundationType === "footing") {
        if (!depth) {
          alert("Please enter depth for footing.")
          return
        }
        if (d <= 0) {
          alert("Depth must be a positive number.")
          return
        }
        volume = l * w * d
        formula = `${l}m × ${w}m × ${depth}cm = ${volume.toFixed(3)} m³`
      } else if (foundationType === "wall") {
        if (!depth) {
          alert("Please enter height for wall.")
          return
        }
        if (d <= 0) {
          alert("Height must be a positive number.")
          return
        }
        volume = l * t * d
        formula = `${l}m × ${thickness}cm × ${depth}cm = ${volume.toFixed(3)} m³`
      }

      const cubicYards = volume * 1.308
      const bags = Math.ceil(volume * 108) // 80lb bags per cubic meter
      const weight = volume * 2400 // kg
      const cost = bags * 4.5 // $4.50 per bag

      setResults({
        volume,
        cubicYards,
        bags,
        weight,
        cost,
        formula,
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
    setFoundationType("")
    setLength("")
    setWidth("")
    setThickness("")
    setDepth("")
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
              Foundation Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate concrete needed for foundations, slabs, and footings with MaiCalcs. Perfect for construction
              foundation planning.
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
                  <span>Foundation Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="foundationType">Foundation Type</Label>
                  <Select value={foundationType} onValueChange={setFoundationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select foundation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slab">Concrete Slab</SelectItem>
                      <SelectItem value="footing">Footing</SelectItem>
                      <SelectItem value="wall">Foundation Wall</SelectItem>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thickness">{foundationType === "wall" ? "Thickness (cm)" : "Thickness (cm)"}</Label>
                  <Input
                    id="thickness"
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="Enter thickness"
                    className="text-lg font-mono"
                  />
                </div>

                {(foundationType === "footing" || foundationType === "wall") && (
                  <div className="space-y-2">
                    <Label htmlFor="depth">{foundationType === "footing" ? "Depth (cm)" : "Height (cm)"}</Label>
                    <Input
                      id="depth"
                      type="number"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      placeholder={foundationType === "footing" ? "Enter depth" : "Enter height"}
                      className="text-lg font-mono"
                    />
                  </div>
                )}

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Foundation Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Concrete volume needed</p>
                    <p>• Number of concrete bags</p>
                    <p>• Weight estimation</p>
                    <p>• Cost calculation</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Slab: 10m × 8m × 15cm</p>
                    <p>• Footing: 12m × 0.6m × 0.8m</p>
                    <p>• Wall: 20m × 20cm × 2.4m</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateFoundation} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Foundation Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Volume (m³):</span>
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
                        <span className="font-medium text-gray-700">Concrete Bags (80lb):</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">{results.bags} bags</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weight:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.weight.toFixed(0)} kg
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
                        <p>• Foundation type: {foundationType}</p>
                        <p>• Total bags needed: {results.bags}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Foundation construction planning</p>
                        <p>• Concrete ordering and budgeting</p>
                        <p>• Material estimation for contractors</p>
                        <p>• DIY foundation projects</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Home className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Select foundation type and enter dimensions to calculate concrete needed
                    </p>
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
