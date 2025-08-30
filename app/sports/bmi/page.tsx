"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Activity, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState("metric")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [heightIn, setHeightIn] = useState("")
  const [results, setResults] = useState<{
    bmi: number
    category: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateBmi = () => {
    try {
      const h = Number.parseFloat(height)
      const w = Number.parseFloat(weight)
      let bmiValue
      let formula = ""

      if (unit === "metric") {
        if (h <= 0 || w <= 0) {
          alert("Height and weight must be positive numbers.")
          return
        }
        bmiValue = w / (h / 100) ** 2
        formula = `${w}kg / (${h}cm / 100)² = ${bmiValue.toFixed(2)}`
      } else {
        const hIn = Number.parseFloat(heightIn) || 0
        const totalHeightInInches = h * 12 + hIn
        if (totalHeightInInches <= 0 || w <= 0) {
          alert("Height and weight must be positive numbers.")
          return
        }
        bmiValue = (w / totalHeightInInches ** 2) * 703
        formula = `( ${w}lbs / ${totalHeightInInches}in² ) * 703 = ${bmiValue.toFixed(2)}`
      }

      if (bmiValue) {
        let category = ""
        if (bmiValue < 18.5) category = "Underweight"
        else if (bmiValue < 25) category = "Normal weight"
        else if (bmiValue < 30) category = "Overweight"
        else category = "Obesity"

        setResults({ bmi: bmiValue, category, formula })
      }
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
    setHeight("")
    setWeight("")
    setHeightIn("")
    setUnit("metric")
    setResults(null)
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Underweight":
        return "text-blue-600"
      case "Normal weight":
        return "text-green-600"
      case "Overweight":
        return "text-yellow-600"
      case "Obesity":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Activity className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              BMI Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your Body Mass Index (BMI) to assess your weight status relative to your height.
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
                  <span>Your Measurements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (ft, in, lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {unit === "metric" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="height-cm">Height (cm)</Label>
                      <Input
                        id="height-cm"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g., 175"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight-kg">Weight (kg)</Label>
                      <Input
                        id="weight-kg"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 70"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="height-ft">Height (ft)</Label>
                        <Input
                          id="height-ft"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="e.g., 5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height-in">Height (in)</Label>
                        <Input
                          id="height-in"
                          type="number"
                          value={heightIn}
                          onChange={(e) => setHeightIn(e.target.value)}
                          placeholder="e.g., 9"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight-lbs">Weight (lbs)</Label>
                      <Input
                        id="weight-lbs"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g., 154"
                      />
                    </div>
                  </>
                )}

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">BMI Formulas:</h4>
                  <div className="text-sm text-red-700 space-y-1">
                    <p>• Metric: weight (kg) / [height (m)]²</p>
                    <p>• Imperial: 703 × weight (lbs) / [height (in)]²</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Healthy BMI Range:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>
                      A healthy BMI for most adults is between <strong>18.5</strong> and <strong>24.9</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateBmi} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <span>Your BMI Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Your BMI:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-600 font-mono">{results.bmi.toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.bmi.toFixed(2))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Category:</span>
                        <span className={`text-xl font-bold ${getCategoryColor(results.category)}`}>
                          {results.category}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">BMI Categories (WHO):</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>Below 18.5: Underweight</li>
                        <li>18.5 – 24.9: Normal weight</li>
                        <li>25.0 – 29.9: Overweight</li>
                        <li>30.0 and above: Obesity</li>
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Disclaimer:</h4>
                      <p className="text-sm text-gray-700">
                        BMI is a screening tool and does not diagnose body fatness or health. Consult a healthcare
                        provider for a comprehensive assessment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your measurements to calculate your BMI</p>
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
