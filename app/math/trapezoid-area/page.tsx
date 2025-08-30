"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function TrapezoidAreaCalculatorPage() {
  const [base1, setBase1] = useState("")
  const [base2, setBase2] = useState("")
  const [height, setHeight] = useState("")
  const [unit, setUnit] = useState("cm")
  const [results, setResults] = useState<{
    area: number
    perimeter: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateTrapezoid = () => {
    try {
      const b1 = Number.parseFloat(base1)
      const b2 = Number.parseFloat(base2)
      const h = Number.parseFloat(height)

      if (isNaN(b1) || isNaN(b2) || isNaN(h) || b1 <= 0 || b2 <= 0 || h <= 0) {
        alert("Please enter valid positive numbers for both bases and height.")
        return
      }

      const area = ((b1 + b2) * h) / 2
      const perimeter = b1 + b2 + 2 * Math.sqrt(((b1 - b2) / 2) ** 2 + h ** 2) // Approximate perimeter

      setResults({
        area: Number.parseFloat(area.toFixed(4)),
        perimeter: Number.parseFloat(perimeter.toFixed(4)),
        formula: `A = (b₁ + b₂) × h ÷ 2 = (${b1} + ${b2}) × ${h} ÷ 2`,
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
    setBase1("")
    setBase2("")
    setHeight("")
    setUnit("cm")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <div
                  className="w-8 h-6 border-2 border-white"
                  style={{
                    clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                  }}
                ></div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Area of a Trapezoid Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the area of a trapezoid from the parallel bases and height with MaiCalcs. Perfect for geometry,
              construction, and engineering projects.
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
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Trapezoid Dimensions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="base1">Base 1 (Parallel Side 1)</Label>
                  <Input
                    id="base1"
                    type="number"
                    placeholder="Enter first base length"
                    value={base1}
                    onChange={(e) => setBase1(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="base2">Base 2 (Parallel Side 2)</Label>
                  <Input
                    id="base2"
                    type="number"
                    placeholder="Enter second base length"
                    value={base2}
                    onChange={(e) => setBase2(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (Perpendicular Distance)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">Millimeters (mm)</SelectItem>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="m">Meters (m)</SelectItem>
                      <SelectItem value="in">Inches (in)</SelectItem>
                      <SelectItem value="ft">Feet (ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Trapezoid Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Area: A = (b₁ + b₂) × h ÷ 2</p>
                    <p>• b₁, b₂: Parallel bases</p>
                    <p>• h: Height (perpendicular distance)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• b₁ = 8cm, b₂ = 12cm, h = 5cm → A = 50cm²</p>
                    <p>• b₁ = 10m, b₂ = 6m, h = 4m → A = 32m²</p>
                    <p>• b₁ = 15in, b₂ = 9in, h = 6in → A = 72in²</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTrapezoid} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <span>Trapezoid Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Area:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {results.area} {unit}²
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.area} ${unit}²`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Approximate Perimeter:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.perimeter} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.perimeter} ${unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>
                          • Base 1: {base1} {unit}
                        </p>
                        <p>
                          • Base 2: {base2} {unit}
                        </p>
                        <p>
                          • Height: {height} {unit}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Land area calculations</p>
                        <p>• Architectural design</p>
                        <p>• Engineering projects</p>
                        <p>• Geometry problems</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div
                        className="w-8 h-6 border-2 border-white"
                        style={{
                          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                        }}
                      ></div>
                    </div>
                    <p className="text-gray-500">Enter trapezoid dimensions to calculate the area</p>
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
