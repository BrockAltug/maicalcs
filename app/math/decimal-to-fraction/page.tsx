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

export default function DecimalToFractionCalculatorPage() {
  const [decimal, setDecimal] = useState("")
  const [results, setResults] = useState<{
    numerator: number
    denominator: number
    simplifiedNumerator: number
    simplifiedDenominator: number
    percentage: number
    mixedNumber: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const calculateDecimalToFraction = () => {
    try {
      const decimalValue = Number.parseFloat(decimal)

      if (isNaN(decimalValue)) {
        alert("Please enter a valid decimal number.")
        return
      }

      if (decimalValue < 0) {
        alert("Please enter a positive decimal number.")
        return
      }

      // Convert decimal to fraction
      const decimalString = decimalValue.toString()
      const decimalPlaces = decimalString.includes(".") ? decimalString.split(".")[1].length : 0

      const denominator = Math.pow(10, decimalPlaces)
      const numerator = Math.round(decimalValue * denominator)

      // Simplify the fraction
      const greatestCommonDivisor = gcd(numerator, denominator)
      const simplifiedNumerator = numerator / greatestCommonDivisor
      const simplifiedDenominator = denominator / greatestCommonDivisor

      // Calculate percentage
      const percentage = decimalValue * 100

      // Calculate mixed number if improper fraction
      let mixedNumber = ""
      if (simplifiedNumerator > simplifiedDenominator) {
        const wholeNumber = Math.floor(simplifiedNumerator / simplifiedDenominator)
        const remainingNumerator = simplifiedNumerator % simplifiedDenominator
        if (remainingNumerator === 0) {
          mixedNumber = wholeNumber.toString()
        } else {
          mixedNumber = `${wholeNumber} ${remainingNumerator}/${simplifiedDenominator}`
        }
      } else {
        mixedNumber = `${simplifiedNumerator}/${simplifiedDenominator}`
      }

      setResults({
        numerator,
        denominator,
        simplifiedNumerator,
        simplifiedDenominator,
        percentage: Number.parseFloat(percentage.toFixed(4)),
        mixedNumber,
        formula: `${decimalValue} = ${numerator}/${denominator}`,
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
    setDecimal("")
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
              Decimal to Fraction Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert decimal numbers to fractions in simplest form with MaiCalcs. Perfect for cooking measurements and
              precise calculations.
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
                  <span>Decimal Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="decimal">Decimal Number</Label>
                  <Input
                    id="decimal"
                    type="number"
                    placeholder="Enter decimal number (e.g., 0.75)"
                    value={decimal}
                    onChange={(e) => setDecimal(e.target.value)}
                    className="text-lg font-mono"
                    step="0.001"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Conversion Process:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Count decimal places</p>
                    <p>• Create fraction with power of 10</p>
                    <p>• Simplify using GCD</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 0.5 = 1/2</p>
                    <p>• 0.75 = 3/4</p>
                    <p>• 0.125 = 1/8</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Common Uses:</h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• Cooking and baking</p>
                    <p>• Construction measurements</p>
                    <p>• Mathematical calculations</p>
                    <p>• Engineering precision</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDecimalToFraction} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Fraction Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Simplified Fraction:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {results.simplifiedNumerator}/{results.simplifiedDenominator}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(`${results.simplifiedNumerator}/${results.simplifiedDenominator}`)
                            }
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Mixed Number:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.mixedNumber}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.mixedNumber)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Original Fraction:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.numerator}/{results.denominator}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.numerator}/${results.denominator}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Percentage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">{results.percentage}%</span>
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

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>
                          • Simplified by GCD({results.numerator}, {results.denominator})
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Recipe conversions and cooking</p>
                        <p>• Woodworking and construction</p>
                        <p>• Mathematical problem solving</p>
                        <p>• Engineering and technical drawings</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Divide className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a decimal number to convert to fraction</p>
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
