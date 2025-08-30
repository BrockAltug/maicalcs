"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function EnergyCalculatorPage() {
  const [power, setPower] = useState("")
  const [hours, setHours] = useState("")
  const [days, setDays] = useState("30")
  const [rate, setRate] = useState("0.12")
  const [results, setResults] = useState<{
    dailyUsage: number
    monthlyUsage: number
    yearlyUsage: number
    dailyCost: number
    monthlyCost: number
    yearlyCost: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateEnergy = () => {
    const powerWatts = Number.parseFloat(power)
    const hoursPerDay = Number.parseFloat(hours)
    const daysInMonth = Number.parseFloat(days)
    const costPerKWh = Number.parseFloat(rate)

    if (isNaN(powerWatts) || isNaN(hoursPerDay) || isNaN(daysInMonth) || isNaN(costPerKWh)) return
    if (powerWatts <= 0 || hoursPerDay <= 0 || daysInMonth <= 0 || costPerKWh <= 0) return

    // Convert watts to kilowatts
    const powerKW = powerWatts / 1000

    // Calculate usage in kWh
    const dailyUsage = powerKW * hoursPerDay
    const monthlyUsage = dailyUsage * daysInMonth
    const yearlyUsage = dailyUsage * 365

    // Calculate costs
    const dailyCost = dailyUsage * costPerKWh
    const monthlyCost = monthlyUsage * costPerKWh
    const yearlyCost = yearlyUsage * costPerKWh

    setResults({
      dailyUsage: Math.round(dailyUsage * 1000) / 1000,
      monthlyUsage: Math.round(monthlyUsage * 100) / 100,
      yearlyUsage: Math.round(yearlyUsage * 100) / 100,
      dailyCost: Math.round(dailyCost * 100) / 100,
      monthlyCost: Math.round(monthlyCost * 100) / 100,
      yearlyCost: Math.round(yearlyCost * 100) / 100,
    })
  }

  const copyResult = async (value: number) => {
    await navigator.clipboard.writeText(value.toString())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setPower("")
    setHours("")
    setDays("30")
    setRate("0.12")
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
              <Zap className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Energy Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate electricity consumption and costs for your appliances with MaiCalcs. Monitor energy usage and
              optimize your electricity bills.
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
                  <span>Energy Consumption</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="power">Power Consumption (Watts)</Label>
                  <Input
                    id="power"
                    type="number"
                    placeholder="Enter power in watts"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours">Hours Used Per Day</Label>
                  <Input
                    id="hours"
                    type="number"
                    placeholder="Enter hours per day"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="days">Days in Month</Label>
                  <Select value={days} onValueChange={setDays}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="28">28 days (February)</SelectItem>
                      <SelectItem value="30">30 days (Average)</SelectItem>
                      <SelectItem value="31">31 days (Long months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Electricity Rate ($/kWh)</Label>
                  <Select value={rate} onValueChange={setRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.08">$0.08 (Low rate)</SelectItem>
                      <SelectItem value="0.10">$0.10 (Below average)</SelectItem>
                      <SelectItem value="0.12">$0.12 (Average)</SelectItem>
                      <SelectItem value="0.15">$0.15 (Above average)</SelectItem>
                      <SelectItem value="0.20">$0.20 (High rate)</SelectItem>
                      <SelectItem value="0.25">$0.25 (Very high)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Appliance Wattages:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• LED Bulb: 10-15W</p>
                    <p>• Laptop: 50-100W</p>
                    <p>• Refrigerator: 100-400W</p>
                    <p>• Air Conditioner: 1000-3000W</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Energy Formulas:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• Energy (kWh) = (Power (W) × Hours) / 1000</p>
                    <p>• Cost = Energy (kWh) × Rate ($/kWh)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateEnergy} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Energy
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
                  <span>Energy Usage & Costs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Daily Usage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">{results.dailyUsage} kWh</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.dailyUsage)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Monthly Usage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600">{results.monthlyUsage} kWh</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.monthlyUsage)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Yearly Usage:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-purple-600">{results.yearlyUsage} kWh</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.yearlyUsage)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Daily Cost:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-orange-600">${results.dailyCost.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.dailyCost)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Monthly Cost:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600">${results.monthlyCost.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.monthlyCost)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Yearly Cost:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-gray-600">${results.yearlyCost.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.yearlyCost)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Energy Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Power: {power}W</p>
                        <p>• Usage: {hours} hours/day</p>
                        <p>• Rate: ${rate}/kWh</p>
                        <p>• Monthly Cost: ${results.monthlyCost.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter appliance details to calculate energy costs</p>
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
