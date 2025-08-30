"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Dumbbell, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function OneRepMaxCalculatorPage() {
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")
  const [unit, setUnit] = useState("kg")
  const [results, setResults] = useState<{
    oneRepMax: number
    percentages: { p: number; w: number }[]
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateOneRepMax = () => {
    try {
      const w = Number.parseFloat(weight)
      const r = Number.parseInt(reps)

      if (w <= 0 || r <= 0) {
        alert("Weight and reps must be positive numbers.")
        return
      }
      if (r === 1) {
        alert("For 1 rep, your 1RM is simply the weight you lifted.")
        return
      }

      // Using the Brzycki formula
      const orm = w / (1.0278 - 0.0278 * r)
      const formula = `${w}${unit} / (1.0278 - 0.0278 * ${r}) = ${orm.toFixed(1)}${unit}`

      const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50].map((p) => ({
        p,
        w: (orm * p) / 100,
      }))

      setResults({ oneRepMax: orm, percentages, formula })
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
    setWeight("")
    setReps("")
    setUnit("kg")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Dumbbell className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              One Rep Max (1RM) Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate your one-repetition maximum for any lift to gauge your strength and plan your training.
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
                  <Calculator className="h-5 w-5 text-red-600" />
                  <span>Lift Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight Lifted</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 100"
                    />
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger className="w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reps">Repetitions Completed</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="e.g., 5"
                  />
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">1RM Formula (Brzycki):</h4>
                  <p className="text-sm text-red-700">1RM = Weight / (1.0278 - 0.0278 × Reps)</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Training Tip:</h4>
                  <p className="text-sm text-green-700">
                    For best accuracy, use a rep range between 2 and 10. Always prioritize proper form and safety.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateOneRepMax} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <ArrowRight className="h-5 w-5 text-orange-600" />
                  <span>Your 1RM Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Estimated 1RM:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600 font-mono">
                            {results.oneRepMax.toFixed(1)} {unit}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.oneRepMax.toFixed(1))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Training Percentages:</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {results.percentages.map((item) => (
                          <div key={item.p} className="flex justify-between text-sm">
                            <span className="text-green-700">{item.p}%</span>
                            <span className="font-mono text-green-900">
                              {item.w.toFixed(1)} {unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <p className="text-sm text-yellow-700 font-mono">{results.formula}</p>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Measure strength progress over time.</li>
                        <li>Set appropriate weights for training programs.</li>
                        <li>Compare strength levels with others.</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your lift details to estimate your 1RM</p>
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
