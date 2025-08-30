"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Snowflake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function StyrofoamCalculatorPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [thickness, setThickness] = useState("")
  const [unit, setUnit] = useState("meters")
  const [density, setDensity] = useState("15")
  const [results, setResults] = useState<{
    volume: number
    weight: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const unitConversions = {
    meters: 1,
    feet: 0.3048,
    inches: 0.0254,
    centimeters: 0.01,
  }

  const calculateStyrofoam = () => {
    try {
      if (!length || !width || !thickness) {
        alert("Please fill in all dimension fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)
      const t = Number.parseFloat(thickness)
      const d = Number.parseFloat(density)

      if (l <= 0 || w <= 0 || t <= 0 || d <= 0) {
        alert("All values must be positive numbers.")
        return
      }

      const conversion = unitConversions[unit as keyof typeof unitConversions]
      const volumeInMeters = l * conversion * (w * conversion) * (t * conversion)
      const weightInKg = volumeInMeters * d

      setResults({
        volume: volumeInMeters,
        weight: weightInKg,
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
    setDensity("15")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Snowflake className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Styrofoam Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the volume and weight of Styrofoam (EPS) for insulation, packaging, or craft projects.
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
                  <span>Styrofoam Details</span>
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
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dimensions ({unit})</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="Length"
                      className="text-lg font-mono"
                    />
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="Width"
                      className="text-lg font-mono"
                    />
                    <Input
                      type="number"
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      placeholder="Thickness"
                      className="text-lg font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="density">Density (kg/m³)</Label>
                  <Input
                    id="density"
                    type="number"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Calculations Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Volume in cubic meters (m³)</p>
                    <p>• Weight in kilograms (kg)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common EPS Densities:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Packaging: 10-15 kg/m³</p>
                    <p>• Insulation boards: 15-30 kg/m³</p>
                    <p>• Geofoam (lightweight fill): 12-40 kg/m³</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateStyrofoam} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Calculation Results</span>
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
                        <span className="font-medium text-gray-700">Weight:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.weight.toFixed(2)} kg
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Snowflake className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions to calculate volume and weight</p>
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
