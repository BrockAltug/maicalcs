"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState("")
  const [discountPercent, setDiscountPercent] = useState("")
  const [results, setResults] = useState<{
    discountAmount: number
    finalPrice: number
    savings: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateDiscount = () => {
    const price = Number.parseFloat(originalPrice)
    const discount = Number.parseFloat(discountPercent)

    if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0 || discount > 100) return

    const discountAmount = (price * discount) / 100
    const finalPrice = price - discountAmount
    const savings = discountAmount

    setResults({
      discountAmount: Math.round(discountAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
      savings: Math.round(savings * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setOriginalPrice("")
    setDiscountPercent("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Tag className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Discount Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate discounts and savings with MaiCalcs. Find the final price after applying percentage discounts
              and see how much you save.
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
                  <span>Discount Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price ($)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    placeholder="Enter original price"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountPercent">Discount Percentage (%)</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="Enter discount percentage"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Discounts:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 10% off: Small discount</p>
                    <p>• 25% off: Quarter off original price</p>
                    <p>• 50% off: Half price sale</p>
                    <p>• 75% off: Clearance sale</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Discount Amount = Original Price × (Discount % ÷ 100)</p>
                    <p>• Final Price = Original Price - Discount Amount</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDiscount} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Discount
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
                  <ArrowRight className="h-5 w-5 text-emerald-600" />
                  <span>Discount Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Discount Amount:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">${results.discountAmount.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.discountAmount)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Final Price:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.finalPrice.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.finalPrice)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">You Save:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">${results.savings.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.savings)}
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
                        <p>• Original Price: ${originalPrice}</p>
                        <p>• Discount: {discountPercent}%</p>
                        <p>
                          • Discount Amount: ${originalPrice} × {discountPercent}% = $
                          {results.discountAmount.toFixed(2)}
                        </p>
                        <p>
                          • Final Price: ${originalPrice} - ${results.discountAmount.toFixed(2)} = $
                          {results.finalPrice.toFixed(2)}
                        </p>
                        <p>• Total Savings: ${results.savings.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Savings Analysis:</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• Percentage saved: {discountPercent}%</p>
                        <p>• Amount saved: ${results.savings.toFixed(2)}</p>
                        <p>• New price is {(100 - Number.parseFloat(discountPercent)).toFixed(1)}% of original</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Tag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter price and discount to calculate savings</p>
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
