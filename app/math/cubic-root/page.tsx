"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function CubicRootCalculatorPage() {
  const [number, setNumber] = useState("")
  const [results, setResults] = useState<{
    result: number
    isPerfectCube: boolean
    nearestPerfectCubes: { lower: number; upper: number }
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const isPerfectCube = (n: number): boolean => {
    const cbrt = Math.cbrt(Math.abs(n))
    return Math.abs(cbrt - Math.round(cbrt)) < 0.0000001
  }

  const findNearestPerfectCubes = (n: number) => {
    const cbrt = Math.cbrt(n)
    const lower = Math.floor(cbrt)
    const upper = Math.ceil(cbrt)

    return {
      lower: lower * lower * lower,
      upper: upper === lower ? (upper + 1) ** 3 : upper * upper * upper,
    }
  }

  const calculateCubicRoot = () => {
    const num = Number.parseFloat(number)
    if (isNaN(num)) return

    // Cube root works for negative numbers
    const result = Math.sign(num) * Math.pow(Math.abs(num), 1 / 3)
    const perfect = isPerfectCube(num)
    const nearest = findNearestPerfectCubes(Math.abs(num))

    setResults({
      result: Math.round(result * 1000000) / 1000000,
      isPerfectCube: perfect,
      nearestPerfectCubes: nearest,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumber("")
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
              <Square className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cubic Root Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate cube roots (third roots) of any number with MaiCalcs. Works with positive and negative numbers,
              perfect cubes, and decimal values.
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
                  <span>Cubic Root Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Number</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter any number (positive or negative)"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Perfect Cubes:</h4>
                  <div className="text-sm text-blue-700 grid grid-cols-2 gap-2">
                    {[1, 8, 27, 64, 125, 216, 343, 512, 729, 1000].map((cube) => (
                      <div key={cube} className="text-center">
                        ∛{cube} = {Math.cbrt(cube)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Cube Root Properties:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• ∛(a³) = a (preserves sign)</p>
                    <p>• ∛(-a) = -∛a</p>
                    <p>• ∛(a × b) = ∛a × ∛b</p>
                    <p>• Cube roots exist for all real numbers</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Examples:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• ∛8 = 2 (because 2³ = 8)</p>
                    <p>• ∛(-8) = -2 (because (-2)³ = -8)</p>
                    <p>• ∛0 = 0</p>
                    <p>• ∛1 = 1</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateCubicRoot} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate ∛
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
                  <span>Cubic Root Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">∛{number} =</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.result}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.result)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className={`rounded-lg p-4 ${results.isPerfectCube ? "bg-green-50" : "bg-orange-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Perfect Cube:</span>
                        <span
                          className={`text-xl font-bold ${results.isPerfectCube ? "text-green-600" : "text-orange-600"}`}
                        >
                          {results.isPerfectCube ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Nearest Perfect Cubes:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          Lower: ∛{results.nearestPerfectCubes.lower} = {Math.cbrt(results.nearestPerfectCubes.lower)}
                        </p>
                        <p>
                          Upper: ∛{results.nearestPerfectCubes.upper} = {Math.cbrt(results.nearestPerfectCubes.upper)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Verification:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          Check: ({results.result})³ = {(results.result ** 3).toFixed(6)}
                        </p>
                        <p>Original: {number}</p>
                        <p>Error: {Math.abs(Number.parseFloat(number) - results.result ** 3).toFixed(8)}</p>
                      </div>
                    </div>

                    {!results.isPerfectCube && (
                      <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-semibold text-indigo-800 mb-2">Decimal Approximation:</h4>
                        <div className="text-sm text-indigo-700 space-y-1">
                          <p>1 decimal place: {results.result.toFixed(1)}</p>
                          <p>3 decimal places: {results.result.toFixed(3)}</p>
                          <p>6 decimal places: {results.result.toFixed(6)}</p>
                          <p>10 decimal places: {results.result.toFixed(10)}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Sign Analysis:</h4>
                      <div className="text-sm text-red-700 space-y-1">
                        <p>Input sign: {Number.parseFloat(number) >= 0 ? "Positive" : "Negative"}</p>
                        <p>Result sign: {results.result >= 0 ? "Positive" : "Negative"}</p>
                        <p>Note: Cube roots preserve the sign of the input</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Square className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to calculate its cube root</p>
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
