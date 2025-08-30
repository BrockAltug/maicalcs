"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SlopeToDegreesPage() {
  const [slope, setSlope] = useState("")
  const [results, setResults] = useState<{
    degrees: number
    radians: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateDegrees = () => {
    try {
      if (!slope) {
        alert("Please enter a slope percentage.")
        return
      }

      const slopePercent = Number.parseFloat(slope)
      const slopeDecimal = slopePercent / 100
      const radians = Math.atan(slopeDecimal)
      const degrees = radians * (180 / Math.PI)

      setResults({
        degrees,
        radians,
      })
    } catch (error) {
      alert("Invalid input. Please enter a valid number.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setSlope("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <TrendingDown className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Percent Slope to Degrees
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert a percentage slope back to an angle in degrees for technical specifications and plans.
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
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span>Slope Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="slope">Slope (%)</Label>
                  <Input
                    id="slope"
                    type="number"
                    value={slope}
                    onChange={(e) => setSlope(e.target.value)}
                    placeholder="e.g., 100"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Conversions Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Percent Slope (%) to Degrees (°)</p>
                    <p>• Percent Slope (%) to Radians</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Reference Percentages:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 100% slope = 45°</p>
                    <p>• 50% slope = 26.6°</p>
                    <p>• 10% slope = 5.7°</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDegrees} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convert
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
                  <ArrowRight className="h-5 w-5 text-red-600" />
                  <span>Angle Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Angle (Degrees):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.degrees.toFixed(2)}°
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.degrees.toFixed(2)}°`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Angle (Radians):</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.radians.toFixed(4)} rad
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingDown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a slope to convert to degrees</p>
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
