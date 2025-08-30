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

export default function SquareRootCalculatorPage() {
  const [number, setNumber] = useState("")
  const [results, setResults] = useState<{
    result: number
    isPerfectSquare: boolean
    nearestPerfectSquares: { lower: number; upper: number }
    simplified?: { coefficient: number; radicand: number }
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const isPerfectSquare = (n: number): boolean => {
    const sqrt = Math.sqrt(n)
    return sqrt === Math.floor(sqrt)
  }

  const simplifySquareRoot = (n: number) => {
    if (n <= 0) return null

    let coefficient = 1
    let radicand = n

    // Find perfect square factors
    for (let i = Math.floor(Math.sqrt(n)); i >= 2; i--) {
      const square = i * i
      if (radicand % square === 0) {
        coefficient *= i
        radicand = radicand / square
        break
      }
    }

    return coefficient === 1 ? null : { coefficient, radicand }
  }

  const findNearestPerfectSquares = (n: number) => {
    const sqrt = Math.sqrt(n)
    const lower = Math.floor(sqrt)
    const upper = Math.ceil(sqrt)

    return {
      lower: lower * lower,
      upper: upper === lower ? (upper + 1) * (upper + 1) : upper * upper,
    }
  }

  const calculateSquareRoot = () => {
    const num = Number.parseFloat(number)
    if (isNaN(num) || num < 0) return

    const result = Math.sqrt(num)
    const perfect = isPerfectSquare(num)
    const nearest = findNearestPerfectSquares(num)
    const simplified = simplifySquareRoot(num)

    setResults({
      result: Math.round(result * 1000000) / 1000000,
      isPerfectSquare: perfect,
      nearestPerfectSquares: nearest,
      simplified,
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
              Square Root Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate square roots with precision using MaiCalcs. Get exact values, simplified radicals, and perfect
              square analysis.
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
                  <span>Square Root Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Number</Label>
                  <Input
                    id="number"
                    type="number"
                    min="0"
                    placeholder="Enter a non-negative number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Perfect Squares (1-100):</h4>
                  <div className="text-sm text-blue-700 grid grid-cols-5 gap-2">
                    {[1, 4, 9, 16, 25, 36, 49, 64, 81, 100].map((square) => (
                      <div key={square} className="text-center">
                        √{square} = {Math.sqrt(square)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Square Root Properties:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• √(a × b) = √a × √b</p>
                    <p>• √(a²) = |a| (absolute value)</p>
                    <p>• √0 = 0, √1 = 1</p>
                    <p>• Square roots of negative numbers are imaginary</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSquareRoot} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate √
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
                  <span>Square Root Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">√{number} =</span>
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

                    <div className={`rounded-lg p-4 ${results.isPerfectSquare ? "bg-green-50" : "bg-orange-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Perfect Square:</span>
                        <span
                          className={`text-xl font-bold ${results.isPerfectSquare ? "text-green-600" : "text-orange-600"}`}
                        >
                          {results.isPerfectSquare ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>

                    {results.simplified && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-center">
                          <span className="font-medium text-gray-700 block mb-2">Simplified Form:</span>
                          <span className="text-xl font-bold text-purple-600">
                            {results.simplified.coefficient}√{results.simplified.radicand}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Nearest Perfect Squares:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          Lower: √{results.nearestPerfectSquares.lower} ={" "}
                          {Math.sqrt(results.nearestPerfectSquares.lower)}
                        </p>
                        <p>
                          Upper: √{results.nearestPerfectSquares.upper} ={" "}
                          {Math.sqrt(results.nearestPerfectSquares.upper)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Verification:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          Check: {results.result}² = {(results.result * results.result).toFixed(6)}
                        </p>
                        <p>Original: {number}</p>
                        <p>Error: {Math.abs(Number.parseFloat(number) - results.result * results.result).toFixed(8)}</p>
                      </div>
                    </div>

                    {!results.isPerfectSquare && (
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
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Square className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to calculate its square root</p>
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
