"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function RootCalculatorPage() {
  const [number, setNumber] = useState("")
  const [rootIndex, setRootIndex] = useState("2")
  const [results, setResults] = useState<{
    result: number
    isReal: boolean
    explanation: string
    approximation: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateRoot = () => {
    const num = Number.parseFloat(number)
    const index = Number.parseFloat(rootIndex)

    if (isNaN(num) || isNaN(index) || index === 0) return

    let result: number
    let isReal = true
    let explanation = ""
    let approximation = ""

    if (index === 2) {
      // Square root
      if (num < 0) {
        isReal = false
        result = Math.sqrt(Math.abs(num))
        explanation = `Square root of negative number: √${num} = ${result}i`
      } else {
        result = Math.sqrt(num)
        explanation = `Square root: √${num} = ${result}`
      }
    } else if (index === 3) {
      // Cube root (works for negative numbers)
      result = Math.sign(num) * Math.pow(Math.abs(num), 1 / 3)
      explanation = `Cube root: ∛${num} = ${result}`
    } else {
      // nth root
      if (num < 0 && index % 2 === 0) {
        isReal = false
        result = Math.pow(Math.abs(num), 1 / index)
        explanation = `Even root of negative number: ${index}√${num} = ${result}i`
      } else if (num < 0) {
        result = -Math.pow(Math.abs(num), 1 / index)
        explanation = `Odd root: ${index}√${num} = ${result}`
      } else {
        result = Math.pow(num, 1 / index)
        explanation = `${index}th root: ${index}√${num} = ${result}`
      }
    }

    // Check if result is close to an integer
    const rounded = Math.round(result)
    if (Math.abs(result - rounded) < 0.0001) {
      approximation = `Exact result: ${rounded}`
    } else {
      approximation = `Approximation: ${result.toFixed(6)}`
    }

    setResults({
      result: Math.round(result * 1000000) / 1000000,
      isReal,
      explanation,
      approximation,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumber("")
    setRootIndex("2")
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
              <Square className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Root Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate nth roots, square roots, cube roots, and more with MaiCalcs. Get precise results for both real
              and complex numbers.
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
                  <span>Root Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Number</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter the number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="root-index">Root Index (n)</Label>
                  <Select value={rootIndex} onValueChange={setRootIndex}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Square Root (√)</SelectItem>
                      <SelectItem value="3">Cube Root (∛)</SelectItem>
                      <SelectItem value="4">4th Root</SelectItem>
                      <SelectItem value="5">5th Root</SelectItem>
                      <SelectItem value="6">6th Root</SelectItem>
                      <SelectItem value="7">7th Root</SelectItem>
                      <SelectItem value="8">8th Root</SelectItem>
                      <SelectItem value="9">9th Root</SelectItem>
                      <SelectItem value="10">10th Root</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Root Properties:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Even roots of negative numbers are complex</p>
                    <p>• Odd roots of negative numbers are real</p>
                    <p>• √(a²) = |a| (absolute value)</p>
                    <p>• ∛(a³) = a (preserves sign)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateRoot} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Root
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
                    <div className={`rounded-lg p-4 ${results.isReal ? "bg-blue-50" : "bg-red-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-2xl font-bold ${results.isReal ? "text-blue-600" : "text-red-600"}`}>
                            {results.result}
                            {!results.isReal && "i"}
                          </span>
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

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Explanation:</h4>
                      <p className="text-purple-700">{results.explanation}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Precision:</h4>
                      <p className="text-green-700">{results.approximation}</p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Verification:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          Check: {results.result}^{rootIndex} ={" "}
                          {Math.pow(results.result, Number.parseFloat(rootIndex)).toFixed(6)}
                        </p>
                        <p>Original number: {number}</p>
                        <p>
                          Difference:{" "}
                          {Math.abs(
                            Number.parseFloat(number) - Math.pow(results.result, Number.parseFloat(rootIndex)),
                          ).toFixed(8)}
                        </p>
                      </div>
                    </div>

                    {!results.isReal && (
                      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Complex Number Note:</h4>
                        <p className="text-sm text-orange-700">
                          This result involves the imaginary unit 'i' because we're taking an even root of a negative
                          number. In the complex number system, this has a valid solution.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Square className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to calculate its root</p>
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
