"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function StairCalculatorPage() {
  const [totalRise, setTotalRise] = useState("")
  const [totalRun, setTotalRun] = useState("")
  const [treadThickness, setTreadThickness] = useState("32")
  const [results, setResults] = useState<{
    numberOfSteps: number
    risePerStep: number
    runPerStep: number
    stringerLength: number
    totalTreads: number
    codeCompliant: boolean
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateStairs = () => {
    try {
      if (!totalRise || !totalRun) {
        alert("Please enter total rise and total run.")
        return
      }

      const rise = Number.parseFloat(totalRise)
      const run = Number.parseFloat(totalRun)
      const thickness = Number.parseFloat(treadThickness)

      if (rise <= 0 || run <= 0 || thickness <= 0) {
        alert("All values must be positive numbers.")
        return
      }

      // Calculate number of steps (risers) - optimal rise is 17-18cm
      const numberOfSteps = Math.round(rise / 17.5)
      const risePerStep = rise / numberOfSteps
      const runPerStep = run / (numberOfSteps - 1) // One less tread than risers

      // Calculate stringer length using Pythagorean theorem
      const stringerLength = Math.sqrt(Math.pow(rise, 2) + Math.pow(run, 2))

      // Total treads needed
      const totalTreads = numberOfSteps - 1

      // Check code compliance (typical residential codes)
      // Rise: 15-20cm, Run: 25-32cm, Rise + Run should be 43-48cm
      const riseRunSum = risePerStep + runPerStep
      const codeCompliant =
        risePerStep >= 15 &&
        risePerStep <= 20 &&
        runPerStep >= 25 &&
        runPerStep <= 32 &&
        riseRunSum >= 43 &&
        riseRunSum <= 48

      setResults({
        numberOfSteps,
        risePerStep,
        runPerStep,
        stringerLength,
        totalTreads,
        codeCompliant,
        formula: `${numberOfSteps} steps: ${risePerStep.toFixed(1)}cm rise × ${runPerStep.toFixed(1)}cm run`,
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
    setTotalRise("")
    setTotalRun("")
    setTreadThickness("32")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Wrench className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Stair Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Design and calculate stair dimensions and materials with MaiCalcs. Perfect for carpenters and construction
              professionals.
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
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span>Stair Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="totalRise">Total Rise (cm)</Label>
                  <Input
                    id="totalRise"
                    type="number"
                    value={totalRise}
                    onChange={(e) => setTotalRise(e.target.value)}
                    placeholder="Enter total vertical height"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalRun">Total Run (cm)</Label>
                  <Input
                    id="totalRun"
                    type="number"
                    value={totalRun}
                    onChange={(e) => setTotalRun(e.target.value)}
                    placeholder="Enter total horizontal distance"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treadThickness">Tread Thickness (mm)</Label>
                  <Input
                    id="treadThickness"
                    type="number"
                    value={treadThickness}
                    onChange={(e) => setTreadThickness(e.target.value)}
                    placeholder="Enter tread thickness"
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Stair Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Number of steps and risers</p>
                    <p>• Rise and run per step</p>
                    <p>• Stringer length calculation</p>
                    <p>• Building code compliance</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Code Requirements:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Rise: 15-20cm per step</p>
                    <p>• Run: 25-32cm per step</p>
                    <p>• Rise + Run: 43-48cm</p>
                    <p>• Consistent dimensions</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateStairs} className="flex-1 bg-orange-600 hover:bg-orange-700">
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
                  <ArrowRight className="h-5 w-5 text-red-600" />
                  <span>Stair Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Number of Steps:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">{results.numberOfSteps}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.numberOfSteps.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Rise per Step:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.risePerStep.toFixed(1)} cm
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Run per Step:</span>
                        <span className="text-xl font-bold text-blue-600 font-mono">
                          {results.runPerStep.toFixed(1)} cm
                        </span>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Stringer Length:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.stringerLength.toFixed(1)} cm
                        </span>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Treads:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">{results.totalTreads}</span>
                      </div>
                    </div>

                    <div className={`rounded-lg p-4 ${results.codeCompliant ? "bg-emerald-50" : "bg-red-50"}`}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Code Compliant:</span>
                        <span
                          className={`text-xl font-bold font-mono ${results.codeCompliant ? "text-emerald-600" : "text-red-600"}`}
                        >
                          {results.codeCompliant ? "YES" : "NO"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Stringer length: {results.stringerLength.toFixed(1)} cm</p>
                        <p>• Code compliance: {results.codeCompliant ? "Meets standards" : "Review dimensions"}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Staircase construction planning</p>
                        <p>• Building code compliance</p>
                        <p>• Material estimation</p>
                        <p>• Safety and comfort optimization</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter total rise and run to calculate stair dimensions</p>
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
