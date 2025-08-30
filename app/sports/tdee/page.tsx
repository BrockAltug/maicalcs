"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Flame, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const activityLevels = [
  { value: "1.2", label: "Sedentary (little or no exercise)" },
  { value: "1.375", label: "Lightly active (light exercise/sports 1-3 days/week)" },
  { value: "1.55", label: "Moderately active (moderate exercise/sports 3-5 days/week)" },
  { value: "1.725", label: "Very active (hard exercise/sports 6-7 days a week)" },
  { value: "1.9", label: "Extra active (very hard exercise/physical job)" },
]

export default function TdeeCalculatorPage() {
  const [gender, setGender] = useState("male")
  const [unit, setUnit] = useState("metric")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [activity, setActivity] = useState("1.375")
  const [results, setResults] = useState<{
    bmr: number
    tdee: number
  } | null>(null)

  const calculateTdee = () => {
    try {
      const ageVal = Number.parseInt(age)
      const h = unit === "metric" ? Number.parseFloat(height) : Number.parseFloat(height) * 2.54
      const w = unit === "metric" ? Number.parseFloat(weight) : Number.parseFloat(weight) * 0.453592

      if (isNaN(ageVal) || isNaN(h) || isNaN(w)) {
        alert("Please fill all fields with valid numbers.")
        return
      }

      const bmr = 10 * w + 6.25 * h - 5 * ageVal + (gender === "male" ? 5 : -161)
      const tdee = bmr * Number.parseFloat(activity)

      setResults({ bmr, tdee })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const reset = () => {
    setAge("")
    setWeight("")
    setHeight("")
    setActivity("1.375")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Flame className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              TDEE Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate your Total Daily Energy Expenditure (TDEE) to understand your daily calorie needs for weight
              management.
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
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select value={activity} onValueChange={setActivity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {activityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">TDEE Formula:</h4>
                  <p className="text-sm text-red-700">TDEE = BMR × Activity Multiplier</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Nutrition Tip:</h4>
                  <p className="text-sm text-green-700">
                    For weight loss, aim for a 300-500 calorie deficit. For muscle gain, aim for a 300-500 calorie
                    surplus.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTdee} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <span>Your Calorie Needs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <Label>Maintenance Calories (TDEE)</Label>
                      <p className="text-4xl font-bold text-red-600">{Math.round(results.tdee)}</p>
                      <p className="text-lg font-medium text-red-800">calories/day</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Calorie Goals</h4>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Weight Loss:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {Math.round(results.tdee - 500)} cal/day
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium text-gray-700">Weight Gain:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {Math.round(results.tdee + 500)} cal/day
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Basal Metabolic Rate (BMR):</h4>
                      <p className="text-sm text-yellow-700">
                        Your BMR is {Math.round(results.bmr)} calories/day. This is the energy your body needs at rest.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your details to calculate your TDEE.</p>
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
