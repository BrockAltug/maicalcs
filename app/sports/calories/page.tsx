"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Flame, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function CalorieCalculatorPage() {
  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("1.2")
  const [unit, setUnit] = useState("metric")
  const [results, setResults] = useState<{
    maintenance: number
    mildLoss: number
    loss: number
    mildGain: number
    gain: number
  } | null>(null)

  const calculateCalories = () => {
    try {
      const ageNum = Number.parseInt(age)
      let heightNum = Number.parseFloat(height)
      let weightNum = Number.parseFloat(weight)

      if (isNaN(ageNum) || isNaN(heightNum) || isNaN(weightNum) || ageNum <= 0 || heightNum <= 0 || weightNum <= 0) {
        alert("Please enter valid, positive numbers for all fields.")
        return
      }

      if (unit === "imperial") {
        heightNum = heightNum * 2.54 // inches to cm
        weightNum = weightNum / 2.20462 // lbs to kg
      }

      let bmr
      if (gender === "male") {
        bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
      } else {
        bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
      }

      const tdee = bmr * Number.parseFloat(activityLevel)

      setResults({
        maintenance: Math.round(tdee),
        mildLoss: Math.round(tdee - 250),
        loss: Math.round(tdee - 500),
        mildGain: Math.round(tdee + 250),
        gain: Math.round(tdee + 500),
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const reset = () => {
    setGender("male")
    setAge("")
    setHeight("")
    setWeight("")
    setActivityLevel("1.2")
    setUnit("metric")
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
              Calorie Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate your daily calorie needs to maintain, lose, or gain weight based on your activity level.
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
                    <Label>Unit System</Label>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g., 25"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "in"})</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === "metric" ? "175" : "69"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === "metric" ? "70" : "154"}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="1.375">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                      <SelectItem value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                      <SelectItem value="1.725">Very active (hard exercise/sports 6-7 days a week)</SelectItem>
                      <SelectItem value="1.9">Extra active (very hard exercise/physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Formula Used (Mifflin-St Jeor):</h4>
                  <p className="text-sm text-red-700">
                    Calculates Basal Metabolic Rate (BMR) then multiplies by activity level for Total Daily Energy
                    Expenditure (TDEE).
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={calculateCalories} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <span>Daily Calorie Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <span className="font-medium text-gray-700">Maintenance</span>
                      <p className="text-2xl font-bold text-blue-600 font-mono">{results.maintenance} Calories/day</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <span className="font-medium text-gray-700">Mild Weight Loss</span>
                        <p className="text-xl font-bold text-green-600 font-mono">{results.mildLoss}</p>
                        <p className="text-xs text-green-700">0.25 kg/week</p>
                      </div>
                      <div className="bg-green-100 rounded-lg p-4 text-center">
                        <span className="font-medium text-gray-700">Weight Loss</span>
                        <p className="text-xl font-bold text-green-700 font-mono">{results.loss}</p>
                        <p className="text-xs text-green-800">0.5 kg/week</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <span className="font-medium text-gray-700">Mild Weight Gain</span>
                        <p className="text-xl font-bold text-purple-600 font-mono">{results.mildGain}</p>
                        <p className="text-xs text-purple-700">0.25 kg/week</p>
                      </div>
                      <div className="bg-purple-100 rounded-lg p-4 text-center">
                        <span className="font-medium text-gray-700">Weight Gain</span>
                        <p className="text-xl font-bold text-purple-700 font-mono">{results.gain}</p>
                        <p className="text-xs text-purple-800">0.5 kg/week</p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Disclaimer:</h4>
                      <p className="text-sm text-gray-700">
                        These are estimates. Individual needs may vary. Consult a professional for personalized advice.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Utensils className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your details to estimate your daily calorie needs</p>
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
