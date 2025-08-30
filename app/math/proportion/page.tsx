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

export default function ProportionCalculatorPage() {
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [c, setC] = useState("")
  const [d, setD] = useState("")
  const [results, setResults] = useState<{
    missingValue: number
    missingVariable: string
    proportion: string
    crossProduct: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const solveProportion = () => {
    try {
      const values = [a, b, c, d].map((v) => (v === "" ? null : Number.parseFloat(v)))
      const [valA, valB, valC, valD] = values

      let missingIndex = -1
      let missingCount = 0

      values.forEach((val, index) => {
        if (val === null || isNaN(val as number)) {
          missingIndex = index
          missingCount++
        }
      })

      if (missingCount !== 1) {
        alert("Please enter exactly 3 values and leave 1 field empty.")
        return
      }

      let missingValue: number
      let missingVariable: string
      const variables = ["a", "b", "c", "d"]
      missingVariable = variables[missingIndex]

      // Solve using cross multiplication: a/b = c/d => a*d = b*c
      if (missingIndex === 0) {
        // Missing a
        missingValue = (valB! * valC!) / valD!
      } else if (missingIndex === 1) {
        // Missing b
        missingValue = (valA! * valD!) / valC!
      } else if (missingIndex === 2) {
        // Missing c
        missingValue = (valA! * valD!) / valB!
      } else {
        // Missing d
        missingValue = (valB! * valC!) / valA!
      }

      const finalValues = [...values]
      finalValues[missingIndex] = missingValue

      const proportion = `${finalValues[0]}/${finalValues[1]} = ${finalValues[2]}/${finalValues[3]}`
      const crossProduct = `${finalValues[0]} × ${finalValues[3]} = ${finalValues[1]} × ${finalValues[2]}`

      setResults({
        missingValue: Number.parseFloat(missingValue.toFixed(4)),
        missingVariable,
        proportion,
        crossProduct,
        formula: `Cross multiply: ${a || "?"} × ${d || "?"} = ${b || "?"} × ${c || "?"}`,
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
    setA("")
    setB("")
    setC("")
    setD("")
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
                <div className="text-white font-bold text-lg">=</div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Proportion Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Solve proportions by finding the missing value in a/b = c/d equations with MaiCalcs. Uses cross
              multiplication method with step-by-step solutions.
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
                  <span>Enter Proportion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-center space-x-4 text-2xl">
                    <div className="flex flex-col items-center space-y-2">
                      <Input
                        type="number"
                        placeholder="a"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        className="w-20 text-center text-lg font-mono"
                      />
                      <Label className="text-sm text-gray-600">a</Label>
                    </div>
                    <div className="text-blue-800 font-bold">/</div>
                    <div className="flex flex-col items-center space-y-2">
                      <Input
                        type="number"
                        placeholder="b"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        className="w-20 text-center text-lg font-mono"
                      />
                      <Label className="text-sm text-gray-600">b</Label>
                    </div>
                    <div className="text-blue-800 font-bold">=</div>
                    <div className="flex flex-col items-center space-y-2">
                      <Input
                        type="number"
                        placeholder="c"
                        value={c}
                        onChange={(e) => setC(e.target.value)}
                        className="w-20 text-center text-lg font-mono"
                      />
                      <Label className="text-sm text-gray-600">c</Label>
                    </div>
                    <div className="text-blue-800 font-bold">/</div>
                    <div className="flex flex-col items-center space-y-2">
                      <Input
                        type="number"
                        placeholder="d"
                        value={d}
                        onChange={(e) => setD(e.target.value)}
                        className="w-20 text-center text-lg font-mono"
                      />
                      <Label className="text-sm text-gray-600">d</Label>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Instructions:</strong> Enter exactly 3 values and leave 1 field empty. The calculator will
                    solve for the missing value using cross multiplication.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Proportion Formula:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• a/b = c/d</p>
                    <p>• Cross multiply: a × d = b × c</p>
                    <p>• Solve for the unknown variable</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Example:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Solve: 3/4 = x/12</p>
                    <p>• 3 × 12 = 4 × x</p>
                    <p>• 36 = 4x → x = 9</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={solveProportion} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Solve
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
                  <span>Solution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Missing Value:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">
                            {results.missingVariable} = {results.missingValue}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.missingVariable} = ${results.missingValue}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Final Proportion:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-green-600 font-mono">{results.proportion}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.proportion)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Cross Product Verification:</h4>
                      <div className="text-purple-700 font-mono">{results.crossProduct}</div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Formula Used:</h4>
                      <div className="text-sm text-yellow-700">
                        <p>• {results.formula}</p>
                        <p>
                          • Solve for {results.missingVariable}: {results.missingVariable} = {results.missingValue}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Recipe scaling and cooking</p>
                        <p>• Map scale calculations</p>
                        <p>• Unit rate problems</p>
                        <p>• Similar triangles in geometry</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 opacity-20">
                      <div className="text-white font-bold text-lg">=</div>
                    </div>
                    <p className="text-gray-500">Enter 3 values to solve the proportion</p>
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
