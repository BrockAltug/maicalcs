"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function IntegerCalculatorPage() {
  const [number1, setNumber1] = useState("")
  const [number2, setNumber2] = useState("")
  const [operation, setOperation] = useState("add")
  const [results, setResults] = useState<{
    result: number
    explanation: string
    steps: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateInteger = () => {
    const num1 = Number.parseInt(number1)
    const num2 = Number.parseInt(number2)

    if (isNaN(num1) || isNaN(num2)) return

    let calculationResult: number
    let explanation = ""
    let steps: string[] = []

    switch (operation) {
      case "add":
        calculationResult = num1 + num2
        explanation = `${num1} + ${num2} = ${calculationResult}`
        steps = [
          `Adding ${num1} and ${num2}`,
          `${num1} + ${num2} = ${calculationResult}`,
          num1 >= 0 && num2 >= 0
            ? "Both numbers are positive, result is positive"
            : num1 < 0 && num2 < 0
              ? "Both numbers are negative, result is negative"
              : "One positive and one negative number, subtract and keep sign of larger absolute value",
        ]
        break
      case "subtract":
        calculationResult = num1 - num2
        explanation = `${num1} - ${num2} = ${calculationResult}`
        steps = [
          `Subtracting ${num2} from ${num1}`,
          `${num1} - ${num2} = ${calculationResult}`,
          `This is equivalent to ${num1} + (${-num2}) = ${calculationResult}`,
        ]
        break
      case "multiply":
        calculationResult = num1 * num2
        explanation = `${num1} × ${num2} = ${calculationResult}`
        steps = [
          `Multiplying ${num1} and ${num2}`,
          `${num1} × ${num2} = ${calculationResult}`,
          (num1 >= 0 && num2 >= 0) || (num1 < 0 && num2 < 0)
            ? "Same signs: result is positive"
            : "Different signs: result is negative",
        ]
        break
      case "divide":
        if (num2 === 0) return
        calculationResult = Math.floor(num1 / num2)
        explanation = `${num1} ÷ ${num2} = ${calculationResult}`
        steps = [
          `Dividing ${num1} by ${num2}`,
          `${num1} ÷ ${num2} = ${num1 / num2}`,
          `Integer division result: ${calculationResult}`,
          num1 % num2 !== 0 ? `Remainder: ${num1 % num2}` : "No remainder",
        ]
        break
      default:
        return
    }

    setResults({
      result: calculationResult,
      explanation,
      steps,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumber1("")
    setNumber2("")
    setOperation("add")
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
              <Plus className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Integer and Negative Number Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Perform arithmetic operations with positive and negative integers with MaiCalcs. Learn the rules for
              integer operations with step-by-step explanations.
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
                  <span>Integer Calculator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number1">First Integer</Label>
                  <Input
                    id="number1"
                    type="number"
                    placeholder="Enter first integer (e.g., -5, 10)"
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operation">Operation</Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Addition (+)</SelectItem>
                      <SelectItem value="subtract">Subtraction (-)</SelectItem>
                      <SelectItem value="multiply">Multiplication (×)</SelectItem>
                      <SelectItem value="divide">Division (÷)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number2">Second Integer</Label>
                  <Input
                    id="number2"
                    type="number"
                    placeholder="Enter second integer (e.g., -3, 7)"
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Integer Operation Rules:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Positive + Positive = Positive</p>
                    <p>• Negative + Negative = Negative</p>
                    <p>• Positive × Negative = Negative</p>
                    <p>• Negative × Negative = Positive</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 15 + 8 = 23</p>
                    <p>• -12 × 7 = -84</p>
                    <p>• 20 ÷ -5 = -4</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateInteger} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Calculation Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.result}</span>
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
                      <h4 className="font-semibold text-gray-800 mb-2">Integer Properties:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Result is an integer: {Number.isInteger(results.result) ? "Yes" : "No"}</p>
                        <p>• Sign: {results.result >= 0 ? "Positive" : "Negative"}</p>
                        <p>• Absolute value: {Math.abs(results.result)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Plus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter integers and click Calculate to see the result</p>
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
