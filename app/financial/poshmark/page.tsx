"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PoshmarkCalculatorPage() {
  const [salePrice, setSalePrice] = useState("")
  const [shippingDiscount, setShippingDiscount] = useState("0")
  const [results, setResults] = useState<{
    poshmarkFee: number
    paymentProcessingFee: number
    totalFees: number
    netEarnings: number
    profitMargin: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePoshmarkFees = () => {
    const price = Number.parseFloat(salePrice)
    const discount = Number.parseFloat(shippingDiscount)

    if (isNaN(price) || price <= 0) return

    // Poshmark fee structure
    let poshmarkFee = 0
    if (price < 15) {
      poshmarkFee = 2.95 // Flat fee for sales under $15
    } else {
      poshmarkFee = price * 0.2 // 20% for sales $15 and above
    }

    // Payment processing fee (2.9% + $0.30)
    const paymentProcessingFee = price * 0.029 + 0.3

    const totalFees = poshmarkFee + paymentProcessingFee + discount
    const netEarnings = price - totalFees
    const profitMargin = (netEarnings / price) * 100

    setResults({
      poshmarkFee: Math.round(poshmarkFee * 100) / 100,
      paymentProcessingFee: Math.round(paymentProcessingFee * 100) / 100,
      totalFees: Math.round(totalFees * 100) / 100,
      netEarnings: Math.round(netEarnings * 100) / 100,
      profitMargin: Math.round(profitMargin * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setSalePrice("")
    setShippingDiscount("0")
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
              <CreditCard className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Poshmark Fee Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate Poshmark selling fees and your net earnings with MaiCalcs. Know exactly how much you'll make
              from your Poshmark sales.
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
                  <span>Poshmark Sale Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="sale-price">Sale Price ($)</Label>
                  <Input
                    id="sale-price"
                    type="number"
                    placeholder="Enter sale price"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipping-discount">Shipping Discount ($)</Label>
                  <Select value={shippingDiscount} onValueChange={setShippingDiscount}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No Discount ($0)</SelectItem>
                      <SelectItem value="1">$1 Discount</SelectItem>
                      <SelectItem value="2">$2 Discount</SelectItem>
                      <SelectItem value="3">$3 Discount</SelectItem>
                      <SelectItem value="4">$4 Discount</SelectItem>
                      <SelectItem value="5">$5 Discount</SelectItem>
                      <SelectItem value="7.67">Full Shipping ($7.67)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Poshmark Fee Structure:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Sales under $15: $2.95 flat fee</p>
                    <p>• Sales $15+: 20% commission</p>
                    <p>• Payment processing: 2.9% + $0.30</p>
                    <p>• Standard shipping: $7.67</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Earnings Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Total Fees = Poshmark Fee + Processing Fee + Shipping Discount</p>
                    <p>• Net Earnings = Sale Price - Total Fees</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePoshmarkFees} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Fees
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
                  <span>Fee Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Poshmark Fee:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">${results.poshmarkFee.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.poshmarkFee)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Payment Processing:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">
                            ${results.paymentProcessingFee.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.paymentProcessingFee)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Fees:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">${results.totalFees.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalFees)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Net Earnings:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.netEarnings.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.netEarnings)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Profit Margin:</span>
                        <span className="text-2xl font-bold text-blue-600">{results.profitMargin.toFixed(1)}%</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Sale Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Sale Price: ${salePrice}</p>
                        <p>• Shipping Discount: ${shippingDiscount}</p>
                        <p>• Total Fees: ${results.totalFees.toFixed(2)}</p>
                        <p>• You Keep: ${results.netEarnings.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter sale price to calculate Poshmark fees</p>
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
