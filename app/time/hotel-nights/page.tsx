"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Hotel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function HotelNightsCalculatorPage() {
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [pricePerNight, setPricePerNight] = useState("")
  const [taxRate, setTaxRate] = useState("10")
  const [results, setResults] = useState<{
    nights: number
    subtotal: number
    tax: number
    total: number
    averagePerNight: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateHotelNights = () => {
    try {
      if (!checkInDate || !checkOutDate) {
        alert("Please enter both check-in and check-out dates.")
        return
      }

      const checkIn = new Date(checkInDate)
      const checkOut = new Date(checkOutDate)

      if (checkIn >= checkOut) {
        alert("Check-out date must be after check-in date.")
        return
      }

      const nights = Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))

      let subtotal = 0
      let tax = 0
      let total = 0
      let averagePerNight = 0

      if (pricePerNight) {
        const price = Number.parseFloat(pricePerNight)
        const taxRateNum = Number.parseFloat(taxRate) / 100

        if (isNaN(price) || price < 0) {
          alert("Please enter a valid price per night.")
          return
        }

        subtotal = nights * price
        tax = subtotal * taxRateNum
        total = subtotal + tax
        averagePerNight = price
      }

      setResults({
        nights,
        subtotal: Number.parseFloat(subtotal.toFixed(2)),
        tax: Number.parseFloat(tax.toFixed(2)),
        total: Number.parseFloat(total.toFixed(2)),
        averagePerNight: Number.parseFloat(averagePerNight.toFixed(2)),
        formula: `${checkInDate} to ${checkOutDate}`,
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setCheckInDate("")
    setCheckOutDate("")
    setPricePerNight("")
    setTaxRate("10")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Hotel className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Hotel Nights Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate hotel nights and total costs with MaiCalcs. Perfect for travel planning, booking confirmations,
              and expense calculations.
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
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>Hotel Stay Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="checkInDate">Check-in Date</Label>
                  <Input
                    id="checkInDate"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOutDate">Check-out Date</Label>
                  <Input
                    id="checkOutDate"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerNight">Price per Night (Optional)</Label>
                  <Input
                    id="pricePerNight"
                    type="number"
                    placeholder="Enter price per night"
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    placeholder="Enter tax rate"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Hotel Calculations:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Number of nights</p>
                    <p>• Subtotal cost</p>
                    <p>• Tax amount</p>
                    <p>• Total cost with tax</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 3 nights × $100/night = $300</p>
                    <p>• With 10% tax = $330 total</p>
                    <p>• Weekend stay: Fri-Sun = 2 nights</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateHotelNights} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
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
                  <ArrowRight className="h-5 w-5 text-pink-600" />
                  <span>Hotel Stay Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Number of Nights:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.nights}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.nights.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {pricePerNight && (
                      <>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Subtotal:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-green-600 font-mono">${results.subtotal}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(`$${results.subtotal}`)}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-pink-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Tax:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-pink-600 font-mono">${results.tax}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(`$${results.tax}`)}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">Total Cost:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-blue-600 font-mono">${results.total}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyResult(`$${results.total}`)}
                                className="h-8 w-8 p-0"
                              >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Stay Details:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Duration: {results.nights} nights</p>
                        {pricePerNight && <p>• Rate: ${results.averagePerNight}/night</p>}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Travel expense planning</p>
                        <p>• Hotel booking verification</p>
                        <p>• Business trip budgeting</p>
                        <p>• Vacation cost estimation</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Hotel className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter check-in and check-out dates to calculate nights</p>
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
