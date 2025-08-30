"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function GeometricMeanCalculatorPage() {
  const [numbers, setNumbers] = useState("")
  const [results, setResults] = useState<{
    geometricMean: number
    arithmeticMean: number
    count: number
    product: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateGeometricMean = () => {
    try {
      const numberArray = numbers
        .split(/[,\s\n]+/)
        .map((n) => n.trim())
        .filter((n) => n !== "")
        .map((n) => Number.parseFloat(n))

      if (numberArray.length === 0) {
        alert("Please enter at least one number.")
        return
      }

      if (numberArray.some((n) => isNaN(n))) {
        alert("Please enter valid numbers only.")
        return
      }

      if (numberArray.some((n) => n <= 0)) {
        alert("All numbers must be positive for geometric mean calculation.")
        return
      }

      const product = numberArray.reduce((acc, num) => acc * num, 1)
      const geometricMean = Math.pow(product, 1 / numberArray.length)
      const arithmeticMean = numberArray.reduce((acc, num) => acc + num, 0) / numberArray.length

      setResults({
        geometricMean: Number.parseFloat(geometricMean.toFixed(6)),
        arithmeticMean: Number.parseFloat(arithmeticMean.toFixed(6)),
        count: numberArray.length,
        product: Number.parseFloat(product.toFixed(6)),
        formula: `GM = ⁿ√(${numberArray.join(" × ")})`,
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
    setNumbers("")
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
              <BarChart3 className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Geometric Mean Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the geometric mean of positive numbers with MaiCalcs. Perfect for growth rates, financial
              analysis, and statistical calculations.
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
                  <span>Number Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="numbers">Numbers (positive values only)</Label>
                  <Textarea
                    id="numbers"
                    placeholder="Enter numbers separated by commas, spaces, or new lines&#10;Example: 2, 8, 18, 32"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    className="text-lg font-mono min-h-[120px]"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Geometric Mean Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• GM = ⁿ√(x₁ × x₂ × ... × xₙ)</p>
                    <p>• Where n is the count of numbers</p>
                    <p>• All numbers must be positive</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2, 8 → GM = √(2×8) = 4</p>
                    <p>• 1, 4, 16 → GM = ³√(1×4×16) = 4</p>
                    <p>• Growth rates: 1.1, 1.2, 1.05</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Use Cases:</h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• Average growth rates</p>
                    <p>• Financial returns</p>
                    <p>• Population growth</p>
                    <p>• Investment analysis</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateGeometricMean} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Statistical Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Geometric Mean:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.geometricMean}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.geometricMean}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Arithmetic Mean:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.arithmeticMean}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.arithmeticMean}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Count:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.count}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.count}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Product:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">{results.product}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.product}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Count: {results.count} numbers</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Investment return calculations</p>
                        <p>• Population growth analysis</p>
                        <p>• Financial portfolio performance</p>
                        <p>• Statistical data analysis</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter positive numbers to calculate geometric mean</p>
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
