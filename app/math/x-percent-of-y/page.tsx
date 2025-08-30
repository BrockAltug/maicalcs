"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function XPercentOfYCalculatorPage() {
  const [xValue, setXValue] = useState("")
  const [yValue, setYValue] = useState("")
  const [results, setResults] = useState<{
    percentage: number
    explanation: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePercentage = () => {
    const x = Number.parseFloat(xValue)
    const y = Number.parseFloat(yValue)

    if (isNaN(x) || isNaN(y) || y === 0) {
      return
    }

    const percentage = (x / y) * 100

    setResults({
      percentage: Math.round(percentage * 10000) / 10000,
      explanation: `${x} is ${percentage.toFixed(4)}% of ${y}`,
      formula: `(${x} ÷ ${y}) × 100 = ${percentage.toFixed(4)}%`,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setXValue("")
    setYValue("")
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
              <Percent className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              X is what percent of Y Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find what percentage one number is of another. Perfect for analyzing ratios, comparing values, and
              understanding proportional relationships.
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
                  <span>Percentage Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="x-value">X (First number)</Label>
                  <Input
                    id="x-value"
                    type="number"
                    placeholder="Enter the first number"
                    value={xValue}
                    onChange={(e) => setXValue(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="text-center py-2">
                  <span className="text-lg font-semibold text-gray-600">is what percent of</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="y-value">Y (Second number)</Label>
                  <Input
                    id="y-value"
                    type="number"
                    placeholder="Enter the second number"
                    value={yValue}
                    onChange={(e) => setYValue(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Common Examples:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Test scores: 85 is what % of 100?</p>
                    <p>• Sales performance: 120 is what % of 100?</p>
                    <p>• Budget analysis: 250 is what % of 1000?</p>
                    <p>• Progress tracking: 75 is what % of 200?</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePercentage} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Percentage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-blue-600">{results.percentage}%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.percentage)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Explanation:</h4>
                      <p className="text-purple-700">{results.explanation}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Formula Used:</h4>
                      <p className="text-green-700 font-mono text-sm">{results.formula}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          1. Divide X by Y: {xValue} ÷ {yValue} ={" "}
                          {Number.parseFloat(xValue) / Number.parseFloat(yValue)}
                        </p>
                        <p>
                          2. Multiply by 100: {Number.parseFloat(xValue) / Number.parseFloat(yValue)} × 100 ={" "}
                          {results.percentage}%
                        </p>
                        <p>
                          3. Result: {xValue} is {results.percentage}% of {yValue}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Interpretation:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        {results.percentage > 100 && (
                          <p>
                            • {xValue} is greater than {yValue} (over 100%)
                          </p>
                        )}
                        {results.percentage === 100 && (
                          <p>
                            • {xValue} equals {yValue} (exactly 100%)
                          </p>
                        )}
                        {results.percentage < 100 && results.percentage > 0 && (
                          <p>
                            • {xValue} is less than {yValue} (under 100%)
                          </p>
                        )}
                        {results.percentage === 0 && (
                          <p>
                            • {xValue} is zero relative to {yValue}
                          </p>
                        )}
                        <p>
                          • Ratio: {xValue}:{yValue} = 1:
                          {(Number.parseFloat(yValue) / Number.parseFloat(xValue)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Percent className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter two numbers to calculate percentage</p>
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
