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

export default function CPVCalculatorPage() {
  const [budget, setBudget] = useState("")
  const [views, setViews] = useState("")
  const [calculationType, setCalculationType] = useState("budget-views")
  const [targetCPV, setTargetCPV] = useState("")
  const [results, setResults] = useState<{
    cpv: number
    totalViews: number
    totalBudget: number
    efficiency: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateCPV = () => {
    if (calculationType === "budget-views") {
      const budgetAmount = Number.parseFloat(budget)
      const viewCount = Number.parseFloat(views)

      if (isNaN(budgetAmount) || isNaN(viewCount) || budgetAmount <= 0 || viewCount <= 0) return

      const cpv = budgetAmount / viewCount
      let efficiency = "Average"
      if (cpv < 0.05) efficiency = "Excellent"
      else if (cpv < 0.1) efficiency = "Good"
      else if (cpv > 0.25) efficiency = "Poor"

      setResults({
        cpv: Math.round(cpv * 10000) / 10000,
        totalViews: viewCount,
        totalBudget: budgetAmount,
        efficiency,
      })
    } else if (calculationType === "budget-cpv") {
      const budgetAmount = Number.parseFloat(budget)
      const cpvAmount = Number.parseFloat(targetCPV)

      if (isNaN(budgetAmount) || isNaN(cpvAmount) || budgetAmount <= 0 || cpvAmount <= 0) return

      const totalViews = budgetAmount / cpvAmount
      let efficiency = "Average"
      if (cpvAmount < 0.05) efficiency = "Excellent"
      else if (cpvAmount < 0.1) efficiency = "Good"
      else if (cpvAmount > 0.25) efficiency = "Poor"

      setResults({
        cpv: cpvAmount,
        totalViews: Math.round(totalViews),
        totalBudget: budgetAmount,
        efficiency,
      })
    } else {
      const viewCount = Number.parseFloat(views)
      const cpvAmount = Number.parseFloat(targetCPV)

      if (isNaN(viewCount) || isNaN(cpvAmount) || viewCount <= 0 || cpvAmount <= 0) return

      const totalBudget = viewCount * cpvAmount
      let efficiency = "Average"
      if (cpvAmount < 0.05) efficiency = "Excellent"
      else if (cpvAmount < 0.1) efficiency = "Good"
      else if (cpvAmount > 0.25) efficiency = "Poor"

      setResults({
        cpv: cpvAmount,
        totalViews: viewCount,
        totalBudget: Math.round(totalBudget * 100) / 100,
        efficiency,
      })
    }
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setBudget("")
    setViews("")
    setTargetCPV("")
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
              CPV Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate Cost Per View (CPV) for your video advertising campaigns with MaiCalcs. Optimize your video ad
              spend and maximize campaign effectiveness.
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
                  <span>CPV Calculation</span>
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
                      <SelectItem value="budget-views">CPV (from Budget & Views)</SelectItem>
                      <SelectItem value="budget-cpv">Views (from Budget & CPV)</SelectItem>
                      <SelectItem value="views-cpv">Budget (from Views & CPV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(calculationType === "budget-views" || calculationType === "budget-cpv") && (
                  <div className="space-y-2">
                    <Label htmlFor="budget">Campaign Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Enter campaign budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                {(calculationType === "budget-views" || calculationType === "views-cpv") && (
                  <div className="space-y-2">
                    <Label htmlFor="views">Number of Views</Label>
                    <Input
                      id="views"
                      type="number"
                      placeholder="Enter number of views"
                      value={views}
                      onChange={(e) => setViews(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                {(calculationType === "budget-cpv" || calculationType === "views-cpv") && (
                  <div className="space-y-2">
                    <Label htmlFor="target-cpv">Target CPV ($)</Label>
                    <Input
                      id="target-cpv"
                      type="number"
                      step="0.01"
                      placeholder="Enter target cost per view"
                      value={targetCPV}
                      onChange={(e) => setTargetCPV(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                )}

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">CPV Benchmarks:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Excellent: $0.00 - $0.05 per view</p>
                    <p>• Good: $0.05 - $0.10 per view</p>
                    <p>• Average: $0.10 - $0.25 per view</p>
                    <p>• Poor: Above $0.25 per view</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Core Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• CPV = Total Budget / Number of Views</p>
                    <p>• Views = Total Budget / CPV</p>
                    <p>• Budget = Number of Views × CPV</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateCPV} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate CPV
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
                        <span className="font-medium text-gray-700">Cost Per View (CPV):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.cpv.toFixed(4)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.cpv)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Views:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            {results.totalViews.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalViews)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Budget:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">${results.totalBudget.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalBudget)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`rounded-lg p-4 ${
                        results.efficiency === "Excellent"
                          ? "bg-green-100"
                          : results.efficiency === "Good"
                            ? "bg-blue-100"
                            : results.efficiency === "Poor"
                              ? "bg-red-100"
                              : "bg-yellow-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Campaign Efficiency:</span>
                        <span
                          className={`text-2xl font-bold ${
                            results.efficiency === "Excellent"
                              ? "text-green-600"
                              : results.efficiency === "Good"
                                ? "text-blue-600"
                                : results.efficiency === "Poor"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                          }`}
                        >
                          {results.efficiency}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">CPV Benchmarks:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Excellent: $0.00 - $0.05 per view</p>
                        <p>• Good: $0.05 - $0.10 per view</p>
                        <p>• Average: $0.10 - $0.25 per view</p>
                        <p>• Poor: Above $0.25 per view</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter campaign details to calculate CPV</p>
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
