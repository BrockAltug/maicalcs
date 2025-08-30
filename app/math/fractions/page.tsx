"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Divide } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function FractionsCalculatorPage() {
  const [operation, setOperation] = useState("add")
  const [num1, setNum1] = useState("")
  const [den1, setDen1] = useState("")
  const [num2, setNum2] = useState("")
  const [den2, setDen2] = useState("")
  const [results, setResults] = useState<{
    numerator: number
    denominator: number
    simplified: { num: number; den: number }
    decimal: number
    mixed?: { whole: number; num: number; den: number }
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b)
  }

  const simplifyFraction = (num: number, den: number) => {
    const divisor = gcd(num, den)
    return { num: num / divisor, den: den / divisor }
  }

  const toMixedNumber = (num: number, den: number) => {
    const whole = Math.floor(Math.abs(num) / Math.abs(den))
    const remainder = Math.abs(num) % Math.abs(den)
    const sign = num < 0 !== den < 0 ? -1 : 1
    return { whole: sign * whole, num: remainder, den: Math.abs(den) }
  }

  const calculateFractions = () => {
    const n1 = Number.parseInt(num1)
    const d1 = Number.parseInt(den1)
    const n2 = Number.parseInt(num2)
    const d2 = Number.parseInt(den2)

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) return

    let resultNum = 0
    let resultDen = 0

    switch (operation) {
      case "add":
        resultNum = n1 * d2 + n2 * d1
        resultDen = d1 * d2
        break
      case "subtract":
        resultNum = n1 * d2 - n2 * d1
        resultDen = d1 * d2
        break
      case "multiply":
        resultNum = n1 * n2
        resultDen = d1 * d2
        break
      case "divide":
        resultNum = n1 * d2
        resultDen = d1 * n2
        break
    }

    if (resultDen === 0) return

    const simplified = simplifyFraction(resultNum, resultDen)
    const decimal = resultNum / resultDen
    const mixed =
      Math.abs(simplified.num) >= Math.abs(simplified.den) ? toMixedNumber(simplified.num, simplified.den) : undefined

    setResults({
      numerator: resultNum,
      denominator: resultDen,
      simplified,
      decimal: Math.round(decimal * 10000) / 10000,
      mixed,
    })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNum1("")
    setDen1("")
    setNum2("")
    setDen2("")
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
              <Divide className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fractions Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Add, subtract, multiply, and divide fractions with MaiCalcs. Get simplified results, mixed numbers, and
              decimal equivalents.
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
                  <span>Fraction Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">First Fraction</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Numerator"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="text-center"
                      />
                      <span className="text-2xl text-gray-400">/</span>
                      <Input
                        type="number"
                        placeholder="Denominator"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                        className="text-center"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {operation === "add"
                        ? "+"
                        : operation === "subtract"
                          ? "-"
                          : operation === "multiply"
                            ? "×"
                            : "÷"}
                    </span>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Second Fraction</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Numerator"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="text-center"
                      />
                      <span className="text-2xl text-gray-400">/</span>
                      <Input
                        type="number"
                        placeholder="Denominator"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        className="text-center"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Fraction Rules:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Addition/Subtraction: Find common denominator</p>
                    <p>• Multiplication: Multiply numerators and denominators</p>
                    <p>• Division: Multiply by reciprocal</p>
                    <p>• Always simplify the final result</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateFractions} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                      <div className="text-center">
                        <span className="font-medium text-gray-700 block mb-2">Original Result:</span>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {results.numerator}/{results.denominator}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.numerator}/${results.denominator}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700 block mb-2">Simplified:</span>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">
                            {results.simplified.num}/{results.simplified.den}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.simplified.num}/${results.simplified.den}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {results.mixed && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-center">
                          <span className="font-medium text-gray-700 block mb-2">Mixed Number:</span>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-2xl font-bold text-green-600">
                              {results.mixed.whole !== 0 && `${results.mixed.whole} `}
                              {results.mixed.num !== 0 && `${results.mixed.num}/${results.mixed.den}`}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyResult(`${results.mixed?.whole} ${results.mixed?.num}/${results.mixed?.den}`)
                              }
                              className="h-8 w-8 p-0"
                            >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700 block mb-2">Decimal:</span>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">{results.decimal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.decimal.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step Solution:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          1. Original: {num1}/{den1}{" "}
                          {operation === "add"
                            ? "+"
                            : operation === "subtract"
                              ? "-"
                              : operation === "multiply"
                                ? "×"
                                : "÷"}{" "}
                          {num2}/{den2}
                        </p>
                        {operation === "add" || operation === "subtract" ? (
                          <>
                            <p>
                              2. Find common denominator: {Number.parseInt(den1)} × {Number.parseInt(den2)} ={" "}
                              {Number.parseInt(den1) * Number.parseInt(den2)}
                            </p>
                            <p>
                              3. Convert fractions: {num1}×{den2}/{Number.parseInt(den1) * Number.parseInt(den2)}{" "}
                              {operation === "add" ? "+" : "-"} {num2}×{den1}/
                              {Number.parseInt(den1) * Number.parseInt(den2)}
                            </p>
                            <p>
                              4. Calculate: {Number.parseInt(num1) * Number.parseInt(den2)}{" "}
                              {operation === "add" ? "+" : "-"} {Number.parseInt(num2) * Number.parseInt(den1)} ={" "}
                              {results.numerator}
                            </p>
                          </>
                        ) : operation === "multiply" ? (
                          <>
                            <p>
                              2. Multiply numerators: {num1} × {num2} = {results.numerator}
                            </p>
                            <p>
                              3. Multiply denominators: {den1} × {den2} = {results.denominator}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              2. Multiply by reciprocal: {num1}/{den1} × {den2}/{num2}
                            </p>
                            <p>
                              3. Calculate: {num1} × {den2} = {results.numerator}, {den1} × {num2} ={" "}
                              {results.denominator}
                            </p>
                          </>
                        )}
                        <p>
                          5. Simplify: {results.simplified.num}/{results.simplified.den}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Divide className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter fractions to calculate</p>
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
