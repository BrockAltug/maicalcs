"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ScaleCalculatorPage() {
  const [actualSize, setActualSize] = useState("")
  const [scaleSize, setScaleSize] = useState("")
  const [scaleRatio, setScaleRatio] = useState("")
  const [calculateType, setCalculateType] = useState("scale-size")
  const [results, setResults] = useState<{
    value: number
    ratio: string
    scaleFactor: number
    formula: string
    scaleInfo: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculate = () => {
    try {
      const actual = Number.parseFloat(actualSize)
      const scale = Number.parseFloat(scaleSize)
      const ratio = Number.parseFloat(scaleRatio)

      if (calculateType === "scale-size" && !isNaN(actual) && !isNaN(ratio) && actual > 0 && ratio > 0) {
        const scaleValue = actual * ratio

        setResults({
          value: Number.parseFloat(scaleValue.toFixed(4)),
          ratio: `${ratio}:1`,
          scaleFactor: ratio,
          formula: `Scale size = Actual size × Scale ratio = ${actual} × ${ratio}`,
          scaleInfo:
            ratio > 1
              ? `${ratio}x larger than actual`
              : ratio < 1
                ? `${(1 / ratio).toFixed(2)}x smaller than actual`
                : "Same size as actual",
        })
      } else if (calculateType === "actual-size" && !isNaN(scale) && !isNaN(ratio) && scale > 0 && ratio > 0) {
        const actualValue = scale / ratio

        setResults({
          value: Number.parseFloat(actualValue.toFixed(4)),
          ratio: `${ratio}:1`,
          scaleFactor: ratio,
          formula: `Actual size = Scale size ÷ Scale ratio = ${scale} ÷ ${ratio}`,
          scaleInfo:
            ratio > 1
              ? `${ratio}x larger than actual`
              : ratio < 1
                ? `${(1 / ratio).toFixed(2)}x smaller than actual`
                : "Same size as actual",
        })
      } else if (calculateType === "scale-ratio" && !isNaN(actual) && !isNaN(scale) && actual > 0 && scale > 0) {
        const ratioValue = scale / actual

        setResults({
          value: Number.parseFloat(ratioValue.toFixed(4)),
          ratio: `${ratioValue.toFixed(4)}:1`,
          scaleFactor: ratioValue,
          formula: `Scale ratio = Scale size ÷ Actual size = ${scale} ÷ ${actual}`,
          scaleInfo:
            ratioValue > 1
              ? `${ratioValue.toFixed(2)}x larger than actual`
              : ratioValue < 1
                ? `${(1 / ratioValue).toFixed(2)}x smaller than actual`
                : "Same size as actual",
        })
      } else {
        alert("Please enter valid positive numbers for the required fields.")
        return
      }
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
    setActualSize("")
    setScaleSize("")
    setScaleRatio("")
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
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-white font-bold text-lg">⚖️</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scale Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate scale ratios, scaled dimensions, and actual sizes for maps, models, drawings, and blueprints
              with MaiCalcs. Perfect for architects, engineers, and hobbyists working with scaled representations.
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
                  <span>Scale Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Calculate</Label>
                  <Select value={calculateType} onValueChange={setCalculateType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scale-size">Scale Size (from actual size and ratio)</SelectItem>
                      <SelectItem value="actual-size">Actual Size (from scale size and ratio)</SelectItem>
                      <SelectItem value="scale-ratio">Scale Ratio (from actual and scale sizes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculateType !== "scale-size" && (
                  <div className="space-y-2">
                    <Label htmlFor="scaleSize">Scale Size</Label>
                    <Input
                      id="scaleSize"
                      type="number"
                      placeholder="Enter scale size"
                      value={scaleSize}
                      onChange={(e) => setScaleSize(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                    />
                  </div>
                )}

                {calculateType !== "actual-size" && (
                  <div className="space-y-2">
                    <Label htmlFor="actualSize">Actual Size</Label>
                    <Input
                      id="actualSize"
                      type="number"
                      placeholder="Enter actual size"
                      value={actualSize}
                      onChange={(e) => setActualSize(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                    />
                  </div>
                )}

                {calculateType !== "scale-ratio" && (
                  <div className="space-y-2">
                    <Label htmlFor="scaleRatio">Scale Ratio (e.g., 0.5 for 1:2 scale)</Label>
                    <Input
                      id="scaleRatio"
                      type="number"
                      placeholder="Enter scale ratio"
                      value={scaleRatio}
                      onChange={(e) => setScaleRatio(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                    />
                  </div>
                )}

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Scale Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Scale Size = Actual Size × Scale Ratio</p>
                    <p>• Actual Size = Scale Size ÷ Scale Ratio</p>
                    <p>• Scale Ratio = Scale Size ÷ Actual Size</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Scale Ratios:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 1:1 = 1.0 (Full size), 1:2 = 0.5 (Half size)</p>
                    <p>• 1:10 = 0.1 (1/10 size), 1:100 = 0.01 (1/100 size)</p>
                    <p>• Example: Building 100m tall, scale 1:500 → 20cm</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Scale Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.value}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.value.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Scale Ratio:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-600 font-mono">{results.ratio}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.ratio)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Scale Information:</h4>
                      <div className="space-y-1 text-sm text-purple-700">
                        <div>Scale Factor: {results.scaleFactor}</div>
                        <div>
                          {results.scaleFactor > 1 ? "Enlarged" : results.scaleFactor < 1 ? "Reduced" : "Same"} scale
                        </div>
                        <div>{results.scaleInfo}</div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700">
                        <p>• {results.formula}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Architectural blueprints and drawings</p>
                        <p>• Map reading and cartography</p>
                        <p>• Model making and miniatures</p>
                        <p>• Engineering design and CAD</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div className="text-white font-bold text-lg">⚖️</div>
                    </div>
                    <p className="text-gray-500">Enter values to calculate scale measurements</p>
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
