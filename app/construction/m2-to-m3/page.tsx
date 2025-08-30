"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function M2ToM3ConverterPage() {
  const [area, setArea] = useState("")
  const [thickness, setThickness] = useState("")
  const [results, setResults] = useState<{ volume: number } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateVolume = () => {
    try {
      if (!area || !thickness) {
        alert("Please fill in all fields.")
        return
      }

      const areaValue = Number.parseFloat(area)
      const thicknessValue = Number.parseFloat(thickness)

      if (areaValue <= 0 || thicknessValue <= 0) {
        alert("All values must be positive numbers.")
        return
      }

      const volume = areaValue * thicknessValue
      setResults({ volume })
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
    setArea("")
    setThickness("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <ChevronsRight className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              m² to m³ Converter
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert an area in square meters (m²) to a volume in cubic meters (m³) by providing a thickness or depth.
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
                  <span>Input Values</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (m²)</Label>
                  <Input
                    id="area"
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Enter area"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thickness">Thickness / Depth (m)</Label>
                  <Input
                    id="thickness"
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="Enter thickness"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Conversion Logic:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Calculates volume (m³) from area (m²) and thickness (m).</p>
                    <p>• Formula: Volume = Area × Thickness</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Common Applications:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Concrete slab: Area of slab × thickness</p>
                    <p>• Topsoil/Gravel: Area to cover × depth</p>
                    <p>• Insulation: Ceiling area × insulation thickness</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateVolume} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <span>Volume Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Volume:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.volume.toFixed(3)} m³
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.volume.toFixed(3)} m³`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ChevronsRight className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter area and thickness to convert</p>
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
