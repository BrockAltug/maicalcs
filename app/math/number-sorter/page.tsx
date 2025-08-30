"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, SortAsc, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function NumberSorterPage() {
  const [numbers, setNumbers] = useState("")
  const [sortOrder, setSortOrder] = useState("ascending")
  const [results, setResults] = useState<{
    sortedNumbers: number[]
    originalNumbers: number[]
    explanation: string
    steps: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const sortNumbers = () => {
    // Parse numbers from input
    const numberArray = numbers
      .split(/[,\s\n]+/)
      .map((n) => n.trim())
      .filter((n) => n !== "")
      .map((n) => Number.parseFloat(n))
      .filter((n) => !isNaN(n))

    if (numberArray.length === 0) return
    if (numberArray.length < 2) return

    // Sort the numbers
    const sorted = [...numberArray].sort((a, b) => {
      return sortOrder === "ascending" ? a - b : b - a
    })

    const sortingSteps: string[] = []
    sortingSteps.push(`Original numbers: ${numberArray.join(", ")}`)
    sortingSteps.push(`Count of numbers: ${numberArray.length}`)
    sortingSteps.push(`Sort order: ${sortOrder}`)
    sortingSteps.push(`Sorted numbers: ${sorted.join(", ")}`)

    // Add some sorting algorithm explanation
    if (numberArray.length <= 10) {
      sortingSteps.push(`Sorting method: Comparison-based sorting`)
      sortingSteps.push(`Time complexity: O(n log n) where n = ${numberArray.length}`)
    }

    setResults({
      sortedNumbers: sorted,
      originalNumbers: numberArray,
      explanation: `Numbers sorted in ${sortOrder} order: ${sorted.join(", ")}`,
      steps: sortingSteps,
    })
  }

  const copyResult = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumbers("")
    setSortOrder("ascending")
    setResults(null)
  }

  const reverseSort = () => {
    if (results) {
      const reversed = [...results.sortedNumbers].reverse()
      const newOrder = sortOrder === "ascending" ? "descending" : "ascending"
      setSortOrder(newOrder)

      const newSteps = [...results.steps]
      newSteps[newSteps.length - 2] = `Sort order: ${newOrder}`
      newSteps[newSteps.length - 1] = `Sorted numbers: ${reversed.join(", ")}`

      setResults({
        ...results,
        sortedNumbers: reversed,
        explanation: `Numbers sorted in ${newOrder} order: ${reversed.join(", ")}`,
        steps: newSteps,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <SortAsc className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Number Sorter
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sort any list of numbers in ascending or descending order with MaiCalcs. Perfect for organizing data,
              finding patterns, and data analysis.
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
                  <span>Number Sorter</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="numbers">Numbers to Sort</Label>
                  <Textarea
                    id="numbers"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="Enter numbers separated by commas, spaces, or new lines&#10;Example: 64, 34, 25, 12, 22, 11, 90"
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ascending">Ascending (Low to High)</SelectItem>
                      <SelectItem value="descending">Descending (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Sorting Types:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Ascending: 1, 2, 3, 4, 5</p>
                    <p>• Descending: 5, 4, 3, 2, 1</p>
                    <p>• Works with decimals and negatives</p>
                    <p>• Comparison-based algorithm</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Random: 64, 34, 25, 12, 22</p>
                    <p>• Decimals: 3.14, 2.71, 1.41</p>
                    <p>• Mixed: -5, 10, -3, 8, 15</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={sortNumbers} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Sort Numbers
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
                  <span>Sorted Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Sorted Numbers:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.sortedNumbers.join(", "))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <p className="text-blue-600 font-mono text-lg mt-2">{results.sortedNumbers.join(", ")}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Original Numbers:</span>
                      </div>
                      <p className="text-gray-700 font-mono text-lg mt-2">{results.originalNumbers.join(", ")}</p>
                    </div>

                    <div className="flex gap-2 justify-center">
                      <Button onClick={reverseSort} variant="outline" size="sm" className="gap-2 bg-transparent">
                        <ArrowUpDown className="h-4 w-4" />
                        Reverse Order
                      </Button>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Explanation:</h4>
                      <p className="text-purple-700">{results.explanation}</p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Sorting Details:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {results.steps.map((step, index) => (
                          <p key={index}>
                            {index + 1}. {step}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Sorting Analysis:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Total numbers: {results.sortedNumbers.length}</p>
                        <p>• Smallest: {Math.min(...results.sortedNumbers)}</p>
                        <p>• Largest: {Math.max(...results.sortedNumbers)}</p>
                        <p>• Range: {Math.max(...results.sortedNumbers) - Math.min(...results.sortedNumbers)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SortAsc className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter numbers and click Sort to organize your data</p>
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
