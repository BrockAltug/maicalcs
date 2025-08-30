"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Coins, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

interface TipResults {
  tipAmount: string
  totalBill: string
  tipPerPerson: string
  totalPerPerson: string
}

export default function TipCalculatorPage() {
  const [bill, setBill] = useState("100")
  const [tipPercent, setTipPercent] = useState("15")
  const [people, setPeople] = useState("2")
  const [results, setResults] = useState<TipResults | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateTip = () => {
    const billFloat = Number.parseFloat(bill)
    const tipFloat = Number.parseFloat(tipPercent)
    const peopleInt = Number.parseInt(people, 10)

    if (isNaN(billFloat) || isNaN(tipFloat) || isNaN(peopleInt) || billFloat <= 0 || tipFloat < 0 || peopleInt <= 0) {
      alert("Please enter valid positive numbers for all fields.")
      return
    }

    const tipValue = billFloat * (tipFloat / 100)
    const totalValue = billFloat + tipValue

    setResults({
      tipAmount: tipValue.toFixed(2),
      totalBill: totalValue.toFixed(2),
      tipPerPerson: (tipValue / peopleInt).toFixed(2),
      totalPerPerson: (totalValue / peopleInt).toFixed(2),
    })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setBill("100")
    setTipPercent("15")
    setPeople("2")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Coins className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tip Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the tip and split the total bill among friends with ease.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-indigo-600" />
                  <span>Bill Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bill">Bill Amount ($)</Label>
                  <Input
                    id="bill"
                    type="number"
                    placeholder="e.g., 100"
                    value={bill}
                    onChange={(e) => setBill(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipPercent">Tip Percentage (%)</Label>
                  <Input
                    id="tipPercent"
                    type="number"
                    placeholder="e.g., 15"
                    value={tipPercent}
                    onChange={(e) => setTipPercent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="people">Number of People</Label>
                  <Input
                    id="people"
                    type="number"
                    placeholder="e.g., 2"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                  />
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Standard Rates:</h4>
                  <p className="text-sm text-indigo-700">
                    A tip of 15-20% is customary for good service in the United States.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    Always check your bill to see if a gratuity has already been included, especially for large parties.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTip} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <span>Your Split</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Per Person:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">
                            ${results.totalPerPerson}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalPerPerson)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Bill:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">${results.totalBill}</span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Tip:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">${results.tipAmount}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Breakdown:</h4>
                      <p className="text-sm text-yellow-700">
                        Each person pays ${results.totalPerPerson}, which includes a tip of ${results.tipPerPerson}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter bill details to calculate your split</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <AdBanner />
      </div>

      <Footer />
    </div>
  )
}
