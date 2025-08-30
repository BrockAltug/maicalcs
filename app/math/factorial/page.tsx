"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function FactorialCalculatorPage() {
  const [number, setNumber] = useState("")
  const [results, setResults] = useState<{
    factorial: string
    steps: string[]
    properties: string[]
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateFactorial = (n: number): bigint => {
    if (n <= 1) return BigInt(1)
    let result = BigInt(1)
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i)
    }
    return result
  }

  const calculate = () => {
    try {
      const n = Number.parseInt(number)

      if (isNaN(n) || n < 0 || n > 170) {
        alert("Please enter a non-negative integer between 0 and 170.")
        return
      }

      const factorial = calculateFactorial(n)

      const steps = []
      if (n === 0) {
        steps.push(`0! = 1 (by definition)`)
      } else if (n === 1) {
        steps.push(`1! = 1`)
      } else {
        steps.push(`${n}! = ${n} × ${n - 1} × ${n - 2} × ... × 2 × 1`)

        // Show first few steps for smaller numbers
        if (n <= 10) {
          let stepStr = `${n}! = `
          for (let i = n; i >= 1; i--) {
            stepStr += i
            if (i > 1) stepStr += " × "
          }
          steps.push(stepStr)
        }

        steps.push(`${n}! = ${factorial.toString()}`)
      }

      const properties = []
      if (n === 0) properties.push("0! = 1 by mathematical convention")
      if (n === 1) properties.push("1! = 1 (base case)")
      if (n > 1) properties.push(`${n}! = ${n} × ${n - 1}! (recursive definition)`)
      if (n >= 5) properties.push(`${n}! grows very rapidly (factorial growth)`)
      if (n >= 10) properties.push(`${n}! has ${factorial.toString().length} digits`)

      setResults({
        factorial: factorial.toString(),
        steps,
        properties,
        formula: `${n}! = ${n} × ${n - 1} × ${n - 2} × ... × 2 × 1`,
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumber("")
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
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-white font-bold text-xl">n!</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Factorial Calculator (n!)
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate factorials for any non-negative integer with MaiCalcs. Get step-by-step calculations and learn
              about factorial properties and applications.
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
                  <span>Enter Number</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Number (n)</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter a number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    min="0"
                    max="170"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-blue-800">{number || "n"}!</span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Factorials grow very quickly. Numbers above 170 exceed JavaScript's number
                    precision limits.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Factorial Definition:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• n! = n × (n-1) × (n-2) × ... × 2 × 1</p>
                    <p>• 0! = 1 (by definition)</p>
                    <p>• Symbol: n! (read as "n factorial")</p>
                    <p>• Growth: Extremely rapid increase</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Factorials:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 0! = 1, 1! = 1, 2! = 2, 3! = 6</p>
                    <p>• 4! = 24, 5! = 120, 10! = 3,628,800</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Factorial Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${number}! = ${results.factorial}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{number}! =</div>
                      <div className="text-lg text-blue-600 font-mono break-all max-h-32 overflow-y-auto">
                        {results.factorial}
                      </div>
                    </div>

                    {results.properties.length > 0 && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Properties:</h4>
                        <div className="space-y-1">
                          {results.properties.map((prop, index) => (
                            <div key={index} className="text-sm text-purple-700">
                              • {prop}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {results.steps.map((step, index) => (
                          <p key={index}>• {step}</p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Permutations and combinations</p>
                        <p>• Probability calculations</p>
                        <p>• Mathematical series</p>
                        <p>• Computer science algorithms</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div className="text-white font-bold text-xl">n!</div>
                    </div>
                    <p className="text-gray-500">Enter a number to calculate its factorial</p>
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
