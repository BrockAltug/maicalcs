"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Triangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PythagoreanTheoremCalculatorPage() {
  const [sideA, setSideA] = useState("")
  const [sideB, setSideB] = useState("")
  const [sideC, setSideC] = useState("")
  const [findSide, setFindSide] = useState("c")
  const [unit, setUnit] = useState("cm")
  const [results, setResults] = useState<{
    sideA: number
    sideB: number
    sideC: number
    area: number
    perimeter: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculatePythagorean = () => {
    try {
      const a = sideA ? Number.parseFloat(sideA) : 0
      const b = sideB ? Number.parseFloat(sideB) : 0
      const c = sideC ? Number.parseFloat(sideC) : 0

      let finalA: number, finalB: number, finalC: number
      let formula: string

      if (findSide === "c") {
        if (!a || !b || a <= 0 || b <= 0) {
          alert("Please enter valid positive values for sides A and B.")
          return
        }
        finalA = a
        finalB = b
        finalC = Math.sqrt(a * a + b * b)
        formula = `c = √(a² + b²) = √(${a}² + ${b}²)`
      } else if (findSide === "a") {
        if (!b || !c || b <= 0 || c <= 0 || c <= b) {
          alert("Please enter valid positive values. Hypotenuse must be larger than the other side.")
          return
        }
        finalB = b
        finalC = c
        finalA = Math.sqrt(c * c - b * b)
        formula = `a = √(c² - b²) = √(${c}² - ${b}²)`
      } else {
        if (!a || !c || a <= 0 || c <= 0 || c <= a) {
          alert("Please enter valid positive values. Hypotenuse must be larger than the other side.")
          return
        }
        finalA = a
        finalC = c
        finalB = Math.sqrt(c * c - a * a)
        formula = `b = √(c² - a²) = √(${c}² - ${a}²)`
      }

      const area = (finalA * finalB) / 2
      const perimeter = finalA + finalB + finalC

      setResults({
        sideA: Number.parseFloat(finalA.toFixed(4)),
        sideB: Number.parseFloat(finalB.toFixed(4)),
        sideC: Number.parseFloat(finalC.toFixed(4)),
        area: Number.parseFloat(area.toFixed(4)),
        perimeter: Number.parseFloat(perimeter.toFixed(4)),
        formula,
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
    setSideA("")
    setSideB("")
    setSideC("")
    setFindSide("c")
    setUnit("cm")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Triangle className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pythagorean Theorem Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate missing sides of right triangles using the Pythagorean theorem with MaiCalcs. Perfect for
              geometry, construction, and engineering.
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
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Triangle Sides</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="findSide">Find Side</Label>
                  <Select value={findSide} onValueChange={setFindSide}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c">Hypotenuse (c)</SelectItem>
                      <SelectItem value="a">Side A</SelectItem>
                      <SelectItem value="b">Side B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {findSide !== "a" && (
                  <div className="space-y-2">
                    <Label htmlFor="sideA">Side A</Label>
                    <Input
                      id="sideA"
                      type="number"
                      placeholder="Enter side A"
                      value={sideA}
                      onChange={(e) => setSideA(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                    />
                  </div>
                )}

                {findSide !== "b" && (
                  <div className="space-y-2">
                    <Label htmlFor="sideB">Side B</Label>
                    <Input
                      id="sideB"
                      type="number"
                      placeholder="Enter side B"
                      value={sideB}
                      onChange={(e) => setSideB(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                    />
                  </div>
                )}

                {findSide !== "c" && (
                  <div className="space-y-2">
                    <Label htmlFor="sideC">Hypotenuse (c)</Label>
                    <Input
                      id="sideC"
                      type="number"
                      placeholder="Enter hypotenuse"
                      value={sideC}
                      onChange={(e) => setSideC(e.target.value)}
                      className="text-lg font-mono"
                      step="0.01"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm">Millimeters (mm)</SelectItem>
                      <SelectItem value="cm">Centimeters (cm)</SelectItem>
                      <SelectItem value="m">Meters (m)</SelectItem>
                      <SelectItem value="in">Inches (in)</SelectItem>
                      <SelectItem value="ft">Feet (ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Pythagorean Theorem:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• a² + b² = c²</p>
                    <p>• c = √(a² + b²)</p>
                    <p>• a = √(c² - b²)</p>
                    <p>• b = √(c² - a²)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• a=3, b=4 → c=5</p>
                    <p>• a=5, b=12 → c=13</p>
                    <p>• a=8, b=15 → c=17</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePythagorean} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <span>Triangle Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Side A:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {results.sideA} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.sideA} ${unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Side B:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.sideB} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.sideB} ${unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Hypotenuse (c):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.sideC} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.sideC} ${unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Area:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.area} {unit}²
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.area} ${unit}²`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Perimeter:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-pink-600 font-mono">
                            {results.perimeter} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.perimeter} ${unit}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Area = (a × b) / 2</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Construction and carpentry</p>
                        <p>• Navigation and surveying</p>
                        <p>• Engineering calculations</p>
                        <p>• Architecture and design</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Triangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter two sides to calculate the missing side</p>
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
