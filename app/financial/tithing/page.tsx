"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function TithingCalculatorPage() {
  const [income, setIncome] = useState("")
  const [percentage, setPercentage] = useState("10")
  const [frequency, setFrequency] = useState("monthly")
  const [results, setResults] = useState<{
    titheAmount: number
    remainingIncome: number
    annualTithe: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateTithe = () => {
    const incomeAmount = Number.parseFloat(income)
    const tithePercent = Number.parseFloat(percentage)

    if (isNaN(incomeAmount) || isNaN(tithePercent) || incomeAmount <= 0 || tithePercent <= 0) return

    const titheAmount = (incomeAmount * tithePercent) / 100
    const remainingIncome = incomeAmount - titheAmount

    let annualTithe = titheAmount
    if (frequency === "weekly") {
      annualTithe = titheAmount * 52
    } else if (frequency === "monthly") {
      annualTithe = titheAmount * 12
    } else if (frequency === "quarterly") {
      annualTithe = titheAmount * 4
    }

    setResults({
      titheAmount: Math.round(titheAmount * 100) / 100,
      remainingIncome: Math.round(remainingIncome * 100) / 100,
      annualTithe: Math.round(annualTithe * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setIncome("")
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
              <DollarSign className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Tithing Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your tithe amount based on your income with MaiCalcs. Support your faith community with accurate
              tithing calculations.
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
                  <span>Tithe Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="income">Income Amount ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="Enter your income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Income Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="percentage">Tithe Percentage (%)</Label>
                  <Select value={percentage} onValueChange={setPercentage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5% (Half Tithe)</SelectItem>
                      <SelectItem value="10">10% (Traditional Tithe)</SelectItem>
                      <SelectItem value="15">15% (Generous Giving)</SelectItem>
                      <SelectItem value="20">20% (Sacrificial Giving)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Tithing Principles:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Traditionally 10% of one's income.</p>
                    <p>• Can be based on gross or net income.</p>
                    <p>• Supports religious or charitable organizations.</p>
                    <p>• A personal and voluntary practice.</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Calculation Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Tithe Amount = Income × (Percentage / 100)</p>
                    <p>• Remaining = Income - Tithe Amount</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTithe} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Tithe
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
                        <span className="font-medium text-gray-700">Tithe Amount ({frequency}):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.titheAmount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.titheAmount)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Remaining Income:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">
                            ${results.remainingIncome.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.remainingIncome)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Annual Tithe:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">${results.annualTithe.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.annualTithe)}
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
                        <p>
                          • Income: ${income} ({frequency})
                        </p>
                        <p>• Tithe Percentage: {percentage}%</p>
                        <p>• Tithe Amount: ${results.titheAmount.toFixed(2)}</p>
                        <p>• Remaining: ${results.remainingIncome.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your income to calculate tithe amount</p>
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
