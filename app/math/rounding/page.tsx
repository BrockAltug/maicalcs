"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function RoundingCalculatorPage() {
  const [number, setNumber] = useState("")
  const [roundingType, setRoundingType] = useState("decimal")
  const [places, setPlaces] = useState("2")
  const [results, setResults] = useState<{
    rounded: number
    original: number
    difference: number
    explanation: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const roundToDecimalPlaces = (num: number, places: number) => {
    return Math.round(num * Math.pow(10, places)) / Math.pow(10, places)
  }

  const roundToSignificantFigures = (num: number, sig: number) => {
    if (num === 0) return 0
    const magnitude = Math.floor(Math.log10(Math.abs(num)))
    const factor = Math.pow(10, sig - magnitude - 1)
    return Math.round(num * factor) / factor
  }

  const roundToNearestInteger = (num: number) => {
    return Math.round(num)
  }

  const roundToNearest = (num: number, nearest: number) => {
    return Math.round(num / nearest) * nearest
  }

  const calculateRounding = () => {
    const num = Number.parseFloat(number)
    if (isNaN(num)) return

    let rounded: number
    let explanation: string

    const placesNum = Number.parseInt(places)

    switch (roundingType) {
      case "decimal":
        rounded = roundToDecimalPlaces(num, placesNum)
        explanation = `Rounded to ${placesNum} decimal place${placesNum !== 1 ? "s" : ""}`
        break
      case "significant":
        rounded = roundToSignificantFigures(num, placesNum)
        explanation = `Rounded to ${placesNum} significant figure${placesNum !== 1 ? "s" : ""}`
        break
      case "integer":
        rounded = roundToNearestInteger(num)
        explanation = "Rounded to nearest integer"
        break
      case "ten":
        rounded = roundToNearest(num, 10)
        explanation = "Rounded to nearest 10"
        break
      case "hundred":
        rounded = roundToNearest(num, 100)
        explanation = "Rounded to nearest 100"
        break
      case "thousand":
        rounded = roundToNearest(num, 1000)
        explanation = "Rounded to nearest 1000"
        break
      default:
        rounded = num
        explanation = "No rounding applied"
    }

    const difference = Math.abs(num - rounded)

    setResults({
      rounded,
      original: num,
      difference: Math.round(difference * 1000000) / 1000000,
      explanation,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setNumber("")
    setPlaces("2")
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
              <RotateCcw className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rounding Numbers Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Round numbers to decimal places, significant figures, or nearest values with MaiCalcs. Perfect for
              mathematical calculations and data presentation.
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
                  <span>Rounding Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="number">Number to Round</Label>
                  <Input
                    id="number"
                    type="number"
                    step="any"
                    placeholder="Enter any number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rounding-type">Rounding Type</Label>
                  <Select value={roundingType} onValueChange={setRoundingType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decimal">Decimal Places</SelectItem>
                      <SelectItem value="significant">Significant Figures</SelectItem>
                      <SelectItem value="integer">Nearest Integer</SelectItem>
                      <SelectItem value="ten">Nearest 10</SelectItem>
                      <SelectItem value="hundred">Nearest 100</SelectItem>
                      <SelectItem value="thousand">Nearest 1000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(roundingType === "decimal" || roundingType === "significant") && (
                  <div className="space-y-2">
                    <Label htmlFor="places">
                      {roundingType === "decimal" ? "Decimal Places" : "Significant Figures"}
                    </Label>
                    <Select value={places} onValueChange={setPlaces}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Rounding Rules:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• 0.5 and above rounds up</p>
                    <p>• Below 0.5 rounds down</p>
                    <p>• Significant figures count from first non-zero digit</p>
                    <p>• Decimal places count from decimal point</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateRounding} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Round Number
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
                  <span>Rounded Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700 block mb-2">Original Number:</span>
                        <span className="text-xl font-bold text-blue-600">{results.original}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700 block mb-2">Rounded Number:</span>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">{results.rounded}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.rounded)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700 block mb-2">Explanation:</span>
                        <span className="text-lg font-semibold text-purple-600">{results.explanation}</span>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Difference:</span>
                        <span className="text-xl font-bold text-orange-600">{results.difference}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Rounding Analysis:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Original: {results.original}</p>
                        <p>• Rounded: {results.rounded}</p>
                        <p>
                          • Change:{" "}
                          {results.rounded > results.original
                            ? "Rounded up"
                            : results.rounded < results.original
                              ? "Rounded down"
                              : "No change"}
                        </p>
                        <p>• Absolute difference: {results.difference}</p>
                        <p>
                          • Relative error:{" "}
                          {results.original !== 0
                            ? ((results.difference / Math.abs(results.original)) * 100).toFixed(4) + "%"
                            : "0%"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Other Rounding Options:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• To 1 decimal: {roundToDecimalPlaces(results.original, 1)}</p>
                        <p>• To 3 decimals: {roundToDecimalPlaces(results.original, 3)}</p>
                        <p>• To nearest integer: {Math.round(results.original)}</p>
                        <p>• To nearest 10: {Math.round(results.original / 10) * 10}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <RotateCcw className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a number to round</p>
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
