"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function CostEstimatorPage() {
  const [materialCost, setMaterialCost] = useState("")
  const [laborHours, setLaborHours] = useState("")
  const [laborRate, setLaborRate] = useState("")
  const [overhead, setOverhead] = useState("15")
  const [profit, setProfit] = useState("20")
  const [results, setResults] = useState<{
    materialCost: number
    laborCost: number
    subtotal: number
    overheadAmount: number
    profitAmount: number
    totalCost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateCost = () => {
    try {
      if (!materialCost || !laborHours || !laborRate) {
        alert("Please fill in all required fields.")
        return
      }

      const materials = Number.parseFloat(materialCost)
      const hours = Number.parseFloat(laborHours)
      const rate = Number.parseFloat(laborRate)
      const overheadPercent = Number.parseFloat(overhead)
      const profitPercent = Number.parseFloat(profit)

      if (materials < 0 || hours < 0 || rate < 0 || overheadPercent < 0 || profitPercent < 0) {
        alert("All values must be positive numbers.")
        return
      }

      const laborCost = hours * rate
      const subtotal = materials + laborCost
      const overheadAmount = subtotal * (overheadPercent / 100)
      const profitAmount = (subtotal + overheadAmount) * (profitPercent / 100)
      const totalCost = subtotal + overheadAmount + profitAmount

      setResults({
        materialCost: materials,
        laborCost,
        subtotal,
        overheadAmount,
        profitAmount,
        totalCost,
        formula: `Materials: $${materials.toFixed(2)} + Labor: $${laborCost.toFixed(2)} + Overhead: ${overheadPercent}% + Profit: ${profitPercent}%`,
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
    setMaterialCost("")
    setLaborHours("")
    setLaborRate("")
    setOverhead("15")
    setProfit("20")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <DollarSign className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cost Estimator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate project costs for construction and renovation work with MaiCalcs. Perfect for contractors and
              project planning.
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
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span>Cost Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="materialCost">Material Cost ($)</Label>
                  <Input
                    id="materialCost"
                    type="number"
                    value={materialCost}
                    onChange={(e) => setMaterialCost(e.target.value)}
                    placeholder="Enter material cost"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="laborHours">Labor Hours</Label>
                  <Input
                    id="laborHours"
                    type="number"
                    value={laborHours}
                    onChange={(e) => setLaborHours(e.target.value)}
                    placeholder="Enter labor hours"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="laborRate">Labor Rate ($/hour)</Label>
                  <Input
                    id="laborRate"
                    type="number"
                    value={laborRate}
                    onChange={(e) => setLaborRate(e.target.value)}
                    placeholder="Enter hourly rate"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="overhead">Overhead (%)</Label>
                  <Input
                    id="overhead"
                    type="number"
                    value={overhead}
                    onChange={(e) => setOverhead(e.target.value)}
                    placeholder="Enter overhead percentage"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profit">Profit Margin (%)</Label>
                  <Input
                    id="profit"
                    type="number"
                    value={profit}
                    onChange={(e) => setProfit(e.target.value)}
                    placeholder="Enter profit percentage"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Cost Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Material and labor costs</p>
                    <p>• Overhead percentage</p>
                    <p>• Profit margin calculation</p>
                    <p>• Total project estimate</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Materials: $5,000, Labor: 40hrs @ $50/hr</p>
                    <p>• Overhead: 15%, Profit: 20%</p>
                    <p>• Total estimate: $9,660</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateCost} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <ArrowRight className="h-5 w-5 text-red-600" />
                  <span>Cost Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Material Cost:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            ${results.materialCost.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`$${results.materialCost.toFixed(2)}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Labor Cost:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          ${results.laborCost.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Subtotal:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          ${results.subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Overhead:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          ${results.overheadAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Profit:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">
                          ${results.profitAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4 border-2 border-emerald-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Cost:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-emerald-600 font-mono">
                            ${results.totalCost.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`$${results.totalCost.toFixed(2)}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Cost Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Total project cost: ${results.totalCost.toFixed(2)}</p>
                        <p>• Profit margin: ${results.profitAmount.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Project bidding and quotes</p>
                        <p>• Budget planning and approval</p>
                        <p>• Cost comparison analysis</p>
                        <p>• Profit margin optimization</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter cost information to calculate project estimate</p>
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
