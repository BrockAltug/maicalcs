"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ComparingFractionsCalculatorPage() {
  const [num1, setNum1] = useState("")
  const [den1, setDen1] = useState("")
  const [num2, setNum2] = useState("")
  const [den2, setDen2] = useState("")
  const [results, setResults] = useState<{
    comparison: string
    symbol: string
    decimal1: number
    decimal2: number
    commonDenominator: number
    equivalent1: string
    equivalent2: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b)
  }

  const compareFractions = () => {
    try {
      const n1 = Number.parseInt(num1)
      const d1 = Number.parseInt(den1)
      const n2 = Number.parseInt(num2)
      const d2 = Number.parseInt(den2)

      if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
        alert("Please enter valid integers. Denominators cannot be zero.")
        return
      }

      const decimal1 = n1 / d1
      const decimal2 = n2 / d2

      const commonDen = lcm(Math.abs(d1), Math.abs(d2))
      const equiv1Num = (n1 * commonDen) / d1
      const equiv2Num = (n2 * commonDen) / d2

      let comparison: string
      let symbol: string

      if (decimal1 > decimal2) {
        comparison = `${n1}/${d1} is greater than ${n2}/${d2}`
        symbol = ">"
      } else if (decimal1 < decimal2) {
        comparison = `${n1}/${d1} is less than ${n2}/${d2}`
        symbol = "<"
      } else {
        comparison = `${n1}/${d1} is equal to ${n2}/${d2}`
        symbol = "="
      }

      setResults({
        comparison,
        symbol,
        decimal1,
        decimal2,
        commonDenominator: commonDen,
        equivalent1: `${equiv1Num}/${commonDen}`,
        equivalent2: `${equiv2Num}/${commonDen}`,
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
    setNum1("")
    setDen1("")
    setNum2("")
    setDen2("")
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
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-white font-bold text-xl">½</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Comparing Fractions Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Compare two fractions to determine which is larger, smaller, or if they are equal with MaiCalcs. Get
              step-by-step solutions with common denominators and decimal equivalents.
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
                  <span>Enter Fractions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700">First Fraction</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="Numerator"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      className="text-lg font-mono"
                    />
                    <span className="text-2xl font-bold text-gray-600">/</span>
                    <Input
                      type="number"
                      placeholder="Denominator"
                      value={den1}
                      onChange={(e) => setDen1(e.target.value)}
                      className="text-lg font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700">Second Fraction</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="Numerator"
                      value={num2}
                      onChange={(e) => setNum2(e.target.value)}
                      className="text-lg font-mono"
                    />
                    <span className="text-2xl font-bold text-gray-600">/</span>
                    <Input
                      type="number"
                      placeholder="Denominator"
                      value={den2}
                      onChange={(e) => setDen2(e.target.value)}
                      className="text-lg font-mono"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Comparison Methods:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Convert to decimals and compare</p>
                    <p>• Find common denominator</p>
                    <p>• Cross multiplication</p>
                    <p>• Result: &gt;, &lt;, or = relationship</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 3/4 vs 2/3: 3/4 = 0.75, 2/3 = 0.667 → 3/4 &gt; 2/3</p>
                    <p>• 1/2 vs 2/4: 1/2 = 0.5, 2/4 = 0.5 → 1/2 = 2/4</p>
                    <p>• 2/5 vs 3/7: 2/5 = 0.4, 3/7 = 0.429 → 2/5 &lt; 3/7</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={compareFractions} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Compare
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
                  <span>Comparison Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {num1}/{den1} {results.symbol} {num2}/{den2}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${num1}/${den1} ${results.symbol} ${num2}/${den2}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Decimal Values:</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600 font-mono">
                            {num1}/{den1} = {results.decimal1.toFixed(4)}
                          </div>
                          <div className="text-lg font-bold text-green-600 font-mono">
                            {num2}/{den2} = {results.decimal2.toFixed(4)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Common Denominator:</span>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600 font-mono">{results.equivalent1}</div>
                          <div className="text-lg font-bold text-purple-600 font-mono">{results.equivalent2}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Comparison:</h4>
                      <div className="text-sm text-yellow-700">
                        <p>{results.comparison}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Ordering fractions from smallest to largest</p>
                        <p>• Solving fraction inequalities</p>
                        <p>• Recipe and cooking measurements</p>
                        <p>• Mathematical problem solving</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div className="text-white font-bold text-xl">½</div>
                    </div>
                    <p className="text-gray-500">Enter two fractions to compare them</p>
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
