"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function StandardDeviationCalculatorPage() {
  const [numbers, setNumbers] = useState("")
  const [calculationType, setCalculationType] = useState("population")
  const [results, setResults] = useState<{
    mean: number
    variance: number
    standardDeviation: number
    count: number
    sum: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateStandardDeviation = () => {
    try {
      const numberArray = numbers
        .split(/[,\s]+/)
        .filter((n) => n.trim() !== "")
        .map((n) => Number.parseFloat(n.trim()))

      if (numberArray.length < 2) {
        alert("Please enter at least 2 numbers.")
        return
      }

      if (numberArray.some((n) => isNaN(n))) {
        alert("Please enter valid numbers only.")
        return
      }

      const n = numberArray.length
      const sum = numberArray.reduce((acc, num) => acc + num, 0)
      const mean = sum / n

      const squaredDifferences = numberArray.map((num) => Math.pow(num - mean, 2))
      const sumSquaredDiff = squaredDifferences.reduce((acc, diff) => acc + diff, 0)

      const variance = calculationType === "population" ? sumSquaredDiff / n : sumSquaredDiff / (n - 1)
      const standardDeviation = Math.sqrt(variance)

      setResults({
        mean: Number.parseFloat(mean.toFixed(4)),
        variance: Number.parseFloat(variance.toFixed(4)),
        standardDeviation: Number.parseFloat(standardDeviation.toFixed(4)),
        count: n,
        sum: Number.parseFloat(sum.toFixed(4)),
      })
    } catch (error) {
      alert("Invalid input. Please check your numbers.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumbers("")
    setCalculationType("population")
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
              <BarChart3 className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Standard Deviation Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate population and sample standard deviation with variance and mean using MaiCalcs. Essential for
              statistical analysis and data science.
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
                  <span>Data Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculation-type">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="population">Population Standard Deviation</SelectItem>
                      <SelectItem value="sample">Sample Standard Deviation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numbers">Numbers (comma or space separated)</Label>
                  <Input
                    id="numbers"
                    type="text"
                    placeholder="e.g., 1, 2, 3, 4, 5 or 1 2 3 4 5"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Standard Deviation Types:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Population: σ = √(Σ(x-μ)²/N)</p>
                    <p>• Sample: s = √(Σ(x-x̄)²/(n-1))</p>
                    <p>• Measures data spread from mean</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Data: 1,2,3,4,5 → σ = 1.58</p>
                    <p>• Data: 10,20,30 → σ = 8.16</p>
                    <p>• Higher SD = more spread out data</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateStandardDeviation} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Statistical Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Standard Deviation:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.standardDeviation}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.standardDeviation.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Variance:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.variance}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.variance.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Mean:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.mean}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.mean.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Count:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">{results.count}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.count.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Statistical Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Type: {calculationType === "population" ? "Population" : "Sample"} Standard Deviation</p>
                        <p>• Data points: {results.count}</p>
                        <p>• Sum: {results.sum}</p>
                        <p>• Mean: {results.mean}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Interpretation:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Low SD: Data points close to mean</p>
                        <p>• High SD: Data points spread out</p>
                        <p>• Variance = SD²</p>
                        <p>• Used in quality control and risk analysis</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter numbers to calculate standard deviation</p>
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
