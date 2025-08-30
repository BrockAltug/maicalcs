"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, ActivityIcon as Function } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function LogarithmCalculatorPage() {
  const [number, setNumber] = useState("")
  const [base, setBase] = useState("e")
  const [customBase, setCustomBase] = useState("")
  const [results, setResults] = useState<{
    result: number
    explanation: string
    steps: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateLogarithm = () => {
    const num = Number.parseFloat(number)

    if (isNaN(num) || num <= 0) return

    let logBase: number
    let baseName: string
    let calculationSteps: string[] = []

    switch (base) {
      case "e":
        logBase = Math.E
        baseName = "e (natural logarithm)"
        break
      case "10":
        logBase = 10
        baseName = "10 (common logarithm)"
        break
      case "2":
        logBase = 2
        baseName = "2 (binary logarithm)"
        break
      case "custom":
        logBase = Number.parseFloat(customBase)
        if (isNaN(logBase) || logBase <= 0 || logBase === 1) return
        baseName = customBase
        break
      default:
        return
    }

    const logResult = Math.log(num) / Math.log(logBase)

    calculationSteps = [
      `Calculating log base ${baseName} of ${num}`,
      base === "e"
        ? `ln(${num}) = ${logResult.toFixed(6)}`
        : base === "10"
          ? `log₁₀(${num}) = ${logResult.toFixed(6)}`
          : base === "2"
            ? `log₂(${num}) = ${logResult.toFixed(6)}`
            : `log₍${baseName}₎(${num}) = ${logResult.toFixed(6)}`,
      `Using change of base formula: log₍${baseName}₎(${num}) = ln(${num}) / ln(${baseName})`,
      `= ${Math.log(num).toFixed(6)} / ${Math.log(logBase).toFixed(6)}`,
      `= ${logResult.toFixed(6)}`,
    ]

    // Add verification step
    const verification = Math.pow(logBase, logResult)
    calculationSteps.push(`Verification: ${baseName}^${logResult.toFixed(6)} ≈ ${verification.toFixed(6)}`)

    setResults({
      result: logResult,
      explanation:
        base === "e"
          ? `ln(${num}) = ${logResult.toFixed(6)}`
          : base === "10"
            ? `log₁₀(${num}) = ${logResult.toFixed(6)}`
            : base === "2"
              ? `log₂(${num}) = ${logResult.toFixed(6)}`
              : `log₍${baseName}₎(${num}) = ${logResult.toFixed(6)}`,
      steps: calculationSteps,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumber("")
    setBase("e")
    setCustomBase("")
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
              <Function className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Logarithm Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate natural logarithms, common logarithms, and custom base logarithms with MaiCalcs. Get detailed
              step-by-step solutions and explanations.
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
                  <span>Logarithm Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Number (must be positive)</Label>
                  <Input
                    id="number"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="Enter a positive number (e.g., 100, 2.718)"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="base">Logarithm Base</Label>
                  <Select value={base} onValueChange={setBase}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="e">Natural logarithm (ln) - base e</SelectItem>
                      <SelectItem value="10">Common logarithm (log) - base 10</SelectItem>
                      <SelectItem value="2">Binary logarithm (log₂) - base 2</SelectItem>
                      <SelectItem value="custom">Custom base</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {base === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="customBase">Custom Base (positive number ≠ 1)</Label>
                    <Input
                      id="customBase"
                      type="number"
                      step="any"
                      min="0"
                      placeholder="Enter custom base (e.g., 3, 5, 7)"
                      value={customBase}
                      onChange={(e) => setCustomBase(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Logarithm Types:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Natural (ln): Base e ≈ 2.718</p>
                    <p>• Common (log): Base 10</p>
                    <p>• Binary (log₂): Base 2</p>
                    <p>• Custom: Any positive base ≠ 1</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• ln(e) = 1</p>
                    <p>• log₁₀(100) = 2</p>
                    <p>• log₂(8) = 3</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateLogarithm} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Logarithm Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.result.toFixed(6)}</span>
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
                      <h4 className="font-semibold text-gray-800 mb-2">Logarithm Properties:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Domain: x &gt; 0 (positive numbers only)</p>
                        <p>• Range: All real numbers</p>
                        <p>• log(1) = 0 for any base</p>
                        <p>• log(base) = 1 for any base</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Function className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a positive number and click Calculate to see the logarithm</p>
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
