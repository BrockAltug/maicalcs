"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Heart, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function IdealWeightCalculatorPage() {
  const [gender, setGender] = useState("male")
  const [unit, setUnit] = useState("metric")
  const [height, setHeight] = useState("")
  const [results, setResults] = useState<{
    robinson: number
    miller: number
    devine: number
    hamwi: number
    bmiRange: { min: number; max: number }
  } | null>(null)

  const calculateIdealWeight = () => {
    try {
      const hCm = unit === "metric" ? Number.parseFloat(height) : Number.parseFloat(height) * 2.54
      const hIn = hCm / 2.54
      const hM = hCm / 100

      if (isNaN(hCm) || hCm <= 0) {
        alert("Please enter a valid height.")
        return
      }

      let robinson, miller, devine, hamwi
      const inchesOver5Feet = hIn > 60 ? hIn - 60 : 0

      if (gender === "male") {
        robinson = 52 + 1.9 * inchesOver5Feet
        miller = 56.2 + 1.41 * inchesOver5Feet
        devine = 50 + 2.3 * inchesOver5Feet
        hamwi = 48 + 2.7 * inchesOver5Feet
      } else {
        robinson = 49 + 1.7 * inchesOver5Feet
        miller = 53.1 + 1.36 * inchesOver5Feet
        devine = 45.5 + 2.3 * inchesOver5Feet
        hamwi = 45.5 + 2.2 * inchesOver5Feet
      }

      const bmiMin = 18.5 * hM * hM
      const bmiMax = 24.9 * hM * hM

      setResults({
        robinson,
        miller,
        devine,
        hamwi,
        bmiRange: { min: bmiMin, max: bmiMax },
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const reset = () => {
    setHeight("")
    setResults(null)
  }

  const formatWeight = (kg: number) => {
    if (unit === "metric") {
      return `${kg.toFixed(1)} kg`
    }
    return `${(kg * 2.20462).toFixed(1)} lbs`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Ideal Weight Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find your ideal weight range based on your height and gender using several common formulas.
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
                  <span>Your Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Units</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (in)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "in"})</Label>
                  <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Formulas Used:</h4>
                  <p className="text-sm text-red-700">Robinson, Miller, Devine, Hamwi, and Healthy BMI Range.</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Health Tip:</h4>
                  <p className="text-sm text-green-700">
                    Ideal weight is a range, not a single number. Focus on overall health, not just the scale.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateIdealWeight} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <span>Your Ideal Weight Range</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <Label>Healthy BMI Weight Range</Label>
                      <p className="text-2xl font-bold text-red-600">
                        {formatWeight(results.bmiRange.min)} - {formatWeight(results.bmiRange.max)}
                      </p>
                      <p className="text-sm font-medium text-red-800">(Based on BMI 18.5-24.9)</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Estimates by Formula</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Robinson:</span> <span className="font-mono">{formatWeight(results.robinson)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Miller:</span> <span className="font-mono">{formatWeight(results.miller)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Devine:</span> <span className="font-mono">{formatWeight(results.devine)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hamwi:</span> <span className="font-mono">{formatWeight(results.hamwi)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your details to find your ideal weight.</p>
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
