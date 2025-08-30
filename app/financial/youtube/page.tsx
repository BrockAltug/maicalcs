"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function YouTubeCalculatorPage() {
  const [views, setViews] = useState("")
  const [cpm, setCpm] = useState("2")
  const [ctr, setCtr] = useState("2")
  const [timeframe, setTimeframe] = useState("monthly")
  const [results, setResults] = useState<{
    clicks: number
    earnings: number
    dailyEarnings: number
    yearlyEarnings: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateYouTubeEarnings = () => {
    const viewCount = Number.parseFloat(views)
    const cpmValue = Number.parseFloat(cpm)
    const ctrValue = Number.parseFloat(ctr) / 100

    if (isNaN(viewCount) || isNaN(cpmValue) || isNaN(ctrValue) || viewCount <= 0) return

    // Calculate based on timeframe
    let dailyViews = viewCount
    if (timeframe === "monthly") {
      dailyViews = viewCount / 30
    } else if (timeframe === "yearly") {
      dailyViews = viewCount / 365
    }

    // YouTube typically shows ads on 40-60% of views
    const adImpressions = dailyViews * 0.5
    const adClicks = adImpressions * ctrValue

    // Revenue calculation (CPM is per 1000 impressions)
    const dailyEarnings = (adImpressions / 1000) * cpmValue
    const monthlyEarnings = dailyEarnings * 30
    const yearlyEarnings = dailyEarnings * 365

    // RPM (Revenue per 1000 views)
    const rpm = (dailyEarnings / dailyViews) * 1000

    setResults({
      clicks: Math.round(adClicks),
      earnings:
        Math.round(
          timeframe === "daily"
            ? dailyEarnings * 100
            : timeframe === "monthly"
              ? monthlyEarnings * 100
              : timeframe === "yearly"
                ? yearlyEarnings * 100
                : monthlyEarnings * 100,
        ) / 100,
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
    setViews("")
    setCpm("2")
    setCtr("2")
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
              <Play className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              YouTube Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate your YouTube ad revenue and earnings potential with MaiCalcs. Calculate earnings based on views,
              CPM, and engagement metrics.
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
                  <span>Channel Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="views">Video Views</Label>
                  <Input
                    id="views"
                    type="number"
                    placeholder="Enter number of views"
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeframe">Timeframe</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpm">CPM (Cost Per 1000 Impressions) ($)</Label>
                  <Select value={cpm} onValueChange={setCpm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">$0.50 (Low)</SelectItem>
                      <SelectItem value="1">$1.00 (Below Average)</SelectItem>
                      <SelectItem value="2">$2.00 (Average)</SelectItem>
                      <SelectItem value="3">$3.00 (Good)</SelectItem>
                      <SelectItem value="5">$5.00 (High)</SelectItem>
                      <SelectItem value="10">$10.00 (Premium)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ctr">Click-Through Rate (%)</Label>
                  <Select value={ctr} onValueChange={setCtr}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1% (Low)</SelectItem>
                      <SelectItem value="2">2% (Average)</SelectItem>
                      <SelectItem value="3">3% (Good)</SelectItem>
                      <SelectItem value="4">4% (High)</SelectItem>
                      <SelectItem value="5">5% (Excellent)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">YouTube Monetization Tips:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Need 1,000+ subscribers and 4,000 watch hours</p>
                    <p>• CPM varies by niche and audience location</p>
                    <p>• Gaming: $1-3, Finance: $5-12, Tech: $2-5</p>
                    <p>• Revenue = (Views × Ad Rate × CTR)</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Revenue Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Ad Impressions ≈ Views × 50%</p>
                    <p>• Earnings = (Ad Impressions / 1000) × CPM</p>
                    <p>• RPM = (Earnings / Views) × 1000</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateYouTubeEarnings} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Earnings
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
                  <span>Revenue Estimate</span>
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
                      <h4 className="font-semibold text-yellow-800 mb-2">Revenue Breakdown:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>
                          • Views: {views} ({timeframe})
                        </p>
                        <p>• CPM: ${cpm}</p>
                        <p>• CTR: {ctr}%</p>
                        <p>• Daily Revenue: ${results.dailyEarnings.toFixed(2)}</p>
                        <p>• Monthly Revenue: ${(results.dailyEarnings * 30).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your channel metrics to estimate YouTube earnings</p>
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
