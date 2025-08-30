"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, CuboidIcon as Cube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function CubicMetersCalculatorPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [unit, setUnit] = useState("meters")
  const [results, setResults] = useState<{
    cubicMeters: number
    liters: number
    cubicFeet: number
    cubicYards: number
    gallons: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const unitConversions = {
    meters: 1,
    feet: 0.3048,
    inches: 0.0254,
    centimeters: 0.01,
    yards: 0.9144,
  }

  const calculateVolume = () => {
    try {
      if (!length || !width || !height) {
        alert("Please fill in all fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)
      const h = Number.parseFloat(height)

      if (l <= 0 || w <= 0 || h <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      const conversionFactor = unitConversions[unit as keyof typeof unitConversions]
      const lengthInMeters = l * conversionFactor
      const widthInMeters = w * conversionFactor
      const heightInMeters = h * conversionFactor

      const cubicMeters = lengthInMeters * widthInMeters * heightInMeters

      setResults({
        cubicMeters,
        liters: cubicMeters * 1000,
        cubicFeet: cubicMeters * 35.3147,
        cubicYards: cubicMeters * 1.30795,
        gallons: cubicMeters * 264.172,
        formula: `${length} ${unit} × ${width} ${unit} × ${height} ${unit} = ${cubicMeters.toFixed(3)} m³`,
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
    setHeight("")
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
              <Cube className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cubic Meters Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Easily calculate the volume of any space in cubic meters. Ideal for shipping, storage, and construction
              projects.
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
                  <span>Dimensions</span>
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
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="centimeters">Centimeters</SelectItem>
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
                    step="0.1"
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
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height ({unit})</Label>
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

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Calculations Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Volume in cubic meters (m³)</p>
                    <p>• Conversions to Liters, Cubic Feet, Yards, & Gallons</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Uses:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Concrete pours: Slabs, footings</p>
                    <p>• Filling spaces: Garden beds, sandboxes</p>
                    <p>• Shipping volume: Calculating container space</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateVolume} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Volume Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Cubic Meters:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.cubicMeters.toFixed(3)} m³
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.cubicMeters.toFixed(3)} m³`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Liters:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.liters.toFixed(2)} L
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Cubic Feet:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.cubicFeet.toFixed(2)} ft³
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Cubic Yards:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.cubicYards.toFixed(2)} yd³
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Gallons (US):</span>
                        <span className="text-xl font-bold text-emerald-600 font-mono">
                          {results.gallons.toFixed(2)} gal
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <p className="text-sm text-yellow-700 font-mono">{results.formula}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Cube className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions to calculate the volume</p>
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
