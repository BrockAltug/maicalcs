"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ExponentialNotationCalculatorPage() {
  const [inputValue, setInputValue] = useState("")
  const [conversionType, setConversionType] = useState("to-scientific")
  const [results, setResults] = useState<{
    scientific: string
    standard: string
    engineering: string
    parts: { coefficient: number; exponent: number }
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const convertToScientific = (num: number): { coefficient: number; exponent: number; notation: string } => {
    if (num === 0) return { coefficient: 0, exponent: 0, notation: "0" }

    const exponent = Math.floor(Math.log10(Math.abs(num)))
    const coefficient = num / Math.pow(10, exponent)
    const notation = `${coefficient.toFixed(2)} × 10^${exponent}`

    return { coefficient, exponent, notation }
  }

  const convertToEngineering = (num: number): string => {
    if (num === 0) return "0"

    const exponent = Math.floor(Math.log10(Math.abs(num)) / 3) * 3
    const coefficient = num / Math.pow(10, exponent)

    return `${coefficient.toFixed(3)} × 10^${exponent}`
  }

  const convertNumber = () => {
    try {
      let number: number

      if (conversionType === "to-scientific") {
        number = Number.parseFloat(inputValue)
        if (isNaN(number)) {
          alert("Please enter a valid number.")
          return
        }
      } else {
        // From scientific notation
        const scientificRegex = /^(-?\d*\.?\d+)\s*[×x*]\s*10\s*\^\s*(-?\d+)$/i
        const match = inputValue.match(scientificRegex)

        if (!match) {
          alert("Please enter valid scientific notation (e.g., 1.23 × 10^4)")
          return
        }

        const coefficient = Number.parseFloat(match[1])
        const exponent = Number.parseInt(match[2])
        number = coefficient * Math.pow(10, exponent)
      }

      const scientific = convertToScientific(number)
      const engineering = convertToEngineering(number)

      setResults({
        scientific: scientific.notation,
        standard: number.toString(),
        engineering: engineering,
        parts: { coefficient: scientific.coefficient, exponent: scientific.exponent },
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
    setConversionType("to-scientific")
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
              <Zap className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Exponential Notation Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert between standard form, scientific notation, and engineering notation with MaiCalcs. Perfect for
              handling very large or very small numbers.
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
                  <Label htmlFor="conversion-type">Conversion Type</Label>
                  <Select value={conversionType} onValueChange={setConversionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-scientific">Standard to Scientific</SelectItem>
                      <SelectItem value="from-scientific">Scientific to Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input-value">
                    {conversionType === "to-scientific" ? "Standard Number" : "Scientific Notation"}
                  </Label>
                  <Input
                    id="input-value"
                    type="text"
                    placeholder={conversionType === "to-scientific" ? "e.g., 123000 or 0.00456" : "e.g., 1.23 × 10^5"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Notation Types:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Standard: Regular decimal notation (123000)</p>
                    <p>• Scientific: a × 10^n where 1 ≤ |a| {"<"} 10</p>
                    <p>• Engineering: a × 10^n where n is multiple of 3</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 123000 = 1.23 × 10^5</p>
                    <p>• 0.00456 = 4.56 × 10^-3</p>
                    <p>• 6.02 × 10^23 = 602000000000000000000000</p>
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
                        <span className="font-medium text-gray-700">Standard Form:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.standard}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.standard)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Scientific Notation:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.scientific}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.scientific)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Engineering Notation:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.engineering}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.engineering)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Scientific Notation Parts:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Coefficient: {results.parts.coefficient.toFixed(2)}</p>
                        <p>• Exponent: {results.parts.exponent}</p>
                        <p>• Base: 10</p>
                        <p>
                          • Formula: {results.parts.coefficient.toFixed(2)} × 10^{results.parts.exponent}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Usage Guidelines:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Scientific: Used in science and mathematics</p>
                        <p>• Engineering: Used in engineering (exponents are multiples of 3)</p>
                        <p>• Positive exponent: Number {">"} 1</p>
                        <p>• Negative exponent: Number {"<"} 1</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to convert between notations</p>
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
