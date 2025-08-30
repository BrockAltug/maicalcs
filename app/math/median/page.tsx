"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function MedianCalculatorPage() {
  const [numbers, setNumbers] = useState("")
  const [results, setResults] = useState<{
    median: number
    sortedNumbers: number[]
    explanation: string
    steps: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateMedian = () => {
    // Parse numbers from input
    const numberArray = numbers
      .split(/[,\s\n]+/)
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map((n) => Number.parseFloat(n))
      .filter((n) => !isNaN(n))

    if (numberArray.length === 0) return

    // Sort the numbers
    const sorted = [...numberArray].sort((a, b) => a - b)
    const n = sorted.length
    let median: number
    const calculationSteps: string[] = []

    calculationSteps.push(`Original numbers: ${numberArray.join(", ")}`)
    calculationSteps.push(`Sorted numbers: ${sorted.join(", ")}`)
    calculationSteps.push(`Count of numbers: ${n}`)

    if (n % 2 === 1) {
      // Odd number of elements
      const middleIndex = Math.floor(n / 2)
      median = sorted[middleIndex]
      calculationSteps.push(`Since we have ${n} numbers (odd), the median is the middle value`)
      calculationSteps.push(`Middle position: ${middleIndex + 1}`)
      calculationSteps.push(`Median = ${median}`)
    } else {
      // Even number of elements
      const middleIndex1 = n / 2 - 1
      const middleIndex2 = n / 2
      const value1 = sorted[middleIndex1]
      const value2 = sorted[middleIndex2]
      median = (value1 + value2) / 2
      calculationSteps.push(`Since we have ${n} numbers (even), the median is the average of the two middle values`)
      calculationSteps.push(`Middle positions: ${middleIndex1 + 1} and ${middleIndex2 + 1}`)
      calculationSteps.push(`Middle values: ${value1} and ${value2}`)
      calculationSteps.push(`Median = (${value1} + ${value2}) / 2 = ${median}`)
    }

    setResults({
      median,
      sortedNumbers: sorted,
      explanation: `The median of ${numberArray.join(", ")} is ${median}`,
      steps: calculationSteps,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
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
              <BarChart className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Median Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find the median (middle value) of any set of numbers with MaiCalcs. Perfect for statistics, data analysis,
              and understanding central tendency.
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
                  <span>Median Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="numbers">Numbers</Label>
                  <Textarea
                    id="numbers"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="Enter numbers separated by commas, spaces, or new lines&#10;Example: 12, 7, 3, 15, 9, 21, 5"
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Median Rules:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Odd count: Middle value</p>
                    <p>• Even count: Average of two middle values</p>
                    <p>• Numbers must be sorted first</p>
                    <p>• Robust to outliers</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• [1, 3, 5] → Median = 3</p>
                    <p>• [1, 2, 3, 4] → Median = 2.5</p>
                    <p>• [10, 20, 30] → Median = 20</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateMedian} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Median
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
                  <span>Median Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Median:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.median}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.median)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Sorted Numbers:</span>
                      </div>
                      <p className="text-gray-700 font-mono text-lg mt-2">{results.sortedNumbers.join(", ")}</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Explanation:</h4>
                      <p className="text-purple-700">{results.explanation}</p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {results.steps.map((step, index) => (
                          <p key={index}>
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Statistical Analysis:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Dataset size: {results.sortedNumbers.length}</p>
                        <p>• Minimum value: {Math.min(...results.sortedNumbers)}</p>
                        <p>• Maximum value: {Math.max(...results.sortedNumbers)}</p>
                        <p>• Range: {Math.max(...results.sortedNumbers) - Math.min(...results.sortedNumbers)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter numbers and click Calculate to find the median</p>
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
