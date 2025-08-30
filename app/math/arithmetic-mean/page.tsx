"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, BarChart3, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ArithmeticMeanCalculatorPage() {
  const [numbers, setNumbers] = useState<string[]>(["", "", ""])
  const [results, setResults] = useState<{
    mean: number
    sum: number
    count: number
    median: number
    mode: number[]
    range: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const addNumber = () => {
    setNumbers([...numbers, ""])
  }

  const removeNumber = (index: number) => {
    if (numbers.length > 1) {
      setNumbers(numbers.filter((_, i) => i !== index))
    }
  }

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers]
    newNumbers[index] = value
    setNumbers(newNumbers)
  }

  const calculateMean = () => {
    const validNumbers = numbers.map((n) => Number.parseFloat(n)).filter((n) => !isNaN(n))

    if (validNumbers.length === 0) return

    const sum = validNumbers.reduce((acc, num) => acc + num, 0)
    const mean = sum / validNumbers.length

    // Calculate median
    const sorted = [...validNumbers].sort((a, b) => a - b)
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)]

    // Calculate mode
    const frequency: { [key: number]: number } = {}
    validNumbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1
    })
    const maxFreq = Math.max(...Object.values(frequency))
    const mode = Object.keys(frequency)
      .filter((key) => frequency[Number.parseFloat(key)] === maxFreq)
      .map((key) => Number.parseFloat(key))

    // Calculate range
    const range = Math.max(...validNumbers) - Math.min(...validNumbers)

    setResults({
      mean: Math.round(mean * 10000) / 10000,
      sum: Math.round(sum * 10000) / 10000,
      count: validNumbers.length,
      median: Math.round(median * 10000) / 10000,
      mode: maxFreq > 1 ? mode : [],
      range: Math.round(range * 10000) / 10000,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumbers(["", "", ""])
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
              Arithmetic Mean Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the arithmetic mean (average) of a set of numbers with MaiCalcs. Also get median, mode, and
              range statistics.
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
                  <span>Enter Numbers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Numbers (enter at least 2 values)</Label>
                  {numbers.map((number, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder={`Number ${index + 1}`}
                        value={number}
                        onChange={(e) => updateNumber(index, e.target.value)}
                        className="flex-1"
                      />
                      {numbers.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeNumber(index)}
                          className="h-10 w-10 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addNumber}
                    className="w-full bg-transparent"
                    disabled={numbers.length >= 20}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Number
                  </Button>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Statistical Measures:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Mean: Sum of all values ÷ count</p>
                    <p>• Median: Middle value when sorted</p>
                    <p>• Mode: Most frequently occurring value(s)</p>
                    <p>• Range: Difference between max and min</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateMean} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Mean
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
                        <span className="font-medium text-gray-700">Arithmetic Mean:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.mean}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.mean)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Sum:</span>
                        <span className="text-xl font-bold text-purple-600">{results.sum}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Count:</span>
                        <span className="text-xl font-bold text-green-600">{results.count}</span>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Median:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600">{results.median}</span>
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

                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Mode:</span>
                        <span className="text-xl font-bold text-red-600">
                          {results.mode.length > 0 ? results.mode.join(", ") : "No mode"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Range:</span>
                        <span className="text-xl font-bold text-yellow-600">{results.range}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Calculation Details:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Formula: Mean = Sum ÷ Count</p>
                        <p>• Sum = {results.sum}</p>
                        <p>• Count = {results.count}</p>
                        <p>
                          • Mean = {results.sum} ÷ {results.count} = {results.mean}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2">Data Summary:</h4>
                      <div className="text-sm text-indigo-700 space-y-1">
                        <p>• Numbers entered: {numbers.filter((n) => n !== "").length}</p>
                        <p>• Valid numbers: {results.count}</p>
                        <p>• Average value: {results.mean}</p>
                        <p>• Middle value: {results.median}</p>
                        <p>• Data spread: {results.range}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter numbers to calculate arithmetic mean</p>
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
