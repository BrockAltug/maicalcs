"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SquareMetersCalculatorPage() {
  const [shape, setShape] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [radius, setRadius] = useState("")
  const [results, setResults] = useState<{
    squareMeters: number
    squareFeet: number
    squareYards: number
    hectares: number
    acres: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateSquareMeters = () => {
    try {
      if (!shape) {
        alert("Please select a shape.")
        return
      }

      let area = 0
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
        formula = `${l}m × ${w}m = ${area.toFixed(2)} m²`
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
        formula = `${s}m × ${s}m = ${area.toFixed(2)} m²`
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
        formula = `π × ${r}² = ${area.toFixed(2)} m²`
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
        formula = `(${base}m × ${height}m) ÷ 2 = ${area.toFixed(2)} m²`
      }

      // Convert to other units
      const squareFeet = area * 10.764
      const squareYards = area * 1.196
      const hectares = area / 10000
      const acres = area / 4047

      setResults({
        squareMeters: area,
        squareFeet,
        squareYards,
        hectares,
        acres,
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
              <Square className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Square Meters Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate area measurements in square meters with MaiCalcs. Perfect for room sizing, property
              measurements, and construction planning.
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
                        step="0.01"
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
                        step="0.01"
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
                      step="0.01"
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
                      step="0.01"
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
                        step="0.01"
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
                        step="0.01"
                      />
                    </div>
                  </>
                )}

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Area Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Area in square meters</p>
                    <p>• Conversion to other units</p>
                    <p>• Multiple shape support</p>
                    <p>• High precision calculations</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Uses:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Room and floor area</p>
                    <p>• Property measurements</p>
                    <p>• Material calculations</p>
                    <p>• Construction planning</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSquareMeters} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                        <span className="font-medium text-gray-700">Square Meters:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.squareMeters.toFixed(2)} m²
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.squareMeters.toFixed(2)} m²`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Square Feet:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.squareFeet.toFixed(2)} ft²
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Square Yards:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.squareYards.toFixed(2)} yd²
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Hectares:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.hectares.toFixed(4)} ha
                        </span>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Acres:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">{results.acres.toFixed(4)} ac</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Shape: {shape}</p>
                        <p>• Area: {results.squareMeters.toFixed(2)} m²</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Unit Conversions:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• 1 m² = 10.764 ft²</p>
                        <p>• 1 m² = 1.196 yd²</p>
                        <p>• 1 hectare = 10,000 m²</p>
                        <p>• 1 acre = 4,047 m²</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Square className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Select a shape and enter dimensions to calculate area in square meters
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
