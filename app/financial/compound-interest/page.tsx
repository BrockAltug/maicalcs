"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, PiggyBank } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("")
  const [rate, setRate] = useState("")
  const [time, setTime] = useState("")
  const [frequency, setFrequency] = useState("12")
  const [monthlyContribution, setMonthlyContribution] = useState("")
  const [results, setResults] = useState<{
    finalAmount: number
    totalInterest: number
    totalContributions: number
    totalPrincipal: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateCompoundInterest = () => {
    const p = Number.parseFloat(principal)
    const r = Number.parseFloat(rate) / 100
    const t = Number.parseFloat(time)
    const n = Number.parseFloat(frequency)
    const pmt = Number.parseFloat(monthlyContribution) || 0

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p < 0 || r < 0 || t <= 0) return

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const compoundAmount = p * Math.pow(1 + r / n, n * t)

    // Future value of annuity (monthly contributions)
    let annuityAmount = 0
    if (pmt > 0) {
      const monthlyRate = r / 12
      const months = t * 12
      if (monthlyRate > 0) {
        annuityAmount = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      } else {
        annuityAmount = pmt * months
      }
    }

    const finalAmount = compoundAmount + annuityAmount
    const totalContributions = pmt * 12 * t
    const totalPrincipal = p + totalContributions
    const totalInterest = finalAmount - totalPrincipal

    setResults({
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalContributions: Math.round(totalContributions * 100) / 100,
      totalPrincipal: Math.round(totalPrincipal * 100) / 100,
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
    setMonthlyContribution("")
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
              <PiggyBank className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Compound Interest Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate compound interest and investment growth with MaiCalcs. See how your money grows over time with
              the power of compounding and regular contributions.
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
                  <span>Investment Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="principal">Initial Investment ($)</Label>
                  <Input
                    id="principal"
                    type="number"
                    placeholder="Enter initial amount"
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
                    step="0.1"
                    placeholder="Enter annual interest rate"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Investment Period (Years)</Label>
                  <Input
                    id="time"
                    type="number"
                    placeholder="Enter number of years"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Compounding Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Annually</SelectItem>
                      <SelectItem value="2">Semi-annually</SelectItem>
                      <SelectItem value="4">Quarterly</SelectItem>
                      <SelectItem value="12">Monthly</SelectItem>
                      <SelectItem value="52">Weekly</SelectItem>
                      <SelectItem value="365">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-contribution">Monthly Contribution (Optional) ($)</Label>
                  <Input
                    id="monthly-contribution"
                    type="number"
                    placeholder="Enter monthly contribution"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">The Power of Compounding:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Interest earns interest over time</p>
                    <p>• More frequent compounding = higher returns</p>
                    <p>• Regular contributions accelerate growth</p>
                    <p>• Time is your greatest asset</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Formulas Used:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p className="font-mono">A = P(1 + r/n)^(nt)</p>
                    <p>• A = Final Amount</p>
                    <p>• P = Principal, r = rate, t = time, n = frequency</p>
                    <p>• Contributions are calculated as a future value of an annuity.</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateCompoundInterest} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Growth
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
                  <span>Investment Growth</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Final Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            ${results.finalAmount.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.finalAmount)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Interest Earned:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            ${results.totalInterest.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalInterest)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Principal:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">
                            ${results.totalPrincipal.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalPrincipal)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {monthlyContribution && (
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Total Contributions:</span>
                          <span className="text-2xl font-bold text-orange-600">
                            ${results.totalContributions.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Investment Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Initial Investment: ${principal}</p>
                        <p>• Annual Rate: {rate}%</p>
                        <p>• Time Period: {time} years</p>
                        <p>
                          • Compounding:{" "}
                          {frequency === "1"
                            ? "Annually"
                            : frequency === "12"
                              ? "Monthly"
                              : frequency === "365"
                                ? "Daily"
                                : `${frequency} times/year`}
                        </p>
                        {monthlyContribution && <p>• Monthly Contribution: ${monthlyContribution}</p>}
                        <p>• Final Value: ${results.finalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <PiggyBank className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter investment details to see compound growth</p>
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
