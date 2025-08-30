"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Scale, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function WeightedAverageCalculatorPage() {
  const [items, setItems] = useState<{ value: string; weight: string }[]>([
    { value: "", weight: "" },
    { value: "", weight: "" },
    { value: "", weight: "" },
  ])
  const [results, setResults] = useState<{
    weightedAverage: number
    totalValue: number
    totalWeight: number
    breakdown: { value: number; weight: number; contribution: number }[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const addItem = () => {
    setItems([...items, { value: "", weight: "" }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: "value" | "weight", value: string) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const calculateWeightedAverage = () => {
    const validItems = items
      .map((item) => ({
        value: Number.parseFloat(item.value),
        weight: Number.parseFloat(item.weight),
      }))
      .filter((item) => !isNaN(item.value) && !isNaN(item.weight) && item.weight > 0)

    if (validItems.length === 0) return

    const totalWeightedValue = validItems.reduce((sum, item) => sum + item.value * item.weight, 0)
    const totalWeight = validItems.reduce((sum, item) => sum + item.weight, 0)
    const weightedAverage = totalWeightedValue / totalWeight

    const breakdown = validItems.map((item) => ({
      value: item.value,
      weight: item.weight,
      contribution: ((item.value * item.weight) / totalWeightedValue) * 100,
    }))

    setResults({
      weightedAverage: Math.round(weightedAverage * 10000) / 10000,
      totalValue: Math.round(totalWeightedValue * 10000) / 10000,
      totalWeight: Math.round(totalWeight * 10000) / 10000,
      breakdown,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setItems([
      { value: "", weight: "" },
      { value: "", weight: "" },
      { value: "", weight: "" },
    ])
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
              <Scale className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weighted Average Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate weighted averages with different weights for each value using MaiCalcs. Perfect for grades,
              portfolios, and data analysis.
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
                  <span>Values and Weights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Enter values and their corresponding weights</Label>
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Value"
                        value={item.value}
                        onChange={(e) => updateItem(index, "value", e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-gray-400">×</span>
                      <Input
                        type="number"
                        placeholder="Weight"
                        value={item.weight}
                        onChange={(e) => updateItem(index, "weight", e.target.value)}
                        className="flex-1"
                      />
                      {items.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeItem(index)} className="h-10 w-10 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addItem}
                    className="w-full bg-transparent"
                    disabled={items.length >= 15}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Common Uses:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Grade calculations with different test weights</p>
                    <p>• Portfolio returns with asset allocations</p>
                    <p>• Survey data with response importance</p>
                    <p>• Quality scores with criteria weights</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Formula:</h4>
                  <p className="text-sm text-green-700 font-mono">Weighted Average = Σ(Value × Weight) ÷ Σ(Weight)</p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateWeightedAverage} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Weighted Average Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weighted Average:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.weightedAverage}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.weightedAverage)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Weighted Value:</span>
                        <span className="text-xl font-bold text-purple-600">{results.totalValue}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Weight:</span>
                        <span className="text-xl font-bold text-green-600">{results.totalWeight}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-3">Breakdown by Item:</h4>
                      <div className="space-y-2">
                        {results.breakdown.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-yellow-700">
                              {item.value} × {item.weight}:
                            </span>
                            <span className="font-medium text-yellow-800">
                              {(item.value * item.weight).toFixed(2)} ({item.contribution.toFixed(1)}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Calculation Steps:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>1. Multiply each value by its weight</p>
                        <p>2. Sum all weighted values: {results.totalValue}</p>
                        <p>3. Sum all weights: {results.totalWeight}</p>
                        <p>
                          4. Divide: {results.totalValue} ÷ {results.totalWeight} = {results.weightedAverage}
                        </p>
                      </div>
                    </div>

                    {/* Visual representation */}
                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-3">Weight Distribution:</h4>
                      <div className="space-y-2">
                        {results.breakdown.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="text-sm text-indigo-700 w-20">Item {index + 1}:</span>
                            <div className="flex-1 bg-indigo-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full"
                                style={{ width: `${(item.weight / results.totalWeight) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-indigo-700 w-12">
                              {((item.weight / results.totalWeight) * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter values and weights to calculate weighted average</p>
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
