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

export default function SimplifyingFractionsCalculatorPage() {
  const [numerator, setNumerator] = useState("")
  const [denominator, setDenominator] = useState("")
  const [results, setResults] = useState<{
    simplifiedNumerator: number
    simplifiedDenominator: number
    gcd: number
    decimal: number
    percentage: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const calculateSimplifiedFraction = () => {
    try {
      const num = Number.parseInt(numerator)
      const den = Number.parseInt(denominator)

      if (isNaN(num) || isNaN(den) || den === 0) {
        alert("Please enter valid integers. Denominator cannot be zero.")
        return
      }

      const greatestCommonDivisor = gcd(Math.abs(num), Math.abs(den))
      const simplifiedNum = num / greatestCommonDivisor
      const simplifiedDen = den / greatestCommonDivisor
      const decimal = num / den
      const percentage = (num / den) * 100

      setResults({
        simplifiedNumerator: simplifiedNum,
        simplifiedDenominator: simplifiedDen,
        gcd: greatestCommonDivisor,
        decimal: Number.parseFloat(decimal.toFixed(6)),
        percentage: Number.parseFloat(percentage.toFixed(2)),
        formula: `${num}/${den} = ${simplifiedNum}/${simplifiedDen}`,
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
              Simplifying Fractions Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Simplify fractions to their lowest terms by finding the greatest common divisor with MaiCalcs. Perfect for
              math homework and cooking measurements.
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
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Simplification Process:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Find GCD of numerator and denominator</p>
                    <p>• Divide both by GCD</p>
                    <p>• Result is the simplified fraction</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 8/12 → 2/3 (GCD = 4)</p>
                    <p>• 15/25 → 3/5 (GCD = 5)</p>
                    <p>• 24/36 → 2/3 (GCD = 12)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSimplifiedFraction} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Simplify
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
                  <span>Simplified Results</span>
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
                        <span className="font-medium text-gray-700">GCD:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.gcd}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.gcd}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Decimal:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.decimal}</span>
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
                          • GCD({numerator}, {denominator}) = {results.gcd}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Math homework and tests</p>
                        <p>• Cooking and recipe measurements</p>
                        <p>• Engineering calculations</p>
                        <p>• Financial ratios and analysis</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Divide className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter numerator and denominator to simplify the fraction</p>
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
