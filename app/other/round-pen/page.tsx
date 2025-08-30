"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Circle, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function RoundPenCalculator() {
  const [diameter, setDiameter] = useState("60")
  const [panelLength, setPanelLength] = useState("12")
  const [results, setResults] = useState<{
    panelsNeeded: number
    circumference: number
    area: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateRoundPen = () => {
    const diam = Number.parseFloat(diameter)
    const panelLen = Number.parseFloat(panelLength)

    if (isNaN(diam) || isNaN(panelLen) || diam <= 0 || panelLen <= 0) {
      alert("Please enter valid positive numbers for diameter and panel length.")
      return
    }

    const circumference = Math.PI * diam
    const area = Math.PI * Math.pow(diam / 2, 2)
    const panelsNeeded = Math.ceil(circumference / panelLen)

    setResults({ panelsNeeded, circumference, area })
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setDiameter("60")
    setPanelLength("12")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Circle className="h-16 w-16 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Round Pen Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the number of panels, area, and circumference for your round pen.
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
                  <span>Pen Dimensions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="diameter">Desired Diameter (feet)</Label>
                  <Input
                    id="diameter"
                    type="number"
                    placeholder="e.g., 60"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panelLength">Length of Each Panel (feet)</Label>
                  <Input
                    id="panelLength"
                    type="number"
                    placeholder="e.g., 12"
                    value={panelLength}
                    onChange={(e) => setPanelLength(e.target.value)}
                  />
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-semibold text-indigo-800 mb-2">Common Sizes:</h4>
                  <p className="text-sm text-indigo-700">
                    Standard diameters for round pens are 50, 60, or 80 feet. Panel lengths are often 10 or 12 feet.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700">
                    Remember to account for a gate, which is usually a separate panel and not included in this
                    calculation.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateRoundPen} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                  <span>Your Pen Specs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Panels Needed:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-indigo-600 font-mono">~{results.panelsNeeded}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.panelsNeeded.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Circumference:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.circumference.toFixed(2)} ft
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Area:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.area.toFixed(2)} sq ft
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Planning Tip:</h4>
                      <p className="text-sm text-yellow-700">
                        Always double-check your measurements on-site before purchasing materials.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions to calculate pen specs</p>
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
