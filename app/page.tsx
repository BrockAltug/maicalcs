"use client"

import {
  Calculator,
  DollarSign,
  Clock,
  Hammer,
  Trophy,
  Zap,
  Shuffle,
  Type,
  Camera,
  TrendingUp,
  Users,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import AdBanner from "@/components/ad-banner"
import Header from "@/components/header"
import Footer from "@/components/footer"

const calculatorCategories = [
  {
    title: "Financial Calculators",
    description: "VAT, interest, discount, and earnings calculators",
    icon: DollarSign,
    href: "/financial",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    borderColor: "border-green-200 hover:border-green-300",
    count: "14 Tools",
    cardClass: "card-financial",
    popular: ["VAT", "Interest", "AdSense", "Discount", "Margin", "Poshmark"],
  },
  {
    title: "Math Calculators",
    description: "Basic math, algebra, geometry, and advanced calculations",
    icon: Calculator,
    href: "/math",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    borderColor: "border-blue-200 hover:border-blue-300",
    count: "56 Tools",
    cardClass: "card-math",
    popular: ["Percentage", "Fractions", "Mean", "Root", "Square Root", "Binary"],
  },
  {
    title: "Time Calculators",
    description: "Date, time, age, and duration calculators",
    icon: Clock,
    href: "/time",
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    borderColor: "border-purple-200 hover:border-purple-300",
    count: "28 Tools",
    cardClass: "card-time",
    popular: ["Age", "Date", "Hours", "Duration", "Sleep", "Time Card"],
  },
  {
    title: "Construction Calculators",
    description: "Building materials, measurements, and project calculators",
    icon: Hammer,
    href: "/construction",
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    borderColor: "border-orange-200 hover:border-orange-300",
    count: "25 Tools",
    cardClass: "card-construction",
    popular: ["Material", "Area", "Volume", "Cost", "Foundation"],
  },
  {
    title: "Sports Calculators",
    description: "Fitness, sports statistics, and performance calculators",
    icon: Trophy,
    href: "/sports",
    color: "bg-gradient-to-br from-red-500 to-pink-500",
    borderColor: "border-red-200 hover:border-red-300",
    count: "9 Tools",
    cardClass: "card-sports",
    popular: ["BMI", "Calorie", "Pace", "Body Fat", "Heart Rate"],
  },
  {
    title: "Other Calculators",
    description: "Specialized calculators for various needs",
    icon: Zap,
    href: "/other",
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
    borderColor: "border-indigo-200 hover:border-indigo-300",
    count: "9 Tools",
    cardClass: "card-other",
    popular: ["Unit", "Percentage", "Ratio", "Grade", "Color", "Energy"],
  },
  {
    title: "Random Generators",
    description: "Generate random numbers, passwords, and more",
    icon: Shuffle,
    href: "/generators",
    color: "bg-gradient-to-br from-pink-500 to-rose-500",
    borderColor: "border-pink-200 hover:border-pink-300",
    count: "6 Tools",
    cardClass: "card-generators",
    popular: ["Number", "Password", "Name", "Color", "Lorem", "Choice"],
  },
  {
    title: "Text Tools",
    description: "Text manipulation, formatting, and analysis tools",
    icon: Type,
    href: "/text-tools",
    color: "bg-gradient-to-br from-teal-500 to-cyan-600",
    borderColor: "border-teal-200 hover:border-teal-300",
    count: "6 Tools",
    cardClass: "card-text",
    popular: ["Word Count", "Format", "Case", "Analyze", "Split", "Diff"],
  },
  {
    title: "AI Solver",
    description: "Solve math problems instantly with a photo",
    icon: Camera,
    href: "/ai-solver",
    color: "bg-gradient-to-br from-purple-600 to-violet-600",
    borderColor: "border-purple-200 hover:border-purple-300",
    specialBadge: "Instant Answers",
    cardClass: "card-ai",
    popular: ["Photo", "Algebra", "Calculus", "Equation", "Solver"],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      {/* Ultra Compact Hero Section */}
      <section className="py-8 px-4">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MaiCalcs - Ultimate Calculator Hub
            </h1>
            <p className="text-base text-gray-600 mb-4 max-w-xl mx-auto">
              Access 135+ calculators, generators, and tools all in one place.
            </p>

            {/* Ultra Compact Stats */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm border border-gray-100">
                <Users className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-semibold text-gray-800">500k+ Users</span>
              </div>
              <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm border border-gray-100">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs font-semibold text-gray-800">99.9% Accuracy</span>
              </div>
              <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm border border-gray-100">
                <Star className="h-3 w-3 text-yellow-600" />
                <span className="text-xs font-semibold text-gray-800">4.9/5 Rating</span>
              </div>
            </div>

            {/* Updated Gradient CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <Link href="/math">
                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Calculator className="h-4 w-4 mr-2" />
                  Start Calculating
                </Button>
              </Link>
              <Link href="/ai-solver">
                <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Camera className="h-4 w-4 mr-2" />
                  Try AI Solver
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container-custom px-4 mb-8">
        <AdBanner />
      </div>

      {/* Calculator Categories - Ultra Compact Grid */}
      <section className="py-8 px-4 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Choose Your Calculator Category</h2>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Explore our comprehensive collection of calculators and tools
            </p>
          </div>

          {/* Ultra Compact 6-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {calculatorCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={index} href={category.href} className="group">
                  <Card
                    className={`calculator-card ${category.cardClass} h-full border-2 ${category.borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  >
                    <div className="calculator-card-content">
                      <CardHeader className="p-3 pb-2">
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div
                            className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center calculator-icon shadow-md`}
                          >
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div className="h-5 flex items-center justify-center">
                            {category.count && (
                              <Badge
                                variant="secondary"
                                className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5"
                              >
                                {category.count}
                              </Badge>
                            )}
                            {category.specialBadge && (
                              <Badge className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-violet-600 text-white px-2 py-1 border-purple-400">
                                {category.specialBadge}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-center leading-tight mt-1">
                          {category.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0">
                        <CardDescription className="text-xs text-gray-600 leading-tight text-center mb-2">
                          {category.description}
                        </CardDescription>
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide text-center">
                            Popular
                          </p>
                          <div className="flex flex-wrap justify-center gap-0.5">
                            {category.popular.map((tool, toolIndex) => (
                              <Badge
                                key={toolIndex}
                                variant="outline"
                                className="text-xs px-1 py-0.5 border-gray-200 text-gray-600 leading-none"
                              >
                                {tool}
                              </Badge>
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

      {/* Updated Featured Tools */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Featured Tools</h3>
            <p className="text-sm text-gray-600">Our most innovative and popular tools</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="calculator-card card-ai group border-2 border-purple-200 hover:border-purple-300 flex flex-col">
              <div className="calculator-card-content flex flex-col flex-grow">
                <CardHeader className="text-center p-4 pb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3 calculator-icon shadow-lg">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 mb-2">AI Photo Equation Solver</CardTitle>
                  <CardDescription className="text-sm text-gray-600 leading-relaxed flex-grow">
                    Snap a photo of any math equation and get instant solutions
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 mt-auto">
                  <Link href="/ai-solver">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Try AI Solver
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>

            <Card className="calculator-card card-generators group border-2 border-pink-200 hover:border-pink-300 flex flex-col">
              <div className="calculator-card-content flex flex-col flex-grow">
                <CardHeader className="text-center p-4 pb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-3 calculator-icon shadow-lg">
                    <Shuffle className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 mb-2">Random Generators</CardTitle>
                  <CardDescription className="text-sm text-gray-600 leading-relaxed flex-grow">
                    Generate random numbers, passwords, names, and more
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 mt-auto">
                  <Link href="/generators">
                    <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-700 hover:from-pink-700 hover:to-rose-800 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Explore Generators
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>

            <Card className="calculator-card card-text group border-2 border-teal-200 hover:border-teal-300 flex flex-col">
              <div className="calculator-card-content flex flex-col flex-grow">
                <CardHeader className="text-center p-4 pb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 calculator-icon shadow-lg">
                    <Type className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 mb-2">Text Tools</CardTitle>
                  <CardDescription className="text-sm text-gray-600 leading-relaxed flex-grow">
                    Powerful text manipulation and analysis tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 mt-auto">
                  <Link href="/text-tools">
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      Explore Text Tools
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container-custom px-4 py-8">
        <AdBanner />
      </div>

      {/* Compact Stats Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl lg:text-3xl font-bold">135+</div>
              <div className="text-blue-100 text-xs lg:text-sm">Calculators & Tools</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl lg:text-3xl font-bold">500k+</div>
              <div className="text-blue-100 text-xs lg:text-sm">Monthly Users</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl lg:text-3xl font-bold">20M+</div>
              <div className="text-blue-100 text-xs lg:text-sm">Calculations Performed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl lg:text-3xl font-bold">99.9%</div>
              <div className="text-blue-100 text-xs lg:text-sm">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
