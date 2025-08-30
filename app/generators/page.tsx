"use client"

import { Shuffle, Key, User, Palette, Hash, Dice1 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const generators = [
  {
    title: "Random Number Generator",
    description: "Generate random numbers within specified ranges",
    icon: Hash,
    href: "/generators/random-number",
    popular: true,
    features: ["Custom Range", "Multiple Numbers", "No Repeats", "Dice Simulator"],
  },
  {
    title: "Password Generator",
    description: "Create secure passwords with customizable options",
    icon: Key,
    href: "/generators/password",
    popular: true,
    features: ["Strong Passwords", "Custom Length", "Special Chars", "Multiple Passwords"],
  },
  {
    title: "Name Generator",
    description: "Generate random names for people, businesses, or projects",
    icon: User,
    href: "/generators/name",
    popular: true,
    features: ["First Names", "Last Names", "Business Names", "Fantasy Names"],
  },
  {
    title: "Color Generator",
    description: "Generate random colors and color palettes",
    icon: Palette,
    href: "/generators/color",
    popular: false,
    features: ["Random Colors", "Color Palettes", "HEX Codes", "RGB Values"],
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for design and development",
    icon: Shuffle,
    href: "/generators/lorem",
    popular: false,
    features: ["Paragraphs", "Words", "Sentences", "Custom Length"],
  },
  {
    title: "Random Choice Picker",
    description: "Make random selections from your custom list",
    icon: Dice1,
    href: "/generators/choice-picker",
    popular: false,
    features: ["Custom Lists", "Multiple Picks", "Weighted Options", "Decision Maker"],
  },
]

export default function GeneratorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />

      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Shuffle className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Generators
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              Generate random numbers, passwords, names, colors, and more with MaiCalcs. Perfect for developers,
              designers, and anyone needing random data.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Generator Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {generators.map((gen) => (
                  <Link
                    key={gen.href}
                    href={gen.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 border border-gray-200 hover:border-pink-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <gen.icon className="h-4 w-4 text-pink-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-pink-700 truncate">
                        {gen.title}
                      </span>
                    </div>
                    {gen.popular && <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></div>}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-pink-100 text-pink-700 px-3 py-1">
                  {generators.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-pink-100 text-pink-700 px-3 py-1">
                  {generators.filter((calc) => calc.popular).length} Popular
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
            {generators.map((gen) => {
              const IconComponent = gen.icon
              return (
                <Link key={gen.href} href={gen.href} className="group">
                  <Card className="calculator-card h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center calculator-icon shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          {gen.popular && (
                            <Badge
                              variant="secondary"
                              className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1"
                            >
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-pink-600 transition-colors duration-300 mb-2">
                          {gen.title}
                        </CardTitle>
                        <CardDescription className="text-small text-gray-600 leading-relaxed flex-1">
                          {gen.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto">
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Features</p>
                          <div className="grid grid-cols-2 gap-2">
                            {gen.features.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0"></div>
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
