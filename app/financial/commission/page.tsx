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

export default function CommissionCalculatorPage() {
  const [salesAmount, setSalesAmount] = useState("")
  const [commissionRate, setCommissionRate] = useState("")
  const [commissionType, setCommissionType] = useState("percentage")
  const [baseSalary, setBaseSalary] = useState("")
  const [results, setResults] = useState<{
    commissionAmount: number
    totalEarnings: number
    effectiveRate: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateCommission = () => {
    const sales = Number.parseFloat(salesAmount)
    const rate = Number.parseFloat(commissionRate)
    const salary = Number.parseFloat(baseSalary) || 0

    if (isNaN(sales) || isNaN(rate) || sales <= 0 || rate <= 0) return

    let commissionAmount = 0

    if (commissionType === "percentage") {
      commissionAmount = (sales * rate) / 100
    } else {
      commissionAmount = rate // Flat rate
    }

    const totalEarnings = salary + commissionAmount
    const effectiveRate = (commissionAmount / sales) * 100

    setResults({
      commissionAmount: Math.round(commissionAmount * 100) / 100,
      totalEarnings: Math.round(totalEarnings * 100) / 100,
      effectiveRate: Math.round(effectiveRate * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setSalesAmount("")
    setCommissionRate("")
    setBaseSalary("")
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
              Commission Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate sales commissions and total earnings with MaiCalcs. Perfect for sales professionals and
              businesses with commission-based compensation.
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
                  <span>Commission Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sales-amount">Sales Amount ($)</Label>
                  <Input
                    id="sales-amount"
                    type="number"
                    placeholder="Enter total sales"
                    value={salesAmount}
                    onChange={(e) => setSalesAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commission-type">Commission Type</Label>
                  <Select value={commissionType} onValueChange={setCommissionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="flat">Flat Rate ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commission-rate">
                    Commission {commissionType === "percentage" ? "Rate (%)" : "Amount ($)"}
                  </Label>
                  <Input
                    id="commission-rate"
                    type="number"
                    placeholder={`Enter commission ${commissionType === "percentage" ? "percentage" : "amount"}`}
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="base-salary">Base Salary (Optional) ($)</Label>
                  <Input
                    id="base-salary"
                    type="number"
                    placeholder="Enter base salary (if any)"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Commission Rates:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Real Estate: 5-6%</p>
                    <p>• Insurance: 10-15%</p>
                    <p>• Car Sales: 20-25%</p>
                    <p>• Software Sales: 5-10%</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Earnings Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Commission = Sales × (Rate / 100)</p>
                    <p>• Total Earnings = Commission + Base Salary</p>
                    <p>• Effective Rate = (Commission / Sales) × 100</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateCommission} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Commission
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
                  <span>Earnings Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Commission Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">
                            ${results.commissionAmount.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.commissionAmount)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Earnings:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">${results.totalEarnings.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalEarnings)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Effective Commission Rate:</span>
                        <span className="text-2xl font-bold text-purple-600">{results.effectiveRate.toFixed(2)}%</span>
                      </div>
                    </div>

                    {baseSalary && (
                      <div className="bg-orange-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Base Salary:</span>
                          <span className="text-2xl font-bold text-orange-600">
                            ${Number.parseFloat(baseSalary).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Earnings Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Sales Amount: ${salesAmount}</p>
                        <p>
                          • Commission: {commissionRate}
                          {commissionType === "percentage" ? "%" : "$"}
                        </p>
                        <p>• Commission Earned: ${results.commissionAmount.toFixed(2)}</p>
                        {baseSalary && <p>• Base Salary: ${baseSalary}</p>}
                        <p>• Total Earnings: ${results.totalEarnings.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter sales details to calculate commission</p>
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
