"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function MarkupCalculatorPage() {
  const [calculationType, setCalculationType] = useState("cost-markup")
  const [cost, setCost] = useState("")
  const [markup, setMarkup] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [results, setResults] = useState<{
    markupPercentage: number
    sellingPrice: number
    profit: number
    profitMargin: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateMarkup = () => {
    if (calculationType === "cost-markup") {
      const costValue = Number.parseFloat(cost)
      const markupValue = Number.parseFloat(markup)

      if (isNaN(costValue) || isNaN(markupValue) || costValue <= 0 || markupValue < 0) return

      const profit = (costValue * markupValue) / 100
      const sellingPrice = costValue + profit
      const profitMargin = (profit / sellingPrice) * 100

      setResults({
        markupPercentage: markupValue,
        sellingPrice: Math.round(sellingPrice * 100) / 100,
        profit: Math.round(profit * 100) / 100,
        profitMargin: Math.round(profitMargin * 100) / 100,
      })
    } else if (calculationType === "cost-selling") {
      const costValue = Number.parseFloat(cost)
      const sellingValue = Number.parseFloat(sellingPrice)

      if (isNaN(costValue) || isNaN(sellingValue) || costValue <= 0 || sellingValue <= costValue) return

      const profit = sellingValue - costValue
      const markupPercentage = (profit / costValue) * 100
      const profitMargin = (profit / sellingValue) * 100

      setResults({
        markupPercentage: Math.round(markupPercentage * 100) / 100,
        sellingPrice: sellingValue,
        profit: Math.round(profit * 100) / 100,
        profitMargin: Math.round(profitMargin * 100) / 100,
      })
    } else {
      const markupValue = Number.parseFloat(markup)
      const sellingValue = Number.parseFloat(sellingPrice)

      if (isNaN(markupValue) || isNaN(sellingValue) || markupValue <= 0 || sellingValue <= 0) return

      const cost = sellingValue / (1 + markupValue / 100)
      const profit = sellingValue - cost
      const profitMargin = (profit / sellingValue) * 100

      setResults({
        markupPercentage: markupValue,
        sellingPrice: sellingValue,
        profit: Math.round(profit * 100) / 100,
        profitMargin: Math.round(profitMargin * 100) / 100,
      })
    }
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setCost("")
    setMarkup("")
    setSellingPrice("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Markup Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate markup percentages and selling prices with MaiCalcs. Essential tool for retailers and businesses
              to determine optimal pricing strategies.
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
                  <Calculator className="h-5 w-5 text-green-600" />
                  <span>Markup Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculation-type">What do you want to calculate?</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cost-markup">Selling Price (from Cost & Markup)</SelectItem>
                      <SelectItem value="cost-selling">Markup % (from Cost & Selling Price)</SelectItem>
                      <SelectItem value="markup-selling">Cost (from Markup & Selling Price)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(calculationType === "cost-markup" || calculationType === "cost-selling") && (
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost Price ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      placeholder="Enter cost price"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                {(calculationType === "cost-markup" || calculationType === "markup-selling") && (
                  <div className="space-y-2">
                    <Label htmlFor="markup">Markup Percentage (%)</Label>
                    <Input
                      id="markup"
                      type="number"
                      placeholder="Enter markup percentage"
                      value={markup}
                      onChange={(e) => setMarkup(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                {(calculationType === "cost-selling" || calculationType === "markup-selling") && (
                  <div className="space-y-2">
                    <Label htmlFor="selling-price">Selling Price ($)</Label>
                    <Input
                      id="selling-price"
                      type="number"
                      placeholder="Enter selling price"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Markup vs Margin:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Markup: Percentage added to cost price</p>
                    <p>• Margin: Percentage of selling price that is profit</p>
                    <p>• Formula: Selling Price = Cost + (Cost × Markup%)</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Calculation Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Selling Price = Cost × (1 + Markup %)</p>
                    <p>• Markup % = ((Selling Price - Cost) / Cost) × 100</p>
                    <p>• Cost = Selling Price / (1 + Markup %)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateMarkup} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Markup
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
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                  <span>Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Markup Percentage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            {results.markupPercentage.toFixed(2)}%
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.markupPercentage)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Selling Price:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">${results.sellingPrice.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.sellingPrice)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Profit Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">${results.profit.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.profit)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Profit Margin:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">{results.profitMargin.toFixed(2)}%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.profitMargin)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Markup: {results.markupPercentage.toFixed(2)}%</p>
                        <p>• Selling Price: ${results.sellingPrice.toFixed(2)}</p>
                        <p>• Profit: ${results.profit.toFixed(2)}</p>
                        <p>• Profit Margin: {results.profitMargin.toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter values to calculate markup</p>
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
