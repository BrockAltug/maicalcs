"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function AdSenseCalculatorPage() {
  const [pageViews, setPageViews] = useState("")
  const [ctr, setCtr] = useState("")
  const [cpc, setCpc] = useState("")
  const [timeframe, setTimeframe] = useState("monthly")
  const [results, setResults] = useState<{
    clicks: number
    earnings: number
    dailyEarnings: number
    yearlyEarnings: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateAdSense = () => {
    const views = Number.parseFloat(pageViews)
    const clickRate = Number.parseFloat(ctr) / 100
    const costPerClick = Number.parseFloat(cpc)

    if (isNaN(views) || isNaN(clickRate) || isNaN(costPerClick) || views <= 0 || clickRate < 0 || costPerClick <= 0)
      return

    const clicks = views * clickRate
    const earnings = clicks * costPerClick

    // Adjust for timeframe
    let dailyEarnings: number
    let yearlyEarnings: number

    switch (timeframe) {
      case "daily":
        dailyEarnings = earnings
        yearlyEarnings = earnings * 365
        break
      case "weekly":
        dailyEarnings = earnings / 7
        yearlyEarnings = earnings * 52
        break
      case "monthly":
        dailyEarnings = earnings / 30
        yearlyEarnings = earnings * 12
        break
      case "yearly":
        dailyEarnings = earnings / 365
        yearlyEarnings = earnings
        break
      default:
        dailyEarnings = earnings / 30
        yearlyEarnings = earnings * 12
    }

    setResults({
      clicks: Math.round(clicks * 100) / 100,
      earnings: Math.round(earnings * 100) / 100,
      dailyEarnings: Math.round(dailyEarnings * 100) / 100,
      yearlyEarnings: Math.round(yearlyEarnings * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setPageViews("")
    setCtr("")
    setCpc("")
    setTimeframe("monthly")
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
              <Monitor className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AdSense Revenue Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your Google AdSense earnings potential with MaiCalcs. Estimate revenue based on page views, CTR,
              and CPC rates.
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
                  <span>AdSense Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Time Period</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageViews">Page Views</Label>
                  <Input
                    id="pageViews"
                    type="number"
                    placeholder="Enter page views"
                    value={pageViews}
                    onChange={(e) => setPageViews(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ctr">Click-Through Rate (CTR) %</Label>
                  <Input
                    id="ctr"
                    type="number"
                    step="0.01"
                    placeholder="Enter CTR percentage"
                    value={ctr}
                    onChange={(e) => setCtr(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpc">Cost Per Click (CPC) $</Label>
                  <Input
                    id="cpc"
                    type="number"
                    step="0.01"
                    placeholder="Enter CPC amount"
                    value={cpc}
                    onChange={(e) => setCpc(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Typical AdSense Rates:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• CTR: 1-3% (average 2%)</p>
                    <p>• CPC: $0.20-$2.00 (varies by niche)</p>
                    <p>• Finance/Insurance: Higher CPC</p>
                    <p>• Entertainment: Lower CPC</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Revenue Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Clicks = Page Views × (CTR / 100)</p>
                    <p>• Earnings = Clicks × CPC</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateAdSense} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Revenue
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
                  <span>Revenue Projection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Expected Clicks:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.clicks.toFixed(0)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.clicks)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">
                          {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Earnings:
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.earnings.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.earnings)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Daily Earnings:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">
                            ${results.dailyEarnings.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.dailyEarnings)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Yearly Projection:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">
                            ${results.yearlyEarnings.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.yearlyEarnings)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Breakdown:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          • Page Views: {pageViews} ({timeframe})
                        </p>
                        <p>• CTR: {ctr}%</p>
                        <p>• CPC: ${cpc}</p>
                        <p>
                          • Clicks: {pageViews} × {ctr}% = {results.clicks.toFixed(0)}
                        </p>
                        <p>
                          • Revenue: {results.clicks.toFixed(0)} × ${cpc} = ${results.earnings.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Monitor className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your AdSense metrics to calculate revenue</p>
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
