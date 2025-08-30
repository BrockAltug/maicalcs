"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function DegreesToSlopePage() {
  const [degrees, setDegrees] = useState("")
  const [results, setResults] = useState<{
    percentage: number
    ratio: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

  const calculateSlope = () => {
    try {
      if (!degrees) {
        alert("Please enter an angle in degrees.")
        return
      }

      const deg = Number.parseFloat(degrees)

      if (deg >= 90 || deg <= -90) {
        alert("Angle must be between -90 and 90 degrees.")
        return
      }

      const radians = deg * (Math.PI / 180)
      const percentage = Math.tan(radians) * 100
      const rise = Math.tan(radians)
      const run = 1

      const multiplier = 100
      const divisor = gcd(Math.round(rise * multiplier), Math.round(run * multiplier))
      const simplifiedRise = Math.round(rise * multiplier) / divisor
      const simplifiedRun = Math.round(run * multiplier) / divisor

      setResults({
        percentage,
        ratio: `${simplifiedRise.toFixed(0)}:${simplifiedRun.toFixed(0)}`,
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
    setDegrees("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Degrees to Percent Slope
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert angles in degrees to a percentage slope for construction, road design, and accessibility ramps.
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
                  <span>Angle Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="degrees">Angle (degrees)</Label>
                  <Input
                    id="degrees"
                    type="number"
                    value={degrees}
                    onChange={(e) => setDegrees(e.target.value)}
                    placeholder="e.g., 45"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Conversions Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Degrees to Percent Slope (%)</p>
                    <p>• Degrees to Rise:Run Ratio</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Slopes:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• ADA Ramp (max): 4.76° (8.33%)</p>
                    <p>• Drainage slope (min): 1.15° (2%)</p>
                    <p>• Roof pitch (4/12): 18.4° (33.3%)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSlope} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Slope Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Percent Slope:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.percentage.toFixed(2)}%
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.percentage.toFixed(2)}%`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Rise:Run Ratio:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">{results.ratio}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter an angle to convert to slope</p>
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
