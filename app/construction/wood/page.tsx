"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function WoodCalculatorPage() {
  const [calculationType, setCalculationType] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [thickness, setThickness] = useState("")
  const [quantity, setQuantity] = useState("")
  const [results, setResults] = useState<{
    boardFeet: number
    linearFeet: number
    volume: number
    weight: number
    cost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateWood = () => {
    try {
      if (!calculationType) {
        alert("Please select calculation type.")
        return
      }

      if (calculationType === "board-feet") {
        if (!length || !width || !thickness || !quantity) {
          alert("Please fill in all fields for board feet calculation.")
          return
        }

        const l = Number.parseFloat(length) // inches
        const w = Number.parseFloat(width) // inches
        const t = Number.parseFloat(thickness) // inches
        const q = Number.parseFloat(quantity)

        if (l <= 0 || w <= 0 || t <= 0 || q <= 0) {
          alert("All values must be positive numbers.")
          return
        }

        // Board feet = (Length × Width × Thickness) / 144 × Quantity
        const boardFeet = (l * w * t * q) / 144
        const linearFeet = (l * q) / 12 // Convert inches to feet
        const volume = boardFeet * 0.00236 // Convert to cubic meters
        const weight = volume * 500 // kg (average wood density)
        const cost = boardFeet * 3.5 // $3.50 per board foot

        setResults({
          boardFeet,
          linearFeet,
          volume,
          weight,
          cost,
          formula: `(${l}" × ${w}" × ${t}") ÷ 144 × ${q} pieces = ${boardFeet.toFixed(2)} board feet`,
        })
      } else if (calculationType === "linear-feet") {
        if (!length || !quantity) {
          alert("Please enter length and quantity for linear feet calculation.")
          return
        }

        const l = Number.parseFloat(length) // feet
        const q = Number.parseFloat(quantity)

        if (l <= 0 || q <= 0) {
          alert("All values must be positive numbers.")
          return
        }

        const linearFeet = l * q
        const boardFeet = linearFeet * 1 // Assuming 1" thick, 12" wide for estimation
        const volume = boardFeet * 0.00236
        const weight = volume * 500
        const cost = linearFeet * 2.5 // $2.50 per linear foot

        setResults({
          boardFeet,
          linearFeet,
          volume,
          weight,
          cost,
          formula: `${l} feet × ${q} pieces = ${linearFeet.toFixed(2)} linear feet`,
        })
      }
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
    setCalculationType("")
    setLength("")
    setWidth("")
    setThickness("")
    setQuantity("")
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
              <Wrench className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Wood Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate lumber and wood materials for construction projects with MaiCalcs. Perfect for framing, decking,
              and woodworking projects.
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
                  <span>Wood Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculationType">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select calculation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="board-feet">Board Feet</SelectItem>
                      <SelectItem value="linear-feet">Linear Feet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "board-feet" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="length">Length (inches)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Enter length in inches"
                        className="text-lg font-mono"
                        step="0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">Width (inches)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Enter width in inches"
                        className="text-lg font-mono"
                        step="0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thickness">Thickness (inches)</Label>
                      <Input
                        id="thickness"
                        type="number"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                        placeholder="Enter thickness in inches"
                        className="text-lg font-mono"
                        step="0.1"
                      />
                    </div>
                  </>
                )}

                {calculationType === "linear-feet" && (
                  <div className="space-y-2">
                    <Label htmlFor="length">Length (feet)</Label>
                    <Input
                      id="length"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="Enter length in feet"
                      className="text-lg font-mono"
                      step="0.1"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (pieces)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter number of pieces"
                    className="text-lg font-mono"
                    step="1"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Wood Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Board feet calculation</p>
                    <p>• Linear feet measurement</p>
                    <p>• Volume and weight estimation</p>
                    <p>• Cost calculation</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Lumber Sizes:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2×4: 1.5" × 3.5" actual</p>
                    <p>• 2×6: 1.5" × 5.5" actual</p>
                    <p>• 2×8: 1.5" × 7.25" actual</p>
                    <p>• 2×10: 1.5" × 9.25" actual</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateWood} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Wood Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Board Feet:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.boardFeet.toFixed(2)} bf
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.boardFeet.toFixed(2)} bf`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Linear Feet:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.linearFeet.toFixed(2)} lf
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Volume:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.volume.toFixed(3)} m³
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weight:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.weight.toFixed(0)} kg
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
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Calculation type: {calculationType}</p>
                        <p>• Total cost: ${results.cost.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Framing and structural work</p>
                        <p>• Decking and outdoor projects</p>
                        <p>• Furniture and cabinetry</p>
                        <p>• General carpentry projects</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Select calculation type and enter dimensions to calculate wood needed
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
