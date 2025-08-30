"use client"

import { useState } from "react"
import { Calculator, ArrowRight, PersonStanding, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function BodyFatCalculatorPage() {
  const [gender, setGender] = useState("male")
  const [unit, setUnit] = useState("metric")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [results, setResults] = useState<{
    bfp: number
    fatMass: number
    leanMass: number
    category: string
  } | null>(null)

  const calculateBodyFat = () => {
    try {
      const h = unit === "metric" ? Number.parseFloat(height) : Number.parseFloat(height) * 2.54
      const n = unit === "metric" ? Number.parseFloat(neck) : Number.parseFloat(neck) * 2.54
      const w = unit === "metric" ? Number.parseFloat(waist) : Number.parseFloat(waist) * 2.54
      const p = unit === "metric" ? Number.parseFloat(hip) : Number.parseFloat(hip) * 2.54
      const wt = unit === "metric" ? Number.parseFloat(weight) : Number.parseFloat(weight) * 0.453592

      if (isNaN(h) || isNaN(n) || isNaN(w) || isNaN(wt) || (gender === "female" && isNaN(p))) {
        alert("Please fill all required fields with valid numbers.")
        return
      }

      let bfp
      if (gender === "male") {
        bfp = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76
      } else {
        bfp = 163.205 * Math.log10(w + p - n) - 97.684 * Math.log10(h) - 78.387
      }

      if (bfp < 3 || bfp > 70) {
        alert("Calculation resulted in an unrealistic value. Please double-check your measurements.")
        return
      }

      const fatMass = wt * (bfp / 100)
      const leanMass = wt - fatMass

      const getCategory = (bfp: number, gender: string) => {
        if (gender === "male") {
          if (bfp < 6) return "Essential Fat"
          if (bfp < 14) return "Athletes"
          if (bfp < 18) return "Fitness"
          if (bfp < 25) return "Average"
          return "Obese"
        } else {
          if (bfp < 14) return "Essential Fat"
          if (bfp < 21) return "Athletes"
          if (bfp < 25) return "Fitness"
          if (bfp < 32) return "Average"
          return "Obese"
        }
      }

      setResults({
        bfp,
        fatMass,
        leanMass,
        category: getCategory(bfp, gender),
      })
    } catch (error) {
      alert("Invalid input. Please check your measurements.")
    }
  }

  const reset = () => {
    setAge("")
    setWeight("")
    setHeight("")
    setNeck("")
    setWaist("")
    setHip("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <PersonStanding className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Body Fat Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate your body fat percentage using the U.S. Navy method to track your fitness progress.
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
                        <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                        <SelectItem value="imperial">Imperial (in, lbs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "in"})</Label>
                    <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                    <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="neck">Neck ({unit === "metric" ? "cm" : "in"})</Label>
                    <Input id="neck" type="number" value={neck} onChange={(e) => setNeck(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist ({unit === "metric" ? "cm" : "in"})</Label>
                    <Input id="waist" type="number" value={waist} onChange={(e) => setWaist(e.target.value)} />
                  </div>
                </div>
                {gender === "female" && (
                  <div className="space-y-2">
                    <Label htmlFor="hip">Hip ({unit === "metric" ? "cm" : "in"})</Label>
                    <Input id="hip" type="number" value={hip} onChange={(e) => setHip(e.target.value)} />
                  </div>
                )}

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">U.S. Navy Formula:</h4>
                  <p className="text-xs text-red-700">
                    This method uses body measurements to estimate body composition.
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Measurement Tip:</h4>
                  <p className="text-xs text-green-700">
                    For consistency, take measurements in the morning before eating or drinking. Use a flexible tape
                    measure.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateBodyFat} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <span>Your Body Composition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <Label>Body Fat Percentage</Label>
                      <p className="text-4xl font-bold text-red-600">{results.bfp.toFixed(1)}%</p>
                      <p className="text-lg font-medium text-red-800">{results.category}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Fat Mass:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.fatMass.toFixed(1)} {unit === "metric" ? "kg" : "lbs"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium text-gray-700">Lean Mass:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.leanMass.toFixed(1)} {unit === "metric" ? "kg" : "lbs"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your measurements to estimate your body fat.</p>
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
