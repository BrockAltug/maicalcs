"use client"

import { useState } from "react"
import { Calculator, ArrowRight, GlassWater, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function WaterIntakeCalculatorPage() {
  const [unit, setUnit] = useState("metric")
  const [weight, setWeight] = useState("")
  const [exercise, setExercise] = useState("")
  const [results, setResults] = useState<{ intakeLiters: number; intakeOunces: number } | null>(null)

  const calculateWaterIntake = () => {
    try {
      const weightVal = Number.parseFloat(weight)
      const exerciseVal = Number.parseInt(exercise) || 0

      if (isNaN(weightVal) || weightVal <= 0) {
        alert("Please enter a valid weight.")
        return
      }

      const weightInLbs = unit === "metric" ? weightVal * 2.20462 : weightVal

      // Base intake: 2/3 of body weight in ounces
      const baseIntakeOunces = weightInLbs * (2 / 3)

      // Add 12 oz for every 30 minutes of exercise
      const exerciseIntakeOunces = (exerciseVal / 30) * 12

      const totalIntakeOunces = baseIntakeOunces + exerciseIntakeOunces
      const totalIntakeLiters = totalIntakeOunces * 0.0295735

      setResults({ intakeLiters: totalIntakeLiters, intakeOunces: totalIntakeOunces })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const reset = () => {
    setWeight("")
    setExercise("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <GlassWater className="h-16 w-16 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Daily Water Intake Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Estimate your recommended daily water intake to stay hydrated and healthy.
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
                <div className="space-y-2">
                  <Label>Weight</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 70"
                    />
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">kg</SelectItem>
                        <SelectItem value="imperial">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exercise">Daily Exercise (minutes)</Label>
                  <Input
                    id="exercise"
                    type="number"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    placeholder="e.g., 30"
                  />
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Hydration Formula:</h4>
                  <p className="text-sm text-red-700">Based on weight and exercise duration.</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Hydration Tip:</h4>
                  <p className="text-sm text-green-700">
                    Drink water consistently throughout the day, not just when you feel thirsty. Thirst is a sign you're
                    already dehydrated.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateWaterIntake} className="flex-1 bg-red-600 hover:bg-red-700">
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
                  <span>Your Recommended Intake</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <Label>Daily Water Intake</Label>
                      <p className="text-4xl font-bold text-red-600">{results.intakeLiters.toFixed(1)} L</p>
                      <p className="text-lg font-medium text-red-800">or {results.intakeOunces.toFixed(0)} oz</p>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Factors Affecting Needs:</h4>
                      <p className="text-sm text-gray-700">
                        Your individual needs may vary based on climate, health conditions, and diet. This is an
                        estimate.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Droplets className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your details to estimate your water needs.</p>
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
