"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function AreaCalculatorPage() {
  const [shape, setShape] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [radius, setRadius] = useState("")
  const [results, setResults] = useState<{
    area: number
    perimeter: number
    squareFeet: number
    squareMeters: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateArea = () => {
    try {
      if (!shape) {
        alert("Please select a shape.")
        return
      }

      let area = 0
      let perimeter = 0
      let formula = ""

      if (shape === "rectangle") {
        if (!length || !width) {
          alert("Please enter length and width.")
          return
        }
        const l = Number.parseFloat(length)
        const w = Number.parseFloat(width)
        if (l <= 0 || w <= 0) {
          alert("Dimensions must be positive numbers.")
          return
        }
        area = l * w
        perimeter = 2 * (l + w)
        formula = `${l}m × ${w}m = ${area.toFixed(2)} m²`
      } else if (shape === "circle") {
        if (!radius) {
          alert("Please enter radius.")
          return
        }
        const r = Number.parseFloat(radius)
        if (r <= 0) {
          alert("Radius must be a positive number.")
          return
        }
        area = Math.PI * r * r
        perimeter = 2 * Math.PI * r
        formula = `π × ${r}² = ${area.toFixed(2)} m²`
      } else if (shape === "square") {
        if (!length) {
          alert("Please enter side length.")
          return
        }
        const s = Number.parseFloat(length)
        if (s <= 0) {
          alert("Side length must be a positive number.")
          return
        }
        area = s * s
        perimeter = 4 * s
        formula = `${s}² = ${area.toFixed(2)} m²`
      } else if (shape === "triangle") {
        if (!length || !width) {
          alert("Please enter base and height.")
          return
        }
        const base = Number.parseFloat(length)
        const height = Number.parseFloat(width)
        if (base <= 0 || height <= 0) {
          alert("Base and height must be positive numbers.")
          return
        }
        area = (base * height) / 2
        perimeter = base + 2 * Math.sqrt((base / 2) * (base / 2) + height * height) // Assuming isosceles triangle
        formula = `(${base}m × ${height}m) ÷ 2 = ${area.toFixed(2)} m²`
      }

      const squareFeet = area * 10.764
      const squareMeters = area

      setResults({
        area,
        perimeter,
        squareFeet,
        squareMeters,
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
    setShape("")
    setLength("")
    setWidth("")
    setRadius("")
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
              <Ruler className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Area Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate area for flooring, roofing, and surface measurements with MaiCalcs. Perfect for construction and
              renovation projects.
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
                  <span>Area Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shape">Shape</Label>
                  <Select value={shape} onValueChange={setShape}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rectangle">Rectangle</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="triangle">Triangle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {shape === "rectangle" && (
                  <>
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
                  </>
                )}

                {shape === "square" && (
                  <div className="space-y-2">
                    <Label htmlFor="length">Side Length (meters)</Label>
                    <Input
                      id="length"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="Enter side length"
                      className="text-lg font-mono"
                    />
                  </div>
                )}

                {shape === "circle" && (
                  <div className="space-y-2">
                    <Label htmlFor="radius">Radius (meters)</Label>
                    <Input
                      id="radius"
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(e.target.value)}
                      placeholder="Enter radius"
                      className="text-lg font-mono"
                    />
                  </div>
                )}

                {shape === "triangle" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="length">Base (meters)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Enter base length"
                        className="text-lg font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Height (meters)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Enter height"
                        className="text-lg font-mono"
                      />
                    </div>
                  </>
                )}

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Area Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Area in square meters and feet</p>
                    <p>• Perimeter calculation</p>
                    <p>• Multiple shape support</p>
                    <p>• Unit conversions included</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Room: 4m × 3m = 12 m²</p>
                    <p>• Circular patio: radius 2m = 12.57 m²</p>
                    <p>• Square deck: 5m × 5m = 25 m²</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateArea} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Area Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Area (m²):</span>
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
                        <span className="font-medium text-gray-700">Area (ft²):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.squareFeet.toFixed(2)} ft²
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.squareFeet.toFixed(2)} ft²`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Perimeter:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.perimeter.toFixed(2)} m
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Shape: {shape}</p>
                        <p>• Perimeter: {results.perimeter.toFixed(2)} m</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Flooring material calculation</p>
                        <p>• Paint coverage estimation</p>
                        <p>• Landscaping and gardening</p>
                        <p>• Construction planning</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Ruler className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select a shape and enter dimensions to calculate area</p>
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
