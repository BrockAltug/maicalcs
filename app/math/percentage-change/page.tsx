"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PercentageChangeCalculatorPage() {
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")
  const [results, setResults] = useState<{
    percentageChange: number
    absoluteChange: number
    changeType: string
    multiplier: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePercentageChange = () => {
    try {
      const oldVal = Number.parseFloat(oldValue)
      const newVal = Number.parseFloat(newValue)

      if (isNaN(oldVal) || isNaN(newVal)) {
        alert("Please enter valid numbers.")
        return
      }

      if (oldVal === 0) {
        alert("Old value cannot be zero for percentage change calculation.")
        return
      }

      const absoluteChange = newVal - oldVal
      const percentageChange = (absoluteChange / Math.abs(oldVal)) * 100
      const changeType = absoluteChange >= 0 ? "Increase" : "Decrease"
      const multiplier = newVal / oldVal

      setResults({
        percentageChange: Number.parseFloat(percentageChange.toFixed(4)),
        absoluteChange: Number.parseFloat(absoluteChange.toFixed(4)),
        changeType,
        multiplier: Number.parseFloat(multiplier.toFixed(6)),
        formula: `((${newVal} - ${oldVal}) / |${oldVal}|) × 100%`,
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
    setOldValue("")
    setNewValue("")
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
              <TrendingUp className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Percentage Change Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate percentage increase or decrease between two values with MaiCalcs. Perfect for analyzing growth,
              price changes, and statistical variations.
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
                  <span>Value Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="oldValue">Original Value (Old)</Label>
                  <Input
                    id="oldValue"
                    type="number"
                    placeholder="Enter original value"
                    value={oldValue}
                    onChange={(e) => setOldValue(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newValue">New Value</Label>
                  <Input
                    id="newValue"
                    type="number"
                    placeholder="Enter new value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Percentage Change Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• % Change = ((New - Old) / |Old|) × 100%</p>
                    <p>• Positive = Increase</p>
                    <p>• Negative = Decrease</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 100 → 120 = +20% increase</p>
                    <p>• 50 → 40 = -20% decrease</p>
                    <p>• 200 → 250 = +25% increase</p>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Common Uses:</h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <p>• Stock price changes</p>
                    <p>• Sales growth analysis</p>
                    <p>• Population changes</p>
                    <p>• Performance metrics</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePercentageChange} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Change Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className={`${results.percentageChange >= 0 ? "bg-green-50" : "bg-red-50"} rounded-lg p-4`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Percentage Change:</span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xl font-bold ${results.percentageChange >= 0 ? "text-green-600" : "text-red-600"} font-mono`}
                          >
                            {results.percentageChange >= 0 ? "+" : ""}
                            {results.percentageChange}%
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(`${results.percentageChange >= 0 ? "+" : ""}${results.percentageChange}%`)
                            }
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Change Type:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.changeType}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.changeType)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Absolute Change:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.absoluteChange >= 0 ? "+" : ""}
                            {results.absoluteChange}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(`${results.absoluteChange >= 0 ? "+" : ""}${results.absoluteChange}`)
                            }
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Multiplier:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">{results.multiplier}×</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.multiplier}×`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>
                          • = ({results.absoluteChange} / |{oldValue}|) × 100%
                        </p>
                        <p>• = {results.percentageChange}%</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Interpretation:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>
                          • The value {results.changeType.toLowerCase()}d by {Math.abs(results.percentageChange)}%
                        </p>
                        <p>• Absolute change: {results.absoluteChange} units</p>
                        <p>• New value is {results.multiplier}× the original</p>
                        {results.percentageChange > 0 && <p>• This represents growth or improvement</p>}
                        {results.percentageChange < 0 && <p>• This represents decline or reduction</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter old and new values to calculate percentage change</p>
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
