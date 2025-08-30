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

export default function RemainderCalculatorPage() {
  const [dividend, setDividend] = useState("")
  const [divisor, setDivisor] = useState("")
  const [results, setResults] = useState<{
    quotient: number
    remainder: number
    explanation: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateRemainder = () => {
    const num1 = Number.parseFloat(dividend)
    const num2 = Number.parseFloat(divisor)

    if (isNaN(num1) || isNaN(num2) || num2 === 0) {
      return
    }

    const quotient = Math.floor(num1 / num2)
    const remainder = num1 % num2

    setResults({
      quotient,
      remainder,
      explanation: `${num1} ÷ ${num2} = ${quotient} remainder ${remainder}`,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setDividend("")
    setDivisor("")
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
              Remainder Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the remainder and quotient when dividing two numbers. Perfect for understanding division with
              remainders and modular arithmetic.
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
                  <span>Division with Remainder</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dividend">Dividend (Number to be divided)</Label>
                  <Input
                    id="dividend"
                    type="number"
                    placeholder="Enter dividend"
                    value={dividend}
                    onChange={(e) => setDividend(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="divisor">Divisor (Number to divide by)</Label>
                  <Input
                    id="divisor"
                    type="number"
                    placeholder="Enter divisor"
                    value={divisor}
                    onChange={(e) => setDivisor(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Remainder Division:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Quotient: How many times divisor fits</p>
                    <p>• Remainder: What's left over</p>
                    <p>• Formula: dividend = quotient × divisor + remainder</p>
                    <p>• Used in modular arithmetic and programming</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateRemainder} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Quotient:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.quotient}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.quotient)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Remainder:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">{results.remainder}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.remainder)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Explanation:</h4>
                      <p className="text-green-700">{results.explanation}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Verification:</h4>
                      <p className="text-yellow-700 font-mono">
                        {results.quotient} × {divisor} + {results.remainder} ={" "}
                        {results.quotient * Number.parseFloat(divisor) + results.remainder}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Clock arithmetic (12-hour format)</p>
                        <p>• Computer programming (modulo operator)</p>
                        <p>• Cryptography and number theory</p>
                        <p>• Dividing items into equal groups</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Divide className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dividend and divisor to calculate remainder</p>
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
