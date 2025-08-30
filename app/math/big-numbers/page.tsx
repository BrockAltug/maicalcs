"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function BigNumbersCalculatorPage() {
  const [number1, setNumber1] = useState("")
  const [number2, setNumber2] = useState("")
  const [operation, setOperation] = useState("add")
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateBigNumbers = () => {
    try {
      const num1 = BigInt(number1)
      const num2 = BigInt(number2)
      let calculatedResult: bigint

      switch (operation) {
        case "add":
          calculatedResult = num1 + num2
          break
        case "subtract":
          calculatedResult = num1 - num2
          break
        case "multiply":
          calculatedResult = num1 * num2
          break
        case "divide":
          if (num2 === BigInt(0)) {
            setResult("Error: Division by zero")
            return
          }
          calculatedResult = num1 / num2
          break
        case "power":
          if (num2 < 0) {
            setResult("Error: Negative exponents not supported for BigInt")
            return
          }
          calculatedResult = num1 ** num2
          break
        case "modulo":
          if (num2 === BigInt(0)) {
            setResult("Error: Modulo by zero")
            return
          }
          calculatedResult = num1 % num2
          break
        default:
          calculatedResult = BigInt(0)
      }

      setResult(calculatedResult.toString())
    } catch (error) {
      setResult("Error: Invalid input")
    }
  }

  const copyResult = async () => {
    if (result) {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const reset = () => {
    setNumber1("")
    setNumber2("")
    setResult(null)
  }

  const getOperationSymbol = () => {
    switch (operation) {
      case "add":
        return "+"
      case "subtract":
        return "-"
      case "multiply":
        return "×"
      case "divide":
        return "÷"
      case "power":
        return "^"
      case "modulo":
        return "%"
      default:
        return "+"
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
              <Hash className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Big Numbers Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Perform calculations with extremely large numbers that exceed standard calculator limits. Perfect for
              cryptography, scientific calculations, and mathematical research.
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
                  <span>Big Number Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number1">First Number</Label>
                  <Input
                    id="number1"
                    type="text"
                    placeholder="Enter first large number"
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                    className="text-lg font-mono"
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
                      <SelectItem value="power">Power (^)</SelectItem>
                      <SelectItem value="modulo">Modulo (%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number2">Second Number</Label>
                  <Input
                    id="number2"
                    type="text"
                    placeholder="Enter second large number"
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Big Number Features:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• No limit on number size</p>
                    <p>• Perfect precision for integers</p>
                    <p>• Ideal for cryptographic calculations</p>
                    <p>• Scientific notation support</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateBigNumbers} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                {result ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-700">Calculation:</span>
                        <Button variant="ghost" size="sm" onClick={copyResult} className="h-8 w-8 p-0">
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 font-mono mb-2">
                        {number1} {getOperationSymbol()} {number2}
                      </p>
                      <div className="bg-white rounded p-3 border">
                        <p className="text-lg font-bold text-blue-600 font-mono break-all">{result}</p>
                      </div>
                    </div>

                    {result && !result.startsWith("Error") && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Number Properties:</h4>
                        <div className="text-sm text-green-700 space-y-1">
                          <p>• Length: {result.length} digits</p>
                          <p>• Type: {result.includes("-") ? "Negative" : "Positive"} Integer</p>
                          <p>• Even/Odd: {BigInt(result) % BigInt(2) === BigInt(0) ? "Even" : "Odd"}</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Use Cases:</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• Cryptographic key generation</p>
                        <p>• Mathematical research</p>
                        <p>• Large factorial calculations</p>
                        <p>• Financial calculations with precision</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hash className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter large numbers to perform calculations</p>
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
