"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function MaterialCalculatorPage() {
  const [materialType, setMaterialType] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [thickness, setThickness] = useState("")
  const [results, setResults] = useState<{
    volume: number
    quantity: number
    weight: number
    cost: number
    unit: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const materialData = {
    concrete: { density: 2400, unit: "cubic meters", cost: 100, coverage: 1 },
    lumber: { density: 500, unit: "board feet", cost: 3, coverage: 0.00236 }, // 1 board foot = 0.00236 m³
    drywall: { density: 800, unit: "sheets", cost: 15, coverage: 2.88 }, // 4x8 sheet = 2.88 m²
    gravel: { density: 1600, unit: "cubic meters", cost: 30, coverage: 1 },
  }

  const calculateMaterial = () => {
    try {
      if (!materialType || !length || !width || !thickness) {
        alert("Please fill in all fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)
      const t = Number.parseFloat(thickness) / 1000 // Convert mm to meters

      if (l <= 0 || w <= 0 || t <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      const volume = l * w * t // Volume in cubic meters
      const material = materialData[materialType as keyof typeof materialData]
      const weight = volume * material.density

      let quantity = 0
      let cost = 0

      if (materialType === "concrete" || materialType === "gravel") {
        quantity = volume * 1.1 // Add 10% waste factor
        cost = quantity * material.cost
      } else if (materialType === "lumber") {
        quantity = volume / material.coverage // Convert to board feet
        cost = quantity * material.cost
      } else if (materialType === "drywall") {
        const area = l * w
        quantity = Math.ceil(area / material.coverage) // Number of sheets needed
        cost = quantity * material.cost
      }

      setResults({
        volume,
        quantity,
        weight,
        cost,
        unit: material.unit,
        formula: `${l}m × ${w}m × ${thickness}mm = ${volume.toFixed(4)} m³`,
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
    setMaterialType("")
    setLength("")
    setWidth("")
    setThickness("")
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
              <Building className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Material Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate quantities of concrete, lumber, drywall, and other construction materials with MaiCalcs. Perfect
              for project planning and cost estimation.
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
                  <span>Material Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="materialType">Material Type</Label>
                  <Select value={materialType} onValueChange={setMaterialType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concrete">Concrete</SelectItem>
                      <SelectItem value="lumber">Lumber</SelectItem>
                      <SelectItem value="drywall">Drywall</SelectItem>
                      <SelectItem value="gravel">Gravel</SelectItem>
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
                  <Label htmlFor="thickness">Thickness (mm)</Label>
                  <Input
                    id="thickness"
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="Enter thickness"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Material Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Volume and quantity needed</p>
                    <p>• Weight estimation</p>
                    <p>• Cost calculation</p>
                    <p>• Waste factor included</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Concrete slab: 5m × 3m × 100mm</p>
                    <p>• Drywall wall: 4m × 2.4m × 12mm</p>
                    <p>• Lumber deck: 6m × 4m × 38mm</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateMaterial} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Material Results</span>
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
                            {results.volume.toFixed(4)} m³
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.volume.toFixed(4)} m³`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Quantity:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.quantity.toFixed(2)} {results.unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.quantity.toFixed(2)} ${results.unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weight:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.weight.toFixed(0)} kg
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
                        <p>• Material: {materialType}</p>
                        <p>
                          • Total quantity: {results.quantity.toFixed(2)} {results.unit}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Construction project planning</p>
                        <p>• Material ordering and budgeting</p>
                        <p>• Waste calculation and optimization</p>
                        <p>• Cost estimation and quotes</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select material type and enter dimensions to calculate quantities</p>
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
