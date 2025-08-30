"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function MoneyCalculatorPage() {
  const [bills, setBills] = useState({
    hundreds: "",
    fifties: "",
    twenties: "",
    tens: "",
    fives: "",
    ones: "",
  })
  const [coins, setCoins] = useState({
    dollars: "",
    quarters: "",
    dimes: "",
    nickels: "",
    pennies: "",
  })
  const [results, setResults] = useState<{
    totalBills: number
    totalCoins: number
    grandTotal: number
    breakdown: { [key: string]: number }
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateMoney = () => {
    const billValues = {
      hundreds: 100,
      fifties: 50,
      twenties: 20,
      tens: 10,
      fives: 5,
      ones: 1,
    }

    const coinValues = {
      dollars: 1,
      quarters: 0.25,
      dimes: 0.1,
      nickels: 0.05,
      pennies: 0.01,
    }

    let totalBills = 0
    let totalCoins = 0
    const breakdown: { [key: string]: number } = {}

    // Calculate bills
    Object.entries(bills).forEach(([denomination, count]) => {
      const numCount = Number.parseFloat(count) || 0
      const value = numCount * billValues[denomination as keyof typeof billValues]
      totalBills += value
      if (numCount > 0) {
        breakdown[denomination] = value
      }
    })

    // Calculate coins
    Object.entries(coins).forEach(([denomination, count]) => {
      const numCount = Number.parseFloat(count) || 0
      const value = numCount * coinValues[denomination as keyof typeof coinValues]
      totalCoins += value
      if (numCount > 0) {
        breakdown[denomination] = value
      }
    })

    const grandTotal = totalBills + totalCoins

    setResults({
      totalBills: Math.round(totalBills * 100) / 100,
      totalCoins: Math.round(totalCoins * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
      breakdown,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setBills({
      hundreds: "",
      fifties: "",
      twenties: "",
      tens: "",
      fives: "",
      ones: "",
    })
    setCoins({
      dollars: "",
      quarters: "",
      dimes: "",
      nickels: "",
      pennies: "",
    })
    setResults(null)
  }

  const handleBillChange = (denomination: string, value: string) => {
    setBills((prev) => ({ ...prev, [denomination]: value }))
  }

  const handleCoinChange = (denomination: string, value: string) => {
    setCoins((prev) => ({ ...prev, [denomination]: value }))
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
              Money Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Count and calculate the total value of bills and coins with MaiCalcs. Perfect for cash registers, piggy
              banks, and money counting.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bills Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-green-600" />
                  <span>Bills</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hundreds">$100 Bills</Label>
                  <Input
                    id="hundreds"
                    type="number"
                    placeholder="0"
                    value={bills.hundreds}
                    onChange={(e) => handleBillChange("hundreds", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fifties">$50 Bills</Label>
                  <Input
                    id="fifties"
                    type="number"
                    placeholder="0"
                    value={bills.fifties}
                    onChange={(e) => handleBillChange("fifties", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twenties">$20 Bills</Label>
                  <Input
                    id="twenties"
                    type="number"
                    placeholder="0"
                    value={bills.twenties}
                    onChange={(e) => handleBillChange("twenties", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tens">$10 Bills</Label>
                  <Input
                    id="tens"
                    type="number"
                    placeholder="0"
                    value={bills.tens}
                    onChange={(e) => handleBillChange("tens", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fives">$5 Bills</Label>
                  <Input
                    id="fives"
                    type="number"
                    placeholder="0"
                    value={bills.fives}
                    onChange={(e) => handleBillChange("fives", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ones">$1 Bills</Label>
                  <Input
                    id="ones"
                    type="number"
                    placeholder="0"
                    value={bills.ones}
                    onChange={(e) => handleBillChange("ones", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Coins Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Coins</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dollars">Dollar Coins</Label>
                  <Input
                    id="dollars"
                    type="number"
                    placeholder="0"
                    value={coins.dollars}
                    onChange={(e) => handleCoinChange("dollars", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quarters">Quarters ($0.25)</Label>
                  <Input
                    id="quarters"
                    type="number"
                    placeholder="0"
                    value={coins.quarters}
                    onChange={(e) => handleCoinChange("quarters", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimes">Dimes ($0.10)</Label>
                  <Input
                    id="dimes"
                    type="number"
                    placeholder="0"
                    value={coins.dimes}
                    onChange={(e) => handleCoinChange("dimes", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickels">Nickels ($0.05)</Label>
                  <Input
                    id="nickels"
                    type="number"
                    placeholder="0"
                    value={coins.nickels}
                    onChange={(e) => handleCoinChange("nickels", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pennies">Pennies ($0.01)</Label>
                  <Input
                    id="pennies"
                    type="number"
                    placeholder="0"
                    value={coins.pennies}
                    onChange={(e) => handleCoinChange("pennies", e.target.value)}
                  />
                </div>

                <div className="pt-4 space-y-2">
                  <Button onClick={calculateMoney} className="w-full bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Total
                  </Button>
                  <Button onClick={reset} variant="outline" className="w-full bg-transparent">
                    Reset All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                  <span>Total Amount</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Bills:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${results.totalBills.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalBills)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Coins:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">${results.totalCoins.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalCoins)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Grand Total:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">${results.grandTotal.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.grandTotal)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {Object.keys(results.breakdown).length > 0 && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Breakdown:</h4>
                        <div className="text-sm text-yellow-700 space-y-1">
                          {Object.entries(results.breakdown).map(([denomination, value]) => (
                            <p key={denomination}>
                              • {denomination.charAt(0).toUpperCase() + denomination.slice(1)}: ${value.toFixed(2)}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter bill and coin counts to calculate total</p>
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
