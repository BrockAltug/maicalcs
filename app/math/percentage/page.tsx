"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PercentageCalculatorPage() {
  const [calculationType, setCalculationType] = useState("basic")
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState("")
  const [percentage, setPercentage] = useState("")
  const [results, setResults] = useState<{
    result: number
    explanation: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePercentage = () => {
    const num1 = Number.parseFloat(value1)
    const num2 = Number.parseFloat(value2)
    const percent = Number.parseFloat(percentage)

    if (calculationType === "basic" && !isNaN(percent) && !isNaN(num1)) {
      // What is X% of Y?
      const result = (percent / 100) * num1
      setResults({
        result: Math.round(result * 10000) / 10000,
        explanation: `${percent}% of ${num1} is ${result.toFixed(4)}`,
        formula: `(${percent} ÷ 100) × ${num1} = ${result.toFixed(4)}`,
      })
    } else if (calculationType === "is-what-percent" && !isNaN(num1) && !isNaN(num2)) {
      // X is what percent of Y?
      const result = (num1 / num2) * 100
      setResults({
        result: Math.round(result * 10000) / 10000,
        explanation: `${num1} is ${result.toFixed(4)}% of ${num2}`,
        formula: `(${num1} ÷ ${num2}) × 100 = ${result.toFixed(4)}%`,
      })
    } else if (calculationType === "percent-change" && !isNaN(num1) && !isNaN(num2)) {
      // Percentage change from X to Y
      const result = ((num2 - num1) / num1) * 100
      const changeType = result >= 0 ? "increase" : "decrease"
      setResults({
        result: Math.round(result * 10000) / 10000,
        explanation: `${Math.abs(result).toFixed(4)}% ${changeType} from ${num1} to ${num2}`,
        formula: `((${num2} - ${num1}) ÷ ${num1}) × 100 = ${result.toFixed(4)}%`,
      })
    } else if (calculationType === "percent-of-total" && !isNaN(num1) && !isNaN(num2)) {
      // X out of Y as percentage
      const result = (num1 / num2) * 100
      setResults({
        result: Math.round(result * 10000) / 10000,
        explanation: `${num1} out of ${num2} is ${result.toFixed(4)}%`,
        formula: `(${num1} ÷ ${num2}) × 100 = ${result.toFixed(4)}%`,
      })
    }
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setValue1("")
    setValue2("")
    setPercentage("")
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
              <Percent className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Percentage Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate percentages, percentage changes, and solve percentage problems with MaiCalcs. Get step-by-step
              solutions and explanations.
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
                  <span>Percentage Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculation-type">What do you want to calculate?</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">What is X% of Y?</SelectItem>
                      <SelectItem value="is-what-percent">X is what percent of Y?</SelectItem>
                      <SelectItem value="percent-change">Percentage change from X to Y</SelectItem>
                      <SelectItem value="percent-of-total">X out of Y as percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "basic" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="percentage">Percentage (%)</Label>
                      <Input
                        id="percentage"
                        type="number"
                        placeholder="Enter percentage"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value1">Of what number?</Label>
                      <Input
                        id="value1"
                        type="number"
                        placeholder="Enter the number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  </>
                )}

                {(calculationType === "is-what-percent" ||
                  calculationType === "percent-change" ||
                  calculationType === "percent-of-total") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="value1">
                        {calculationType === "percent-change" ? "Original value" : "First number"}
                      </Label>
                      <Input
                        id="value1"
                        type="number"
                        placeholder="Enter first number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value2">
                        {calculationType === "percent-change"
                          ? "New value"
                          : calculationType === "is-what-percent"
                            ? "Of what number?"
                            : "Total number"}
                      </Label>
                      <Input
                        id="value2"
                        type="number"
                        placeholder="Enter second number"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  </>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Common Percentage Uses:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Discounts and sales calculations</p>
                    <p>• Tax and tip calculations</p>
                    <p>• Grade and test score analysis</p>
                    <p>• Financial growth and change</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePercentage} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                          <span className="text-2xl font-bold text-blue-600">
                            {calculationType === "basic" ? results.result : `${results.result}%`}
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
                      <h4 className="font-semibold text-green-800 mb-2">Formula Used:</h4>
                      <p className="text-green-700 font-mono text-sm">{results.formula}</p>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {calculationType === "basic" && (
                          <>
                            <p>
                              1. Convert percentage to decimal: {percentage}% ÷ 100 ={" "}
                              {Number.parseFloat(percentage) / 100}
                            </p>
                            <p>
                              2. Multiply by the number: {Number.parseFloat(percentage) / 100} × {value1} ={" "}
                              {results.result}
                            </p>
                          </>
                        )}
                        {calculationType === "is-what-percent" && (
                          <>
                            <p>
                              1. Divide the part by the whole: {value1} ÷ {value2} ={" "}
                              {Number.parseFloat(value1) / Number.parseFloat(value2)}
                            </p>
                            <p>
                              2. Multiply by 100: {Number.parseFloat(value1) / Number.parseFloat(value2)} × 100 ={" "}
                              {results.result}%
                            </p>
                          </>
                        )}
                        {calculationType === "percent-change" && (
                          <>
                            <p>
                              1. Find the difference: {value2} - {value1} ={" "}
                              {Number.parseFloat(value2) - Number.parseFloat(value1)}
                            </p>
                            <p>
                              2. Divide by original: {Number.parseFloat(value2) - Number.parseFloat(value1)} ÷ {value1}{" "}
                              = {(Number.parseFloat(value2) - Number.parseFloat(value1)) / Number.parseFloat(value1)}
                            </p>
                            <p>
                              3. Multiply by 100:{" "}
                              {(Number.parseFloat(value2) - Number.parseFloat(value1)) / Number.parseFloat(value1)} ×
                              100 = {results.result}%
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Percent className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter values to calculate percentage</p>
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
