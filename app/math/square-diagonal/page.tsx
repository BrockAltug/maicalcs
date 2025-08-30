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

export default function SquareDiagonalCalculatorPage() {
  const [inputValue, setInputValue] = useState("")
  const [inputType, setInputType] = useState("side")
  const [unit, setUnit] = useState("cm")
  const [results, setResults] = useState<{
    diagonal: number
    side: number
    area: number
    perimeter: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateSquare = () => {
    try {
      const value = Number.parseFloat(inputValue)

      if (isNaN(value) || value <= 0) {
        alert("Please enter a valid positive number.")
        return
      }

      let side: number
      let diagonal: number
      let formula: string

      if (inputType === "side") {
        side = value
        diagonal = side * Math.sqrt(2)
        formula = `Diagonal = Side × √2 = ${side} × ${Math.sqrt(2).toFixed(4)}`
      } else if (inputType === "diagonal") {
        diagonal = value
        side = diagonal / Math.sqrt(2)
        formula = `Side = Diagonal ÷ √2 = ${diagonal} ÷ ${Math.sqrt(2).toFixed(4)}`
      } else {
        // area
        const area = value
        side = Math.sqrt(area)
        diagonal = side * Math.sqrt(2)
        formula = `Side = √Area = √${area}, then Diagonal = Side × √2`
      }

      const area = side * side
      const perimeter = 4 * side

      setResults({
        diagonal: Number.parseFloat(diagonal.toFixed(4)),
        side: Number.parseFloat(side.toFixed(4)),
        area: Number.parseFloat(area.toFixed(4)),
        perimeter: Number.parseFloat(perimeter.toFixed(4)),
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
    setInputValue("")
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
                <div className="w-8 h-8 border-2 border-white relative">
                  <div className="absolute inset-0 border-l-2 border-white transform rotate-45 origin-bottom-left"></div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Diagonal of a Square Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the diagonal of a square from its side length, area, or find the side from the diagonal with
              MaiCalcs. Get complete square properties with step-by-step solutions.
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
                  <span>Square Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Calculate From</Label>
                  <Select value={inputType} onValueChange={setInputType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="side">Side Length</SelectItem>
                      <SelectItem value="diagonal">Diagonal Length</SelectItem>
                      <SelectItem value="area">Area</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputValue">
                    {inputType === "side" ? "Side Length" : inputType === "diagonal" ? "Diagonal Length" : "Area"}
                  </Label>
                  <Input
                    id="inputValue"
                    type="number"
                    placeholder={`Enter ${
                      inputType === "side" ? "side length" : inputType === "diagonal" ? "diagonal length" : "area"
                    }`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
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

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="w-24 h-24 border-2 border-blue-600 mx-auto relative">
                      <div className="absolute inset-0 border-l-2 border-red-500 transform rotate-45 origin-bottom-left"></div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-600">
                        Side
                      </div>
                      <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 rotate-45 text-xs text-red-600">
                        Diagonal
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Square Diagonal Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Diagonal = Side × √2</p>
                    <p>• √2 ≈ 1.414 (square root of 2)</p>
                    <p>• Based on Pythagorean theorem</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Example:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Square with side = 5 units</p>
                    <p>• Diagonal = 5 × √2 = 5 × 1.414 = 7.071 units</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSquare} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Square Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Diagonal:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {results.diagonal} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.diagonal} ${unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Side Length:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.side} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.side} ${unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Area:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
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

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Perimeter:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
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
                      <div className="text-sm text-yellow-700">
                        <p>• {results.formula}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Construction and carpentry</p>
                        <p>• Tile and flooring calculations</p>
                        <p>• Geometry problems</p>
                        <p>• Engineering design</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div className="w-8 h-8 border-2 border-white relative">
                        <div className="absolute inset-0 border-l-2 border-white transform rotate-45 origin-bottom-left"></div>
                      </div>
                    </div>
                    <p className="text-gray-500">Enter a value to calculate square properties</p>
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
