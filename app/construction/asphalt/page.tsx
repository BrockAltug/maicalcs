"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function AsphaltCalculatorPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [thickness, setThickness] = useState("")
  const [unit, setUnit] = useState("meters")
  const [results, setResults] = useState<{
    area: number
    volume: number
    tonnage: number
    cost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateAsphalt = () => {
    try {
      if (!length || !width || !thickness) {
        alert("Please fill in all fields.")
        return
      }

      let l = Number.parseFloat(length)
      let w = Number.parseFloat(width)
      let t = Number.parseFloat(thickness)

      if (l <= 0 || w <= 0 || t <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      // Convert to meters if needed
      if (unit === "feet") {
        l = l * 0.3048
        w = w * 0.3048
        t = t * 0.0254 // inches to meters
      } else {
        t = t / 100 // cm to meters
      }

      const area = l * w
      const volume = area * t

      // Asphalt density: approximately 2.3 tonnes per cubic meter
      const tonnage = volume * 2.3

      // Cost estimation: $100 per tonne
      const cost = tonnage * 100

      const unitLabel = unit === "feet" ? "ft" : "m"
      const thicknessUnit = unit === "feet" ? "in" : "cm"

      setResults({
        area,
        volume,
        tonnage,
        cost,
        formula: `${length}${unitLabel} × ${width}${unitLabel} × ${thickness}${thicknessUnit} = ${volume.toFixed(3)} m³`,
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
    setThickness("")
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
              <Layers className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Asphalt Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate asphalt quantities for driveways and roads with MaiCalcs. Perfect for paving contractors and
              homeowners planning asphalt projects.
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
                  <span>Asphalt Dimensions</span>
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
                  <Label htmlFor="thickness">Thickness ({unit === "feet" ? "inches" : "cm"})</Label>
                  <Input
                    id="thickness"
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="Enter thickness"
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Asphalt Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Area coverage calculation</p>
                    <p>• Volume in cubic meters</p>
                    <p>• Tonnage estimation</p>
                    <p>• Cost calculation</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Typical Thickness:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Driveway: 5-7.5cm (2-3 inches)</p>
                    <p>• Parking lot: 7.5-10cm (3-4 inches)</p>
                    <p>• Road: 10-15cm (4-6 inches)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateAsphalt} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Asphalt Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Area:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.area.toFixed(2)} m²
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.area.toFixed(2)} m²`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Volume:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.volume.toFixed(3)} m³
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Tonnage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {results.tonnage.toFixed(2)} tonnes
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.tonnage.toFixed(2)} tonnes`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
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
                        <p>• Density: 2.3 tonnes/m³</p>
                        <p>• Total tonnage: {results.tonnage.toFixed(2)} tonnes</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Driveway paving projects</p>
                        <p>• Parking lot construction</p>
                        <p>• Road resurfacing</p>
                        <p>• Material ordering and budgeting</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Layers className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions to calculate asphalt quantities</p>
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
