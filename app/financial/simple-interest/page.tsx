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

export default function SimpleInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [results, setResults] = useState<{
    interest: number
    totalAmount: number
    monthlyInterest: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateInterest = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate)
    const t = Number.parseFloat(time)

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r < 0 || t <= 0) return

    // Simple Interest Formula: I = P * R * T / 100
    const interest = (p * r * t) / 100
    const totalAmount = p + interest
    const monthlyInterest = interest / (t * 12)

    setResults({
      interest: Math.round(interest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      monthlyInterest: Math.round(monthlyInterest * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setPrincipal("")
    setRate("")
    setTime("")
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
              Simple Interest Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate simple interest on loans and investments with MaiCalcs. Get detailed breakdowns of interest
              earned or paid over time.
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
                  <span>Interest Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal Amount ($)</Label>
                  <Input
                    id="principal"
                    type="number"
                    step="0.01"
                    placeholder="Enter principal amount"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    placeholder="Enter interest rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time Period (years)</Label>
                  <Input
                    id="time"
                    type="number"
                    step="0.1"
                    placeholder="Enter time in years"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Scenarios:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Personal loans from a bank</p>
                    <p>• Car loans (often simple interest)</p>
                    <p>• Basic savings accounts or bonds</p>
                    <p>• Mortgages (interest calculation part)</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Simple Interest Formula:</h4>
                  <p className="text-blue-700 font-mono text-sm">I = P × R × T ÷ 100</p>
                  <div className="text-sm text-blue-700 mt-2 space-y-1">
                    <p>• I = Interest earned/paid</p>
                    <p>• P = Principal amount</p>
                    <p>• R = Annual interest rate (%)</p>
                    <p>• T = Time period (years)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateInterest} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Interest
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
                  <span>Interest Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Simple Interest:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">${results.interest.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.interest)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.totalAmount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalAmount)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Monthly Interest:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">
                            ${results.monthlyInterest.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.monthlyInterest)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Details:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Principal: ${principal}</p>
                        <p>• Interest Rate: {rate}% per year</p>
                        <p>• Time Period: {time} years</p>
                        <p>
                          • Formula: ${principal} × {rate}% × {time} years
                        </p>
                        <p>• Interest: ${results.interest.toFixed(2)}</p>
                        <p>
                          • Total: ${principal} + ${results.interest.toFixed(2)} = ${results.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter values to calculate simple interest</p>
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
