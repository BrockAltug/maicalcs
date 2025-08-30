"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, BarChart3, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SequenceCalculatorPage() {
  const [sequenceType, setSequenceType] = useState("arithmetic")
  const [terms, setTerms] = useState<string[]>(["", "", "", ""])
  const [results, setResults] = useState<{
    sequenceType: string
    commonDifference?: number
    commonRatio?: number
    nextTerms: number[]
    formula: string
    nthTerm: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const updateTerm = (index: number, value: string) => {
    const newTerms = [...terms]
    newTerms[index] = value
    setTerms(newTerms)
  }

  const addTerm = () => {
    if (terms.length < 10) {
      setTerms([...terms, ""])
    }
  }

  const detectSequenceType = (numbers: number[]) => {
    if (numbers.length < 2) return null

    // Check for arithmetic sequence
    const differences = []
    for (let i = 1; i < numbers.length; i++) {
      differences.push(numbers[i] - numbers[i - 1])
    }

    const isArithmetic = differences.every((diff) => Math.abs(diff - differences[0]) < 0.0001)

    if (isArithmetic) {
      return { type: "arithmetic", commonDifference: differences[0] }
    }

    // Check for geometric sequence
    const ratios = []
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i - 1] !== 0) {
        ratios.push(numbers[i] / numbers[i - 1])
      }
    }

    if (ratios.length > 0) {
      const isGeometric = ratios.every((ratio) => Math.abs(ratio - ratios[0]) < 0.0001)
      if (isGeometric) {
        return { type: "geometric", commonRatio: ratios[0] }
      }
    }

    return { type: "other" }
  }

  const calculateSequence = () => {
    const validNumbers = terms.map((term) => Number.parseFloat(term)).filter((num) => !isNaN(num))

    if (validNumbers.length < 2) return

    let sequenceInfo
    if (sequenceType === "detect") {
      sequenceInfo = detectSequenceType(validNumbers)
    } else {
      sequenceInfo = { type: sequenceType }
    }

    if (!sequenceInfo) return

    const nextTerms: number[] = []
    let formula = ""
    let nthTerm = ""

    if (sequenceInfo.type === "arithmetic" || sequenceType === "arithmetic") {
      const commonDiff = sequenceInfo.commonDifference || validNumbers[1] - validNumbers[0]
      const lastTerm = validNumbers[validNumbers.length - 1]

      // Generate next 5 terms
      for (let i = 1; i <= 5; i++) {
        nextTerms.push(lastTerm + commonDiff * i)
      }

      formula = `aₙ = a₁ + (n-1)d`
      nthTerm = `aₙ = ${validNumbers[0]} + (n-1)(${commonDiff})`

      setResults({
        sequenceType: "Arithmetic",
        commonDifference: commonDiff,
        nextTerms,
        formula,
        nthTerm,
      })
    } else if (sequenceInfo.type === "geometric" || sequenceType === "geometric") {
      const commonRatio = sequenceInfo.commonRatio || validNumbers[1] / validNumbers[0]
      const lastTerm = validNumbers[validNumbers.length - 1]

      // Generate next 5 terms
      for (let i = 1; i <= 5; i++) {
        nextTerms.push(lastTerm * Math.pow(commonRatio, i))
      }

      formula = `aₙ = a₁ × r^(n-1)`
      nthTerm = `aₙ = ${validNumbers[0]} × ${commonRatio}^(n-1)`

      setResults({
        sequenceType: "Geometric",
        commonRatio,
        nextTerms,
        formula,
        nthTerm,
      })
    } else {
      setResults({
        sequenceType: "Unknown/Other",
        nextTerms: [],
        formula: "Pattern not recognized",
        nthTerm: "Cannot determine formula",
      })
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setTerms(["", "", "", ""])
    setSequenceType("arithmetic")
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
              Number Sequence Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find patterns in number sequences and generate next terms with MaiCalcs. Supports arithmetic, geometric,
              and pattern detection.
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
                  <span>Sequence Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sequence-type">Sequence Type</Label>
                  <Select value={sequenceType} onValueChange={setSequenceType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="detect">Auto-detect Pattern</SelectItem>
                      <SelectItem value="arithmetic">Arithmetic Sequence</SelectItem>
                      <SelectItem value="geometric">Geometric Sequence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Enter sequence terms (at least 2 numbers)</Label>
                  {terms.map((term, index) => (
                    <Input
                      key={index}
                      type="number"
                      placeholder={`Term ${index + 1}`}
                      value={term}
                      onChange={(e) => updateTerm(index, e.target.value)}
                      className="text-lg"
                    />
                  ))}
                  {terms.length < 10 && (
                    <Button variant="outline" onClick={addTerm} className="w-full bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Term
                    </Button>
                  )}
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Sequence Types:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Arithmetic: Constant difference between terms</p>
                    <p>• Geometric: Constant ratio between terms</p>
                    <p>• Examples: 2,4,6,8... (arithmetic) or 2,4,8,16... (geometric)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSequence} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Analyze Sequence
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
                  <span>Sequence Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Sequence Type:</span>
                        <span className="text-xl font-bold text-blue-600">{results.sequenceType}</span>
                      </div>
                    </div>

                    {results.commonDifference !== undefined && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Common Difference:</span>
                          <span className="text-xl font-bold text-green-600">{results.commonDifference}</span>
                        </div>
                      </div>
                    )}

                    {results.commonRatio !== undefined && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Common Ratio:</span>
                          <span className="text-xl font-bold text-purple-600">{results.commonRatio}</span>
                        </div>
                      </div>
                    )}

                    {results.nextTerms.length > 0 && (
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="text-center">
                          <span className="font-medium text-gray-700 block mb-2">Next 5 Terms:</span>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-lg font-bold text-orange-600">
                              {results.nextTerms.map((term) => term.toFixed(2)).join(", ")}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyResult(results.nextTerms.join(", "))}
                              className="h-8 w-8 p-0"
                            >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">General Formula:</h4>
                      <p className="text-yellow-700 font-mono text-sm">{results.formula}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Specific Formula:</h4>
                      <p className="text-gray-700 font-mono text-sm">{results.nthTerm}</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2">Input Terms:</h4>
                      <p className="text-indigo-700">{terms.filter((term) => term !== "").join(", ")}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter sequence terms to analyze pattern</p>
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
