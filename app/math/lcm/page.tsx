"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function LCMCalculatorPage() {
  const [numbers, setNumbers] = useState(["", ""])
  const [results, setResults] = useState<{
    lcm: number
    steps: string[]
    multiples: Array<{ number: number; multiples: number[] }>
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b)
  }

  const calculateLCM = () => {
    try {
      const validNumbers = numbers.filter((n) => n.trim() !== "").map((n) => Number.parseInt(n))

      if (validNumbers.length < 2) {
        alert("Please enter at least 2 numbers.")
        return
      }

      if (validNumbers.some((n) => n <= 0 || isNaN(n))) {
        alert("Please enter valid positive integers.")
        return
      }

      let result = validNumbers[0]
      for (let i = 1; i < validNumbers.length; i++) {
        result = lcm(result, validNumbers[i])
      }

      // Generate multiples for visualization
      const multiples = validNumbers.map((num) => ({
        number: num,
        multiples: Array.from({ length: Math.min(10, Math.ceil(result / num)) }, (_, i) => num * (i + 1)),
      }))

      const steps = [
        `Numbers: ${validNumbers.join(", ")}`,
        `Finding LCM step by step:`,
        ...validNumbers
          .slice(1)
          .map(
            (num, i) =>
              `LCM(${i === 0 ? validNumbers[0] : "previous result"}, ${num}) = ${i === 0 ? lcm(validNumbers[0], num) : "calculated"}`,
          ),
        `Final LCM = ${result}`,
      ]

      setResults({ lcm: result, steps, multiples })
    } catch (error) {
      alert("Invalid input. Please check your numbers.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addNumber = () => {
    setNumbers([...numbers, ""])
  }

  const removeNumber = (index: number) => {
    if (numbers.length > 2) {
      setNumbers(numbers.filter((_, i) => i !== index))
    }
  }

  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers]
    newNumbers[index] = value
    setNumbers(newNumbers)
  }

  const reset = () => {
    setNumbers(["", ""])
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
              <Hash className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LCM Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find the Least Common Multiple (LCM) of two or more numbers with MaiCalcs. Essential for fraction
              operations and number theory problems.
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
                  <span>Number Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {numbers.map((number, index) => (
                  <div key={index} className="space-y-2">
                    <Label>Number {index + 1}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder={`Enter number ${index + 1}`}
                        value={number}
                        onChange={(e) => updateNumber(index, e.target.value)}
                        className="text-lg font-mono"
                      />
                      {numbers.length > 2 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeNumber(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button onClick={addNumber} variant="outline" className="w-full bg-transparent">
                  Add Another Number
                </Button>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">What is LCM?</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• LCM is the smallest positive integer divisible by all given numbers</p>
                    <p>• Used in fraction addition/subtraction and solving equations</p>
                    <p>• Formula: LCM(a,b) = |a×b| / GCD(a,b)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• LCM(4, 6) = 12</p>
                    <p>• LCM(8, 12) = 24</p>
                    <p>• LCM(3, 5, 7) = 105</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateLCM} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate LCM
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
                  <span>LCM Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Least Common Multiple:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.lcm}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.lcm.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Multiples Visualization:</h4>
                      <div className="space-y-2">
                        {results.multiples.map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium text-gray-700">Multiples of {item.number}:</span>
                            <div className="text-green-700 font-mono">
                              {item.multiples.join(", ")}
                              {item.multiples[item.multiples.length - 1] < results.lcm && "..."}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step Solution:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {results.steps.map((step, index) => (
                          <p key={index}>• {step}</p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Properties:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• LCM is always ≥ the largest input number</p>
                        <p>• LCM(a,b) × GCD(a,b) = a × b</p>
                        <p>• LCM of coprime numbers = their product</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hash className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter numbers to find their LCM</p>
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
