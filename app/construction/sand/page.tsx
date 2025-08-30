"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SandCalculatorPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [depth, setDepth] = useState("")
  const [sandType, setSandType] = useState("fine")
  const [unit, setUnit] = useState("meters")
  const [results, setResults] = useState<{
    volume: number
    cubicYards: number
    tonnage: number
    cost: number
    formula: string
  } | null>(null)
  const [pricePerTon, setPricePerTon] = useState("30")
  const [copied, setCopied] = useState(false)

  const sandTypes = {
    fine: { density: 1.6, cost: 30 }, // tonnes/m³, $/tonne
    coarse: { density: 1.5, cost: 28 },
    river: { density: 1.65, cost: 35 },
    masonry: { density: 1.7, cost: 40 },
  }

  const unitConversions = {
    meters: 1,
    feet: 0.3048,
    inches: 0.0254,
    centimeters: 0.01,
  }

  const calculateSand = () => {
    try {
      if (!length || !width || !depth) {
        alert("Please fill in all fields.")
        return
      }

      const l = Number.parseFloat(length)
      const w = Number.parseFloat(width)
      const d = Number.parseFloat(depth)
      const price = Number.parseFloat(pricePerTon) || 0

      if (l <= 0 || w <= 0 || d <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      const conversionFactor = unitConversions[unit as keyof typeof unitConversions]
      const volume = l * conversionFactor * w * conversionFactor * d * conversionFactor
      const cubicYards = volume * 1.308

      const sand = sandTypes[sandType as keyof typeof sandTypes]
      const tonnage = volume * sand.density
      const cost = tonnage * price

      setResults({
        volume,
        cubicYards,
        tonnage,
        cost,
        formula: `${length} ${unit} × ${width} ${unit} × ${depth} ${unit} = ${volume.toFixed(3)} m³`,
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
    setDepth("")
    setSandType("fine")
    setUnit("meters")
    setPricePerTon("30")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Waves className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Sand Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate the amount of sand needed for your construction, landscaping, or sandbox project.
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
                  <span>Project Details</span>
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

                <div className="space-y-2">
                  <Label htmlFor="depth">Depth ({unit})</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="Enter depth"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sandType">Sand Type</Label>
                  <Select value={sandType} onValueChange={setSandType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fine">Fine Sand</SelectItem>
                      <SelectItem value="coarse">Coarse Sand</SelectItem>
                      <SelectItem value="river">River Sand</SelectItem>
                      <SelectItem value="masonry">Masonry Sand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price per Ton ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={pricePerTon}
                    onChange={(e) => setPricePerTon(e.target.value)}
                    placeholder="e.g., 30"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Calculations Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Volume in cubic meters/yards</p>
                    <p>• Weight in tonnes</p>
                    <p>• Estimated cost</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Typical Depths:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Paver base: 10-15cm (4-6 inches)</p>
                    <p>• Sandbox: 30-45cm (12-18 inches)</p>
                    <p>• Under slab fill: 10cm (4 inches)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSand} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Sand Requirements</span>
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
                            {results.volume.toFixed(3)} m³
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.volume.toFixed(3)} m³`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Cubic Yards:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.cubicYards.toFixed(2)} yd³
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Tonnage:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.tonnage.toFixed(2)} tonnes
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Estimated Cost:</span>
                        <span className="text-xl font-bold text-emerald-600 font-mono">${results.cost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <p className="text-sm text-yellow-700 font-mono">{results.formula}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Waves className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions to calculate sand needed</p>
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
