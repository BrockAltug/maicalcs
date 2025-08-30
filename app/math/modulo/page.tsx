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

export default function ModuloCalculatorPage() {
  const [dividend, setDividend] = useState("")
  const [divisor, setDivisor] = useState("")
  const [results, setResults] = useState<{
    remainder: number
    quotient: number
    explanation: string
    steps: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateModulo = () => {
    const num1 = Number.parseInt(dividend)
    const num2 = Number.parseInt(divisor)

    if (isNaN(num1) || isNaN(num2)) return
    if (num2 === 0) return

    const remainder = num1 % num2
    const quotientResult = Math.floor(num1 / num2)

    const calculationSteps: string[] = []

    calculationSteps.push(`Calculating ${num1} mod ${num2}`)
    calculationSteps.push(`Division: ${num1} ÷ ${num2} = ${(num1 / num2).toFixed(6)}`)
    calculationSteps.push(`Quotient (integer part): ${quotientResult}`)
    calculationSteps.push(`Verification: ${quotientResult} × ${num2} = ${quotientResult * num2}`)
    calculationSteps.push(`Remainder: ${num1} - ${quotientResult * num2} = ${remainder}`)
    calculationSteps.push(`Therefore: ${num1} mod ${num2} = ${remainder}`)

    // Add explanation about the result
    if (remainder === 0) {
      calculationSteps.push(`Since remainder is 0, ${num1} is divisible by ${num2}`)
    } else {
      calculationSteps.push(`Since remainder is ${remainder}, ${num1} is not divisible by ${num2}`)
    }

    // Add modular arithmetic properties
    if (Math.abs(num2) > 1) {
      calculationSteps.push(`In modular arithmetic: ${num1} ≡ ${remainder} (mod ${Math.abs(num2)})`)
    }

    setResults({
      remainder,
      quotient: quotientResult,
      explanation: `${num1} mod ${num2} = ${remainder}`,
      steps: calculationSteps,
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
              Modulo Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate modulo operations and remainders with MaiCalcs. Essential for programming, cryptography, and
              understanding cyclic patterns.
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
                  <span>Modulo Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dividend">Dividend (a)</Label>
                  <Input
                    id="dividend"
                    type="number"
                    placeholder="Enter dividend (e.g., 17)"
                    value={dividend}
                    onChange={(e) => setDividend(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="divisor">Divisor (b)</Label>
                  <Input
                    id="divisor"
                    type="number"
                    placeholder="Enter divisor (e.g., 5)"
                    value={divisor}
                    onChange={(e) => setDivisor(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Modulo Operation:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• a mod b = remainder of a ÷ b</p>
                    <p>• Result is always 0 ≤ r &lt; |b|</p>
                    <p>• Used in programming and cryptography</p>
                    <p>• Clock arithmetic (time calculations)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 17 mod 5 = 2</p>
                    <p>• 25 mod 12 = 1 (clock time)</p>
                    <p>• -17 mod 5 = 3</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateModulo} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Modulo Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Remainder:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.remainder}</span>
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

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Quotient:</span>
                        <span className="text-xl font-bold text-gray-600">{results.quotient}</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Explanation:</h4>
                      <p className="text-purple-700">{results.explanation}</p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step Solution:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {results.steps.map((step, index) => (
                          <p key={index}>
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Modular Properties:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Divisibility: {results.remainder === 0 ? "Yes" : "No"}</p>
                        <p>
                          • Congruence: {dividend} ≡ {results.remainder} (mod {Math.abs(divisor)})
                        </p>
                        <p>• Range: 0 ≤ remainder &lt; {Math.abs(divisor)}</p>
                        <p>• Application: {results.remainder === 0 ? "Perfect division" : "Has remainder"}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Divide className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dividend and divisor to calculate the modulo</p>
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
