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

export default function HexCalculatorPage() {
  const [inputValue, setInputValue] = useState("")
  const [inputType, setInputType] = useState("decimal")
  const [results, setResults] = useState<{
    decimal: string
    hexadecimal: string
    binary: string
    octal: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const convertNumber = () => {
    try {
      let decimalValue: number

      switch (inputType) {
        case "decimal":
          decimalValue = Number.parseInt(inputValue, 10)
          break
        case "hexadecimal":
          decimalValue = Number.parseInt(inputValue.replace(/^0x/i, ""), 16)
          break
        case "binary":
          decimalValue = Number.parseInt(inputValue.replace(/^0b/i, ""), 2)
          break
        case "octal":
          decimalValue = Number.parseInt(inputValue.replace(/^0o/i, ""), 8)
          break
        default:
          decimalValue = Number.parseInt(inputValue, 10)
      }

      if (isNaN(decimalValue)) {
        return
      }

      setResults({
        decimal: decimalValue.toString(),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
      })
    } catch (error) {
      // Handle invalid input
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setInputValue("")
    setResults(null)
  }

  const getInputPlaceholder = () => {
    switch (inputType) {
      case "decimal":
        return "Enter decimal number (e.g., 255)"
      case "hexadecimal":
        return "Enter hex number (e.g., FF or 0xFF)"
      case "binary":
        return "Enter binary number (e.g., 11111111)"
      case "octal":
        return "Enter octal number (e.g., 377)"
      default:
        return "Enter number"
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
              Hex Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert between hexadecimal, decimal, binary, and octal number systems. Perfect for programming, web
              development, and computer science.
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
                  <span>Number System Converter</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-type">Input Type</Label>
                  <Select value={inputType} onValueChange={setInputType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decimal">Decimal (Base 10)</SelectItem>
                      <SelectItem value="hexadecimal">Hexadecimal (Base 16)</SelectItem>
                      <SelectItem value="binary">Binary (Base 2)</SelectItem>
                      <SelectItem value="octal">Octal (Base 8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input-value">Number</Label>
                  <Input
                    id="input-value"
                    type="text"
                    placeholder={getInputPlaceholder()}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Number Systems:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Decimal: 0-9 (everyday numbers)</p>
                    <p>• Hexadecimal: 0-9, A-F (web colors, memory)</p>
                    <p>• Binary: 0-1 (computer language)</p>
                    <p>• Octal: 0-7 (file permissions)</p>
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
                  <span>Conversions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Decimal:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-blue-600 font-mono">{results.decimal}</span>
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
                        <span className="font-medium text-gray-700">Hexadecimal:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-purple-600 font-mono">0x{results.hexadecimal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`0x${results.hexadecimal}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Binary:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-600 font-mono break-all">
                            0b{results.binary}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`0b${results.binary}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Octal:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-yellow-600 font-mono">0o{results.octal}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`0o${results.octal}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Common Uses:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Web colors: #{results.hexadecimal.padStart(6, "0")}</p>
                        <p>• Memory addresses: 0x{results.hexadecimal}</p>
                        <p>• File permissions: {results.octal}</p>
                        <p>• Bit operations: {results.binary}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hash className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to see conversions</p>
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
