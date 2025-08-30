"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

interface MultiplicationStep {
  multiplier: string
  multiplicand: string
  partialProduct: string
  position: number
}

export default function LongMultiplicationPage() {
  const [number1, setNumber1] = useState("")
  const [number2, setNumber2] = useState("")
  const [results, setResults] = useState<{
    result: number
    steps: MultiplicationStep[]
    explanation: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const performLongMultiplication = () => {
    const num1 = Number.parseInt(number1)
    const num2 = Number.parseInt(number2)

    if (isNaN(num1) || isNaN(num2)) return
    if (num1 < 0 || num2 < 0) return

    const multiplicand = number1
    const multiplier = number2
    const finalResult = num1 * num2

    // Generate step-by-step multiplication
    const multiplicationSteps: MultiplicationStep[] = []
    const explanationSteps: string[] = []

    explanationSteps.push(`Multiplying ${multiplicand} × ${multiplier}`)
    explanationSteps.push(`We'll multiply ${multiplicand} by each digit of ${multiplier}`)

    // Process each digit of the multiplier (from right to left)
    const multiplierDigits = multiplier.split("").reverse()

    for (let i = 0; i < multiplierDigits.length; i++) {
      const digit = Number.parseInt(multiplierDigits[i])
      const partialResult = num1 * digit
      const partialResultWithZeros = partialResult * Math.pow(10, i)

      multiplicationSteps.push({
        multiplier: digit.toString(),
        multiplicand: multiplicand,
        partialProduct: partialResultWithZeros.toString(),
        position: i,
      })

      if (i === 0) {
        explanationSteps.push(`Step ${i + 1}: ${multiplicand} × ${digit} = ${partialResult}`)
      } else {
        explanationSteps.push(
          `Step ${i + 1}: ${multiplicand} × ${digit} × 10^${i} = ${partialResult} × ${Math.pow(10, i)} = ${partialResultWithZeros}`,
        )
      }
    }

    // Add final sum step
    const partialProducts = multiplicationSteps.map((step) => Number.parseInt(step.partialProduct))
    explanationSteps.push(`Final step: Add all partial products`)
    explanationSteps.push(`${partialProducts.join(" + ")} = ${finalResult}`)

    setResults({
      result: finalResult,
      steps: multiplicationSteps,
      explanation: explanationSteps,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumber1("")
    setNumber2("")
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
              <X className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Long Multiplication Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Learn long multiplication with detailed step-by-step breakdowns with MaiCalcs. Perfect for students
              learning traditional multiplication methods.
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
                  <span>Long Multiplication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number1">First Number (Multiplicand)</Label>
                  <Input
                    id="number1"
                    type="number"
                    min="0"
                    placeholder="Enter first number (e.g., 234)"
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number2">Second Number (Multiplier)</Label>
                  <Input
                    id="number2"
                    type="number"
                    min="0"
                    placeholder="Enter second number (e.g., 56)"
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Long Multiplication Steps:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Multiply by each digit of multiplier</p>
                    <p>• Account for place value (powers of 10)</p>
                    <p>• Add all partial products together</p>
                    <p>• Align numbers properly</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 234 × 56 = 13,104</p>
                    <p>• 123 × 45 = 5,535</p>
                    <p>• 789 × 123 = 97,047</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={performLongMultiplication} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Step-by-Step Solution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Final Result:</span>
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

                    {results.steps.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">Long Multiplication Layout:</h4>
                        <div className="font-mono text-base bg-white p-3 rounded border">
                          <div className="text-right mb-1">{number1}</div>
                          <div className="text-right mb-1">× {number2}</div>
                          <div className="border-b border-gray-400 mb-1"></div>
                          {results.steps.map((step, index) => (
                            <div key={index} className="text-right mb-1">
                              {step.partialProduct.padStart(Math.max(number1.length, number2.length) + 2)}
                            </div>
                          ))}
                          <div className="border-b border-gray-400 mb-1"></div>
                          <div className="text-right font-bold">{results.result}</div>
                        </div>
                      </div>
                    )}

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Detailed Explanation:</h4>
                      <div className="text-purple-700 space-y-1">
                        {results.explanation.map((step, index) => (
                          <p key={index} className="text-sm">
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Multiplication Analysis:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Number of digits in result: {results.result.toString().length}</p>
                        <p>• Partial products: {results.steps.length}</p>
                        <p>• Place values used: {results.steps.map((_, i) => `10^${i}`).join(", ")}</p>
                        <p>• Traditional algorithm: Yes</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Educational Value:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Builds place value understanding</p>
                        <p>• Foundation for algebraic multiplication</p>
                        <p>• Develops mental math skills</p>
                        <p>• Shows distributive property in action</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <X className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter two numbers to see the long multiplication process</p>
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
