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

export default function VATCalculatorPage() {
  const [amount, setAmount] = useState("")
  const [vatRate, setVatRate] = useState("20")
  const [calculationType, setCalculationType] = useState("add")
  const [results, setResults] = useState<{
    netAmount: number
    vatAmount: number
    grossAmount: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateVAT = () => {
    const inputAmount = Number.parseFloat(amount)
    const rate = Number.parseFloat(vatRate) / 100

    if (isNaN(inputAmount) || inputAmount <= 0) return

    let netAmount: number
    let vatAmount: number
    let grossAmount: number

    if (calculationType === "add") {
      // Add VAT to net amount
      netAmount = inputAmount
      vatAmount = netAmount * rate
      grossAmount = netAmount + vatAmount
    } else {
      // Remove VAT from gross amount
      grossAmount = inputAmount
      netAmount = grossAmount / (1 + rate)
      vatAmount = grossAmount - netAmount
    }

    setResults({
      netAmount: Math.round(netAmount * 100) / 100,
      vatAmount: Math.round(vatAmount * 100) / 100,
      grossAmount: Math.round(grossAmount * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setAmount("")
    setVatRate("20")
    setCalculationType("add")
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
              VAT Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate VAT (Value Added Tax) for any amount with MaiCalcs. Add or remove VAT with customizable tax
              rates for different countries.
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
                  <span>VAT Calculation</span>
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
                      <SelectItem value="add">Add VAT to net amount</SelectItem>
                      <SelectItem value="remove">Remove VAT from gross amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">
                    {calculationType === "add" ? "Net Amount (excluding VAT)" : "Gross Amount (including VAT)"}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vat-rate">VAT Rate (%)</Label>
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0% (Zero rate)</SelectItem>
                      <SelectItem value="5">5% (Reduced rate)</SelectItem>
                      <SelectItem value="10">10% (Reduced rate)</SelectItem>
                      <SelectItem value="15">15% (Standard rate)</SelectItem>
                      <SelectItem value="20">20% (UK Standard)</SelectItem>
                      <SelectItem value="21">21% (EU Standard)</SelectItem>
                      <SelectItem value="25">25% (Nordic countries)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common VAT Rates:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• UK: 20% (Standard), 5% (Reduced), 0% (Zero)</p>
                    <p>• EU: 15-27% (varies by country)</p>
                    <p>• US: No federal VAT (state sales tax varies)</p>
                    <p>• Canada: 5% GST + provincial tax</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Add VAT: Gross = Net × (1 + VAT Rate)</p>
                    <p>• Remove VAT: Net = Gross / (1 + VAT Rate)</p>
                    <p>• VAT Amount = Gross - Net</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateVAT} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate VAT
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
                  <span>VAT Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Net Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">${results.netAmount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.netAmount)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">VAT Amount ({vatRate}%):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">${results.vatAmount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.vatAmount)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Gross Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.grossAmount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.grossAmount)}
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
                          • Input: ${amount} ({calculationType === "add" ? "net" : "gross"} amount)
                        </p>
                        <p>• VAT Rate: {vatRate}%</p>
                        <p>• Net Amount: ${results.netAmount.toFixed(2)}</p>
                        <p>• VAT: ${results.vatAmount.toFixed(2)}</p>
                        <p>• Total: ${results.grossAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter an amount to calculate VAT</p>
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
