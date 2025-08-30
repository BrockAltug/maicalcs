"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Binary } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function BinaryCalculatorPage() {
  const [inputValue, setInputValue] = useState("")
  const [inputBase, setInputBase] = useState("10")
  const [results, setResults] = useState<{
    decimal: number
    binary: string
    hexadecimal: string
    octal: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const convertNumber = () => {
    let decimalValue: number

    try {
      switch (inputBase) {
        case "2": // Binary to decimal
          if (!/^[01]+$/.test(inputValue)) {
            alert("Invalid binary number. Use only 0s and 1s.")
            return
          }
          decimalValue = Number.parseInt(inputValue, 2)
          break
        case "8": // Octal to decimal
          if (!/^[0-7]+$/.test(inputValue)) {
            alert("Invalid octal number. Use only digits 0-7.")
            return
          }
          decimalValue = Number.parseInt(inputValue, 8)
          break
        case "10": // Decimal
          decimalValue = Number.parseInt(inputValue, 10)
          if (isNaN(decimalValue)) {
            alert("Invalid decimal number.")
            return
          }
          break
        case "16": // Hexadecimal to decimal
          if (!/^[0-9A-Fa-f]+$/.test(inputValue)) {
            alert("Invalid hexadecimal number. Use digits 0-9 and letters A-F.")
            return
          }
          decimalValue = Number.parseInt(inputValue, 16)
          break
        default:
          return
      }

      if (decimalValue < 0) {
        alert("Please enter a positive number.")
        return
      }

      setResults({
        decimal: decimalValue,
        binary: decimalValue.toString(2),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        octal: decimalValue.toString(8),
      })
    } catch (error) {
      alert("Invalid input. Please check your number format.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setInputValue("")
    setInputBase("10")
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
              <Binary className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Binary Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert between binary, decimal, hexadecimal, and octal number systems with MaiCalcs. Perfect for
              programming and computer science applications.
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
                  <span>Number Conversion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-base">Input Number System</Label>
                  <Select value={inputBase} onValueChange={setInputBase}>
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
                  <Label htmlFor="input-value">
                    {inputBase === "2"
                      ? "Binary Number"
                      : inputBase === "8"
                        ? "Octal Number"
                        : inputBase === "10"
                          ? "Decimal Number"
                          : "Hexadecimal Number"}
                  </Label>
                  <Input
                    id="input-value"
                    type="text"
                    placeholder={
                      inputBase === "2"
                        ? "e.g., 1010"
                        : inputBase === "8"
                          ? "e.g., 755"
                          : inputBase === "10"
                            ? "e.g., 42"
                            : "e.g., 2A"
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Number System Guide:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Binary (Base 2): Uses digits 0, 1</p>
                    <p>• Octal (Base 8): Uses digits 0-7</p>
                    <p>• Decimal (Base 10): Uses digits 0-9</p>
                    <p>• Hexadecimal (Base 16): Uses 0-9, A-F</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Binary: 1010 = 10 (decimal)</p>
                    <p>• Octal: 12 = 10 (decimal)</p>
                    <p>• Hex: A = 10 (decimal)</p>
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
                        <span className="font-medium text-gray-700">Decimal (Base 10):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.decimal}</span>
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

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Binary (Base 2):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.binary}</span>
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
                      <h4 className="font-semibold text-yellow-800 mb-2">Conversion Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          • Input: {inputValue} (Base {inputBase})
                        </p>
                        <p>• Decimal equivalent: {results.decimal}</p>
                        <p>• Binary representation: {results.binary}</p>
                        <p>• Hex representation: {results.hexadecimal}</p>
                        <p>• Octal representation: {results.octal}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Binary Analysis:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Number of bits: {results.binary.length}</p>
                        <p>• Highest bit position: {results.binary.length - 1}</p>
                        <p>• Number of 1s: {results.binary.split("1").length - 1}</p>
                        <p>• Number of 0s: {results.binary.split("0").length - 1}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Binary className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to convert between number systems</p>
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
