"use client"

import { Zap, Footprints, Gauge, Leaf, Circle, ThermometerSun, Flag, Fuel, Coins } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const otherCalculators = [
  {
    title: "Tip Calculator",
    description: "Calculate tip and split the bill between friends.",
    icon: Coins,
    href: "/other/tip-calculator",
    popular: true,
    features: ["Bill Splitting", "Tip Percentage", "Total Amount", "Easy to Use"],
  },
  {
    title: "Stride Length Calculator",
    description: "Determine your stride length from distance and steps.",
    icon: Footprints,
    href: "/other/stride-length",
    popular: true,
    features: ["Distance", "Steps", "Stride Length", "Metric/Imperial"],
  },
  {
    title: "Fuel Cost Calculator",
    description: "Estimate the fuel cost for a trip based on distance.",
    icon: Fuel,
    href: "/other/fuel-cost",
    popular: true,
    features: ["Trip Distance", "Fuel Efficiency", "Gas Price", "Total Cost"],
  },
  {
    title: "Fuel Consumption",
    description: "Calculate your vehicle's fuel efficiency (MPG, L/100km).",
    icon: Gauge,
    href: "/other/fuel-consumption",
    popular: false,
    features: ["MPG", "L/100km", "Distance", "Fuel Used"],
  },
  {
    title: "Pine Straw Coverage",
    description: "Estimate how many pine straw bales you need for an area.",
    icon: Leaf,
    href: "/other/pine-straw-coverage",
    popular: false,
    features: ["Area (sq ft)", "Bale Size", "Coverage Depth", "Bales Needed"],
  },
  {
    title: "Round Pen Calculator",
    description: "Calculate the fencing and area for a round pen.",
    icon: Circle,
    href: "/other/round-pen",
    popular: false,
    features: ["Diameter", "Panels Needed", "Area", "Circumference"],
  },
  {
    title: "Sidewalk Temperature",
    description: "Estimate sidewalk temperature based on air temperature.",
    icon: ThermometerSun,
    href: "/other/sidewalk-temperature",
    popular: false,
    features: ["Air Temp", "Sun Exposure", "Surface Type", "Pet Safety"],
  },
  {
    title: "ACC Fuel Calculator",
    description: "Calculate fuel needed for races in Assetto Corsa.",
    icon: Flag,
    href: "/other/acc-fuel",
    popular: false,
    features: ["Lap Time", "Fuel/Lap", "Race Length", "Fuel Needed"],
  },
]

export default function OtherCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Zap className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Other Calculators
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              A collection of specialized calculators and converters for various needs. Find the perfect tool for any
              task with MaiCalcs.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Specialized Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {otherCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border border-gray-200 hover:border-indigo-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <calc.icon className="h-4 w-4 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 truncate">
                        {calc.title}
                      </span>
                    </div>
                    {calc.popular && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 px-3 py-1">
                  {otherCalculators.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 px-3 py-1">
                  {otherCalculators.filter((calc) => calc.popular).length} Popular
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
            {otherCalculators.map((calc) => {
              const IconComponent = calc.icon
              return (
                <Link key={calc.href} href={calc.href} className="group">
                  <Card className="calculator-card h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center calculator-icon shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          {calc.popular && (
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1"
                            >
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 mb-2">
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
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></div>
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
