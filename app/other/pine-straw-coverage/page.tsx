"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Leaf, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PineStrawCoverageCalculator() {
  const [area, setArea] = useState("")
  const [depth, setDepth] = useState("3")
  const [results, setResults] = useState<{ balesNeeded: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateBales = () => {
    const areaSqFt = Number.parseFloat(area)
    const depthInches = Number.parseFloat(depth)

    if (isNaN(areaSqFt) || isNaN(depthInches) || areaSqFt <= 0 || depthInches <= 0) {
      alert("Please enter valid positive numbers for area and depth.")
      return
    }

    const coveragePerBale = 50 * (2.5 / depthInches)
    const balesNeeded = Math.ceil(areaSqFt / coveragePerBale)

    setResults({ balesNeeded })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setArea("")
    setDepth("3")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Leaf className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pine Straw Coverage Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate how many bales of pine straw you need for your landscaping project based on area and desired
              depth.
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
                  <span>Project Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="area">Area to Cover (sq ft)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="e.g., 500"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depth">Desired Depth (inches)</Label>
                  <Input
                    id="depth"
                    type="number"
                    placeholder="e.g., 3"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                  />
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Coverage Basis:</h4>
                  <p className="text-sm text-indigo-700">
                    Calculation is based on a standard square bale covering ~50 sq ft at a 2.5-inch depth.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    It's always a good idea to buy an extra bale or two to account for variations and to have some for
                    touch-ups later.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateBales} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                  <span>Your Estimate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Bales Needed:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">~{results.balesNeeded}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.balesNeeded.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Landscaping Tips:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>A depth of 2.5 to 3 inches is typical for good weed control.</li>
                        <li>Round bales will have different coverage rates.</li>
                        <li>Apply to a clean, weed-free bed for best results.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter project details to estimate bales needed</p>
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
