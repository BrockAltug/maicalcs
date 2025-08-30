"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Infinity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ArctanCalculatorPage() {
  const [inputValue, setInputValue] = useState("")
  const [outputUnit, setOutputUnit] = useState("degrees")
  const [results, setResults] = useState<{
    degrees: number
    radians: number
    quadrant: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateArctan = () => {
    const value = Number.parseFloat(inputValue)
    if (isNaN(value)) return

    const radians = Math.atan(value)
    const degrees = (radians * 180) / Math.PI

    // Determine quadrant (arctan returns values in (-π/2, π/2) or (-90°, 90°))
    let quadrant = ""
    if (degrees === 0) quadrant = "Origin"
    else if (degrees > 0) quadrant = "First quadrant"
    else if (degrees < 0) quadrant = "Fourth quadrant"

    setResults({
      degrees: Math.round(degrees * 1000000) / 1000000,
      radians: Math.round(radians * 1000000) / 1000000,
      quadrant,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
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
              <Infinity className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Arctan Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate inverse tangent (arctan) values in degrees and radians with MaiCalcs. Works with all real
              numbers and provides precise results.
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
                  <span>Arctan Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-value">Input Value (any real number)</Label>
                  <Input
                    id="input-value"
                    type="number"
                    step="0.000001"
                    placeholder="Enter any real number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="output-unit">Primary Output Unit</Label>
                  <Select value={outputUnit} onValueChange={setOutputUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="degrees">Degrees (°)</SelectItem>
                      <SelectItem value="radians">Radians (rad)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Arctan Properties:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Domain: All real numbers (-∞, ∞)</p>
                    <p>• Range: (-π/2, π/2) or (-90°, 90°)</p>
                    <p>• arctan(-x) = -arctan(x)</p>
                    <p>• arctan(tan(x)) = x for x ∈ (-π/2, π/2)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Values:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• arctan(-∞) = -90° = -π/2 rad</p>
                    <p>• arctan(-√3) = -60° = -π/3 rad</p>
                    <p>• arctan(-1) = -45° = -π/4 rad</p>
                    <p>• arctan(-1/√3) = -30° = -π/6 rad</p>
                    <p>• arctan(0) = 0° = 0 rad</p>
                    <p>• arctan(1/√3) = 30° = π/6 rad</p>
                    <p>• arctan(1) = 45° = π/4 rad</p>
                    <p>• arctan(√3) = 60° = π/3 rad</p>
                    <p>• arctan(∞) = 90° = π/2 rad</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateArctan} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Arctan
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
                  <span>Arctan Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Degrees:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.degrees}°</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.degrees)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Radians:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">{results.radians} rad</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.radians)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Location:</span>
                        <span className="text-xl font-bold text-green-600">{results.quadrant}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Details:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Input: tan⁻¹({inputValue})</p>
                        <p>
                          • Result: {results.degrees}° = {results.radians} radians
                        </p>
                        <p>
                          • Verification: tan({results.degrees}°) = {Math.tan(results.radians).toFixed(6)}
                        </p>
                        <p>• Principal value in range (-90°, 90°)</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Slope Analysis:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Input represents slope: {inputValue}</p>
                        <p>• Angle of inclination: {results.degrees}°</p>
                        <p>• Rise over run: {inputValue}/1</p>
                        <p>• Percentage grade: {(Number.parseFloat(inputValue) * 100).toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Infinity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter any real number to calculate arctan</p>
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
