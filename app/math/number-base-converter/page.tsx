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

export default function NumberBaseConverterPage() {
  const [inputValue, setInputValue] = useState("")
  const [fromBase, setFromBase] = useState("10")
  const [results, setResults] = useState<{
    binary: string
    decimal: string
    hexadecimal: string
    octal: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const convertNumber = () => {
    try {
      if (!inputValue.trim()) {
        alert("Please enter a number to convert.")
        return
      }

      let decimalValue: number

      // Convert input to decimal first
      switch (fromBase) {
        case "2": // Binary
          if (!/^[01]+$/.test(inputValue)) {
            alert("Invalid binary number. Use only 0 and 1.")
            return
          }
          decimalValue = Number.parseInt(inputValue, 2)
          break
        case "8": // Octal
          if (!/^[0-7]+$/.test(inputValue)) {
            alert("Invalid octal number. Use only digits 0-7.")
            return
          }
          decimalValue = Number.parseInt(inputValue, 8)
          break
        case "10": // Decimal
          if (!/^\d+$/.test(inputValue)) {
            alert("Invalid decimal number. Use only digits 0-9.")
            return
          }
          decimalValue = Number.parseInt(inputValue, 10)
          break
        case "16": // Hexadecimal
          if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
            alert("Invalid hexadecimal number. Use digits 0-9 and letters A-F.")
            return
          }
          decimalValue = Number.parseInt(inputValue, 16)
          break
        default:
          return
      }

      if (isNaN(decimalValue) || decimalValue < 0) {
        alert("Please enter a valid positive number.")
        return
      }

      const binary = decimalValue.toString(2)
      const decimal = decimalValue.toString(10)
      const hexadecimal = decimalValue.toString(16).toUpperCase()
      const octal = decimalValue.toString(8)

      const baseNames = { "2": "Binary", "8": "Octal", "10": "Decimal", "16": "Hexadecimal" }
      const formula = `${baseNames[fromBase as keyof typeof baseNames]} ${inputValue} → Decimal ${decimal}`

      setResults({
        binary,
        decimal,
        hexadecimal,
        octal,
        formula,
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
    setInputValue("")
    setFromBase("10")
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
              Number Base Converter
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert numbers between binary, decimal, hexadecimal, and octal systems with MaiCalcs. Perfect for
              programming and digital electronics.
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
                <div className="space-y-2">
                  <Label htmlFor="fromBase">From Base</Label>
                  <Select value={fromBase} onValueChange={setFromBase}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Binary (Base 2)</SelectItem>
                      <SelectItem value="8">Octal (Base 8)</SelectItem>
                      <SelectItem value="10">Decimal (Base 10)</SelectItem>
                      <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputValue">Number</Label>
                  <Input
                    id="inputValue"
                    type="text"
                    placeholder={`Enter ${fromBase === "2" ? "binary" : fromBase === "8" ? "octal" : fromBase === "10" ? "decimal" : "hexadecimal"} number`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Number Systems:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Binary (Base 2): Uses 0, 1</p>
                    <p>• Octal (Base 8): Uses 0-7</p>
                    <p>• Decimal (Base 10): Uses 0-9</p>
                    <p>• Hexadecimal (Base 16): Uses 0-9, A-F</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Binary: 1010 = Decimal 10</p>
                    <p>• Octal: 12 = Decimal 10</p>
                    <p>• Hex: A = Decimal 10</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Applications:</h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• Computer programming</p>
                    <p>• Digital electronics</p>
                    <p>• Network addressing</p>
                    <p>• Color codes (hex)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={convertNumber} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convert
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
                  <span>Conversion Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Binary (Base 2):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.binary}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.binary)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Decimal (Base 10):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.decimal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.decimal)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Hexadecimal (Base 16):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.hexadecimal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.hexadecimal)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Octal (Base 8):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">{results.octal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.octal)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Conversion Process:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Then converted to all other bases</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Quick Reference:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Programmers use hex for memory addresses</p>
                        <p>• Binary represents digital states (0/1)</p>
                        <p>• Octal was common in older computer systems</p>
                        <p>• Decimal is our everyday number system</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hash className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to convert between different bases</p>
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
