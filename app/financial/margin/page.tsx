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

export default function MarginCalculatorPage() {
  const [calculationType, setCalculationType] = useState("profit-margin")
  const [cost, setCost] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [revenue, setRevenue] = useState("")
  const [results, setResults] = useState<{
    profitMargin: number
    grossMargin: number
    markup: number
    profit: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateMargin = () => {
    const costValue = Number.parseFloat(cost)
    const sellingValue = Number.parseFloat(sellingPrice)
    const revenueValue = Number.parseFloat(revenue)

    if (calculationType === "profit-margin") {
      if (isNaN(costValue) || isNaN(sellingValue) || costValue <= 0 || sellingValue <= 0) return

      const profit = sellingValue - costValue
      const profitMargin = (profit / sellingValue) * 100
      const grossMargin = (profit / sellingValue) * 100
      const markup = (profit / costValue) * 100

      setResults({
        profitMargin: Math.round(profitMargin * 100) / 100,
        grossMargin: Math.round(grossMargin * 100) / 100,
        markup: Math.round(markup * 100) / 100,
        profit: Math.round(profit * 100) / 100,
      })
    } else {
      // Gross margin calculation
      if (isNaN(costValue) || isNaN(revenueValue) || costValue <= 0 || revenueValue <= 0) return

      const profit = revenueValue - costValue
      const grossMargin = (profit / revenueValue) * 100
      const profitMargin = grossMargin // Same for this context
      const markup = (profit / costValue) * 100

      setResults({
        profitMargin: Math.round(profitMargin * 100) / 100,
        grossMargin: Math.round(grossMargin * 100) / 100,
        markup: Math.round(markup * 100) / 100,
        profit: Math.round(profit * 100) / 100,
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
    setSellingPrice("")
    setRevenue("")
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
              Margin Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate profit margins, gross margins, and markup percentages with MaiCalcs. Essential tool for
              businesses to analyze profitability and pricing strategies.
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
                  <span>Margin Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculation-type">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profit-margin">Profit Margin</SelectItem>
                      <SelectItem value="gross-margin">Gross Margin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="Enter cost price"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {calculationType === "profit-margin" ? (
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
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="revenue">Revenue ($)</Label>
                    <Input
                      id="revenue"
                      type="number"
                      placeholder="Enter total revenue"
                      value={revenue}
                      onChange={(e) => setRevenue(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Understanding Margins:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Profit Margin: Shows what percentage of sales revenue is profit</p>
                    <p>• Gross Margin: Indicates the percentage of revenue that exceeds COGS</p>
                    <p>• Markup: Shows how much you're adding to the cost price</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Profit = Revenue - Cost</p>
                    <p>• Margin % = (Profit / Revenue) × 100</p>
                    <p>• Markup % = (Profit / Cost) × 100</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateMargin} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Margin
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
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Profit Margin:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.profitMargin.toFixed(2)}%</span>
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

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Gross Margin:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">{results.grossMargin.toFixed(2)}%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.grossMargin)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Markup:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">{results.markup.toFixed(2)}%</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.markup)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Profit Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">${results.profit.toFixed(2)}</span>
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

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Formulas:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Profit = Selling Price - Cost</p>
                        <p>• Profit Margin = (Profit ÷ Selling Price) × 100</p>
                        <p>• Gross Margin = (Profit ÷ Revenue) × 100</p>
                        <p>• Markup = (Profit ÷ Cost) × 100</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter cost and selling price to calculate margins</p>
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
