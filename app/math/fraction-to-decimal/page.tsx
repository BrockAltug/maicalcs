"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Divide } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function FractionToDecimalCalculatorPage() {
  const [numerator, setNumerator] = useState("")
  const [denominator, setDenominator] = useState("")
  const [results, setResults] = useState<{
    decimal: number
    percentage: number
    decimalType: string
    repeatingPattern: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateFractionToDecimal = () => {
    try {
      const num = Number.parseFloat(numerator)
      const den = Number.parseFloat(denominator)

      if (isNaN(num) || isNaN(den) || den === 0) {
        alert("Please enter valid numbers. Denominator cannot be zero.")
        return
      }

      const decimal = num / den
      const percentage = decimal * 100

      // Determine if decimal is terminating or repeating
      let decimalType = "Terminating"
      let repeatingPattern = "None"

      // Simple check for repeating decimals (this is a basic implementation)
      const decimalString = decimal.toString()
      if (decimalString.length > 10) {
        decimalType = "Possibly Repeating"
        // For simplicity, we'll just note it might be repeating
        // A full implementation would need more complex logic
      }

      // Check for common repeating patterns
      const longDecimal = (num / den).toFixed(12)
      if (longDecimal.includes("333333")) {
        decimalType = "Repeating"
        repeatingPattern = "3"
      } else if (longDecimal.includes("666666")) {
        decimalType = "Repeating"
        repeatingPattern = "6"
      } else if (longDecimal.includes("142857")) {
        decimalType = "Repeating"
        repeatingPattern = "142857"
      }

      setResults({
        decimal: Number.parseFloat(decimal.toFixed(12)),
        percentage: Number.parseFloat(percentage.toFixed(4)),
        decimalType,
        repeatingPattern,
        formula: `${num}/${den} = ${num} ÷ ${den}`,
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
    setNumerator("")
    setDenominator("")
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
              <Divide className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fraction to Decimal Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert fractions to decimal numbers with precision using MaiCalcs. Perfect for financial calculations and
              measurement conversions.
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
                  <span>Fraction Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="numerator">Numerator</Label>
                  <Input
                    id="numerator"
                    type="number"
                    placeholder="Enter numerator"
                    value={numerator}
                    onChange={(e) => setNumerator(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="denominator">Denominator</Label>
                  <Input
                    id="denominator"
                    type="number"
                    placeholder="Enter denominator"
                    value={denominator}
                    onChange={(e) => setDenominator(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Conversion Process:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Divide numerator by denominator</p>
                    <p>• Result is the decimal equivalent</p>
                    <p>• May be terminating or repeating</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 1/2 = 0.5</p>
                    <p>• 1/3 = 0.333... (repeating)</p>
                    <p>• 3/4 = 0.75</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Common Uses:</h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• Financial calculations</p>
                    <p>• Scientific measurements</p>
                    <p>• Engineering precision</p>
                    <p>• Statistical analysis</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateFractionToDecimal} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convert
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
                  <span>Decimal Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Decimal:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.decimal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.decimal}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Percentage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.percentage}%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.percentage}%`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Decimal Type:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.decimalType}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.decimalType)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Repeating Pattern:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.repeatingPattern}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.repeatingPattern)}
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
                        <p>• = {results.decimal}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Financial interest calculations</p>
                        <p>• Scientific measurement precision</p>
                        <p>• Engineering design specifications</p>
                        <p>• Statistical data analysis</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Divide className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter numerator and denominator to convert to decimal</p>
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
