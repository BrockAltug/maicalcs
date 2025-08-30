"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ExponentCalculatorPage() {
  const [base, setBase] = useState("")
  const [exponent, setExponent] = useState("")
  const [results, setResults] = useState<{
    result: number
    scientific: string
    formula: string
    properties: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateExponent = () => {
    try {
      const b = Number.parseFloat(base)
      const e = Number.parseFloat(exponent)

      if (isNaN(b) || isNaN(e)) {
        alert("Please enter valid numbers for base and exponent.")
        return
      }

      const res = Math.pow(b, e)
      const scientific = res.toExponential(3)

      const properties = []
      if (e === 0) properties.push(`Any number to the power of 0 equals 1`)
      if (e === 1) properties.push(`Any number to the power of 1 equals itself`)
      if (e < 0) properties.push(`Negative exponent means 1 divided by the positive power`)
      if (b === 0 && e > 0) properties.push(`Zero to any positive power equals 0`)
      if (b === 1) properties.push(`1 to any power equals 1`)

      setResults({
        result: Number.parseFloat(res.toFixed(8)),
        scientific,
        formula: `${b}^${e} = ${res}`,
        properties,
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
    setBase("")
    setExponent("")
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
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <div className="text-white font-bold text-lg">x²</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Exponent Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate powers and exponents with any base and exponent with MaiCalcs. Get results in standard and
              scientific notation with step-by-step explanations.
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
                  <span>Enter Values</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="base">Base (b)</Label>
                  <Input
                    id="base"
                    type="number"
                    placeholder="Enter base number"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exponent">Exponent (n)</Label>
                  <Input
                    id="exponent"
                    type="number"
                    placeholder="Enter exponent"
                    value={exponent}
                    onChange={(e) => setExponent(e.target.value)}
                    className="text-lg font-mono"
                    step="0.01"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-blue-800">
                      {base || "b"}
                      <sup>{exponent || "n"}</sup>
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Exponent Rules:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• b^n = b × b × b × ... (n times)</p>
                    <p>• b^0 = 1 (any number to power 0 equals 1)</p>
                    <p>• b^1 = b (any number to power 1 equals itself)</p>
                    <p>• b^(-n) = 1/b^n (negative exponent rule)</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2^3 = 2 × 2 × 2 = 8</p>
                    <p>• 5^2 = 5 × 5 = 25</p>
                    <p>• 3^(-2) = 1/3^2 = 1/9</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateExponent} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
                  <span>Power Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Result:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.result}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.result.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Scientific Notation:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.scientific}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.scientific)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {results.properties.length > 0 && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Properties:</h4>
                        <div className="space-y-1">
                          {results.properties.map((prop, index) => (
                            <div key={index} className="text-sm text-purple-700">
                              • {prop}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Base: {base}</p>
                        <p>• Exponent: {exponent}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Scientific calculations</p>
                        <p>• Compound interest calculations</p>
                        <p>• Population growth models</p>
                        <p>• Physics and engineering</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div className="text-white font-bold text-lg">x²</div>
                    </div>
                    <p className="text-gray-500">Enter base and exponent to calculate the power</p>
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
