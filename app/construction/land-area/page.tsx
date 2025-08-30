"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function LandAreaCalculatorPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [unit, setUnit] = useState("meters")
  const [results, setResults] = useState<{
    squareMeters: number
    squareFeet: number
    acres: number
    hectares: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const unitConversions = {
    meters: 1,
    feet: 0.3048,
    yards: 0.9144,
  }

  const calculateArea = () => {
    try {
      if (!length || !width) {
        alert("Please fill in all dimension fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)

      if (l <= 0 || w <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      const conversion = unitConversions[unit as keyof typeof unitConversions]
      const areaInMeters = l * conversion * (w * conversion)

      setResults({
        squareMeters: areaInMeters,
        squareFeet: areaInMeters * 10.764,
        acres: areaInMeters / 4046.86,
        hectares: areaInMeters / 10000,
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
    setUnit("meters")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Map className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Land Area Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Quickly calculate the area of a plot of land for real estate, farming, or landscaping purposes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span>Land Dimensions</span>
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
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="yards">Yards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">Length ({unit})</Label>
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
                  <Label htmlFor="width">Width ({unit})</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="Enter width"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Calculations Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Area in Square Meters & Feet</p>
                    <p>• Conversion to Acres & Hectares</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Unit Equivalents:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 1 Acre = 43,560 ft²</p>
                    <p>• 1 Hectare = 10,000 m²</p>
                    <p>• 1 Square Mile = 640 Acres</p>
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
                        <span className="font-medium text-gray-700">Acres:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">{results.acres.toFixed(4)}</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Hectares:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.hectares.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Map className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions to calculate land area</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <AdBanner />
      </div>

      <Footer />
    </div>
  )
}
