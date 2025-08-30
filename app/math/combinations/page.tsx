"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function CombinationsCalculatorPage() {
  const [n, setN] = useState("")
  const [r, setR] = useState("")
  const [calculationType, setCalculationType] = useState("combinations")
  const [results, setResults] = useState<{
    result: number
    explanation: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const factorial = (num: number): number => {
    if (num <= 1) return 1
    return num * factorial(num - 1)
  }

  const calculateCombinations = () => {
    const nValue = Number.parseInt(n)
    const rValue = Number.parseInt(r)

    if (isNaN(nValue) || isNaN(rValue) || nValue < 0 || rValue < 0 || rValue > nValue) {
      return
    }

    let result: number
    let explanation: string
    let formula: string

    if (calculationType === "combinations") {
      // nCr = n! / (r! * (n-r)!)
      result = factorial(nValue) / (factorial(rValue) * factorial(nValue - rValue))
      explanation = `There are ${result} ways to choose ${rValue} items from ${nValue} items (order doesn't matter)`
      formula = `C(${nValue},${rValue}) = ${nValue}! / (${rValue}! × ${nValue - rValue}!) = ${result}`
    } else {
      // nPr = n! / (n-r)!
      result = factorial(nValue) / factorial(nValue - rValue)
      explanation = `There are ${result} ways to arrange ${rValue} items from ${nValue} items (order matters)`
      formula = `P(${nValue},${rValue}) = ${nValue}! / ${nValue - rValue}! = ${result}`
    }

    setResults({
      result,
      explanation,
      formula,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setN("")
    setR("")
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
              <Shuffle className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Combinations Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate combinations (nCr) and permutations (nPr) for probability problems, statistics, and
              combinatorics. Perfect for lottery odds, team selections, and arrangement problems.
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
                  <span>Combinations & Permutations</span>
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
                      <SelectItem value="combinations">Combinations (nCr) - Order doesn't matter</SelectItem>
                      <SelectItem value="permutations">Permutations (nPr) - Order matters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="n-value">n (Total number of items)</Label>
                  <Input
                    id="n-value"
                    type="number"
                    placeholder="Enter total items"
                    value={n}
                    onChange={(e) => setN(e.target.value)}
                    className="text-lg"
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="r-value">r (Number of items to choose)</Label>
                  <Input
                    id="r-value"
                    type="number"
                    placeholder="Enter items to choose"
                    value={r}
                    onChange={(e) => setR(e.target.value)}
                    className="text-lg"
                    min="0"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    {calculationType === "combinations" ? "Combinations (nCr):" : "Permutations (nPr):"}
                  </h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    {calculationType === "combinations" ? (
                      <>
                        <p>• Order doesn't matter</p>
                        <p>• Selecting team members</p>
                        <p>• Lottery number combinations</p>
                        <p>• Formula: nCr = n! / (r! × (n-r)!)</p>
                      </>
                    ) : (
                      <>
                        <p>• Order matters</p>
                        <p>• Arranging people in line</p>
                        <p>• Password arrangements</p>
                        <p>• Formula: nPr = n! / (n-r)!</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateCombinations} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-blue-600">{results.result.toLocaleString()}</span>
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
                      <h4 className="font-semibold text-green-800 mb-2">Formula:</h4>
                      <p className="text-green-700 font-mono text-sm">{results.formula}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Steps:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          1. n = {n}, r = {r}
                        </p>
                        <p>
                          2. n! = {n}! = {factorial(Number.parseInt(n)).toLocaleString()}
                        </p>
                        <p>
                          3. r! = {r}! = {factorial(Number.parseInt(r)).toLocaleString()}
                        </p>
                        {calculationType === "combinations" && (
                          <p>
                            4. (n-r)! = {Number.parseInt(n) - Number.parseInt(r)}! ={" "}
                            {factorial(Number.parseInt(n) - Number.parseInt(r)).toLocaleString()}
                          </p>
                        )}
                        <p>
                          {calculationType === "combinations" ? "5" : "4"}. Result = {results.result.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Real-world Examples:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        {calculationType === "combinations" ? (
                          <>
                            <p>
                              • Choosing {r} people from {n} for a committee
                            </p>
                            <p>
                              • Selecting {r} lottery numbers from {n} possible
                            </p>
                            <p>
                              • Picking {r} toppings from {n} pizza options
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              • Arranging {r} people from {n} in specific positions
                            </p>
                            <p>
                              • Creating {r}-digit codes from {n} possible digits
                            </p>
                            <p>
                              • Ranking top {r} from {n} contestants
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shuffle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter n and r values to calculate combinations or permutations</p>
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
