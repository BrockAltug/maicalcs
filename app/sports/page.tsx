"use client"

import { Trophy, Activity, Timer, Target, Dumbbell, Zap, Heart, Droplets, Scale, Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const sportsCalculators = [
  {
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index to assess health status.",
    icon: Activity,
    href: "/sports/bmi",
    popular: true,
    features: ["BMI Score", "Health Status", "WHO Categories", "Metric/Imperial"],
  },
  {
    title: "Calorie Calculator",
    description: "Estimate daily calorie needs for weight management.",
    icon: Flame,
    href: "/sports/calories",
    popular: true,
    features: ["Maintenance", "Weight Loss", "Weight Gain", "Activity Level"],
  },
  {
    title: "Pace Calculator",
    description: "Calculate running pace, speed, and predict race times.",
    icon: Timer,
    href: "/sports/pace",
    popular: true,
    features: ["Running Pace", "Race Times", "Split Analysis", "Speed Conversion"],
  },
  {
    title: "Body Fat Calculator",
    description: "Estimate body fat percentage using US Navy method.",
    icon: Target,
    href: "/sports/body-fat",
    popular: false,
    features: ["Navy Method", "Body Composition", "Lean/Fat Mass", "Metric/Imperial"],
  },
  {
    title: "One Rep Max (1RM)",
    description: "Estimate your one-rep maximum for strength training.",
    icon: Dumbbell,
    href: "/sports/one-rep-max",
    popular: true,
    features: ["Brzycki Formula", "Strength Level", "Training Percentages", "Lift Planning"],
  },
  {
    title: "TDEE Calculator",
    description: "Calculate Total Daily Energy Expenditure.",
    icon: Zap,
    href: "/sports/tdee",
    popular: true,
    features: ["Energy Needs", "BMR + Activity", "Macro Split", "Goal Setting"],
  },
  {
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate.",
    icon: Heart,
    href: "/sports/bmr",
    popular: false,
    features: ["Resting Calories", "Mifflin-St Jeor", "Metabolic Rate", "Health Insight"],
  },
  {
    title: "Water Intake",
    description: "Calculate your recommended daily water intake.",
    icon: Droplets,
    href: "/sports/water-intake",
    popular: false,
    features: ["Hydration Needs", "Activity Level", "Climate Factor", "Personalized Goals"],
  },
  {
    title: "Ideal Weight",
    description: "Calculate your ideal body weight with various formulas.",
    icon: Scale,
    href: "/sports/ideal-weight",
    popular: false,
    features: ["Robinson Formula", "Miller Formula", "Devine Formula", "Healthy Range"],
  },
]

export default function SportsCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />

      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Sports & Fitness Calculators
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              Achieve your fitness goals with MaiCalcs comprehensive sports and health calculators. Track performance,
              plan workouts, and monitor your progress.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Fitness Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {sportsCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 border border-gray-200 hover:border-red-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <calc.icon className="h-4 w-4 text-red-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-red-700 truncate">
                        {calc.title}
                      </span>
                    </div>
                    {calc.popular && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-700 px-3 py-1">
                  {sportsCalculators.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-red-100 text-red-700 px-3 py-1">
                  {sportsCalculators.filter((calc) => calc.popular).length} Popular
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom px-4 mb-16">
        <AdBanner />
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="calculator-grid">
            {sportsCalculators.map((calc) => {
              const IconComponent = calc.icon
              return (
                <Link key={calc.href} href={calc.href} className="group">
                  <Card className="calculator-card h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center calculator-icon shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          {calc.popular && (
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1"
                            >
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-red-600 transition-colors duration-300 mb-2">
                          {calc.title}
                        </CardTitle>
                        <CardDescription className="text-small text-gray-600 leading-relaxed flex-1">
                          {calc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto">
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Features</p>
                          <div className="grid grid-cols-2 gap-2">
                            {calc.features.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></div>
                                <span className="text-xs text-gray-600 leading-tight">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
