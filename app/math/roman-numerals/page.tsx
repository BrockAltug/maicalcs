"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function RomanNumeralConverterPage() {
  const [inputValue, setInputValue] = useState("")
  const [conversionType, setConversionType] = useState("toRoman")
  const [results, setResults] = useState<{
    result: string
    explanation: string
    breakdown: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ]

  const toRoman = (num: number): { result: string; breakdown: string[] } => {
    let result = ""
    const breakdown: string[] = []
    let remaining = num

    for (const { value, numeral } of romanNumerals) {
      const count = Math.floor(remaining / value)
      if (count > 0) {
        result += numeral.repeat(count)
        breakdown.push(`${value} × ${count} = ${numeral.repeat(count)}`)
        remaining -= value * count
      }
    }

    return { result, breakdown }
  }

  const fromRoman = (roman: string): { result: number; breakdown: string[] } => {
    let result = 0
    const breakdown: string[] = []
    let remaining = roman.toUpperCase()

    for (const { value, numeral } of romanNumerals) {
      while (remaining.startsWith(numeral)) {
        result += value
        breakdown.push(`${numeral} = ${value}`)
        remaining = remaining.slice(numeral.length)
      }
    }

    return { result: result, breakdown }
  }

  const convertNumber = () => {
    try {
      if (conversionType === "toRoman") {
        const num = Number.parseInt(inputValue)
        if (isNaN(num) || num <= 0 || num > 3999) {
          return
        }
        const { result, breakdown } = toRoman(num)
        setResults({
          result,
          explanation: `${num} in Roman numerals is ${result}`,
          breakdown,
        })
      } else {
        const { result, breakdown } = fromRoman(inputValue)
        if (result === 0 && inputValue !== "") {
          return
        }
        setResults({
          result: result.toString(),
          explanation: `${inputValue.toUpperCase()} in Arabic numerals is ${result}`,
          breakdown,
        })
      }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Type className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Roman Numeral Converter
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert between Roman numerals and Arabic numbers. Perfect for historical dates, clock faces, movie
              sequels, and educational purposes.
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
                  <span>Roman Numeral Conversion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="conversion-type">Conversion Type</Label>
                  <Select value={conversionType} onValueChange={setConversionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toRoman">Number to Roman Numeral</SelectItem>
                      <SelectItem value="fromRoman">Roman Numeral to Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input-value">
                    {conversionType === "toRoman" ? "Number (1-3999)" : "Roman Numeral"}
                  </Label>
                  <Input
                    id="input-value"
                    type="text"
                    placeholder={
                      conversionType === "toRoman" ? "Enter number (e.g., 1994)" : "Enter Roman numeral (e.g., MCMXCIV)"
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Roman Numeral Rules:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• I=1, V=5, X=10, L=50, C=100, D=500, M=1000</p>
                    <p>• Add when larger comes before smaller: VI = 6</p>
                    <p>• Subtract when smaller comes before larger: IV = 4</p>
                    <p>• Only I, X, C can be subtracted</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Common Examples:</h4>
                  <div className="text-sm text-purple-700 grid grid-cols-2 gap-2">
                    <p>• 1994 = MCMXCIV</p>
                    <p>• 2023 = MMXXIII</p>
                    <p>• 444 = CDXLIV</p>
                    <p>• 1776 = MDCCLXXVI</p>
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
                          <span className="text-2xl font-bold text-blue-600 font-mono">{results.result}</span>
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
                      <h4 className="font-semibold text-green-800 mb-2">Breakdown:</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        {results.breakdown.map((step, index) => (
                          <p key={index} className="font-mono">
                            • {step}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Historical Context:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Used by ancient Romans for trade and record-keeping</p>
                        <p>• Still used today for movie sequels, book chapters</p>
                        <p>• Common on clock faces and building cornerstones</p>
                        <p>• Super Bowl games use Roman numerals</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Modern Uses:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Copyright dates: © MMXXIII</p>
                        <p>• Formal documents and monuments</p>
                        <p>• Outline numbering systems</p>
                        <p>• Decorative and ceremonial purposes</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Type className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number or Roman numeral to convert</p>
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
