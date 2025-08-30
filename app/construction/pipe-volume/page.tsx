"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, CircleDot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PipeVolumeCalculatorPage() {
  const [diameter, setDiameter] = useState("")
  const [length, setLength] = useState("")
  const [unit, setUnit] = useState("meters")
  const [results, setResults] = useState<{
    volume: number
    liters: number
    gallons: number
    cubicFeet: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const unitConversions = {
    meters: 1,
    feet: 0.3048,
    inches: 0.0254,
    centimeters: 0.01,
    millimeters: 0.001,
  }

  const calculatePipeVolume = () => {
    try {
      if (!diameter || !length) {
        alert("Please fill in all fields.")
        return
      }

      const d = Number.parseFloat(diameter)
      const l = Number.parseFloat(length)

      if (d <= 0 || l <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      const conversionFactor = unitConversions[unit as keyof typeof unitConversions]
      const diameterInMeters = d * conversionFactor
      const lengthInMeters = l * conversionFactor
      const radiusInMeters = diameterInMeters / 2

      const volume = Math.PI * Math.pow(radiusInMeters, 2) * lengthInMeters

      setResults({
        volume,
        liters: volume * 1000,
        gallons: volume * 264.172,
        cubicFeet: volume * 35.3147,
        formula: `π × (${d} ${unit} / 2)² × ${l} ${unit} = ${volume.toFixed(4)} m³`,
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
    setDiameter("")
    setLength("")
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
              <CircleDot className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Pipe Volume Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Determine the volume of a pipe for plumbing, irrigation, or industrial applications.
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
                  <span>Pipe Dimensions</span>
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
                      <SelectItem value="millimeters">Millimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diameter">Inner Diameter ({unit})</Label>
                  <Input
                    id="diameter"
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    placeholder="Enter diameter"
                    className="text-lg font-mono"
                    step="0.1"
                  />
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

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Calculations Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Volume in cubic meters (m³)</p>
                    <p>• Capacity in Liters and Gallons</p>
                    <p>• Conversion to Cubic Feet</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Applications:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Plumbing: Water flow capacity</p>
                    <p>• Irrigation systems: Sizing pipes</p>
                    <p>• Drainage: Calculating culvert capacity</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePipeVolume} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Pipe Volume Results</span>
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
                        <span className="font-medium text-gray-700">Liters:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.liters.toFixed(2)} L
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Gallons (US):</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.gallons.toFixed(2)} gal
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Cubic Feet:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.cubicFeet.toFixed(2)} ft³
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
                    <CircleDot className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter pipe dimensions to calculate the volume</p>
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
