"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Bed, HeartPulse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function BmrCalculatorPage() {
  const [gender, setGender] = useState("male")
  const [unit, setUnit] = useState("metric")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [results, setResults] = useState<{ bmr: number } | null>(null)

  const calculateBmr = () => {
    try {
      const ageVal = Number.parseInt(age)
      const h = unit === "metric" ? Number.parseFloat(height) : Number.parseFloat(height) * 2.54
      const w = unit === "metric" ? Number.parseFloat(weight) : Number.parseFloat(weight) * 0.453592

      if (isNaN(ageVal) || isNaN(h) || isNaN(w)) {
        alert("Please fill all fields with valid numbers.")
        return
      }

      const bmr = 10 * w + 6.25 * h - 5 * ageVal + (gender === "male" ? 5 : -161)
      setResults({ bmr })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const reset = () => {
    setAge("")
    setWeight("")
    setHeight("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Bed className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              BMR Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your Basal Metabolic Rate (BMR) - the number of calories your body needs to function at rest.
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
                        <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                        <SelectItem value="imperial">Imperial (in, lbs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">BMR Formula (Mifflin-St Jeor):</h4>
                  <p className="text-xs text-red-700">
                    BMR = 10 × weight (kg) + 6.25 × height (cm) - 5 × age (y) + s (male: +5, female: -161)
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Why BMR Matters:</h4>
                  <p className="text-sm text-green-700">
                    Knowing your BMR is the first step in determining your total daily calorie needs (TDEE) for weight
                    management.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateBmr} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <span>Your BMR Result</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <Label>Your Basal Metabolic Rate</Label>
                      <p className="text-4xl font-bold text-red-600">{Math.round(results.bmr)}</p>
                      <p className="text-lg font-medium text-red-800">calories/day</p>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">What this means:</h4>
                      <p className="text-sm text-gray-700">
                        This is the minimum number of calories your body burns at rest to perform basic life-sustaining
                        functions like breathing, circulation, and cell production.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your details to calculate your BMR.</p>
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
