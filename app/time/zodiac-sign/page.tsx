"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ZodiacSignCalculatorPage() {
  const [birthDate, setBirthDate] = useState("")
  const [results, setResults] = useState<{
    zodiacSign: string
    element: string
    quality: string
    rulingPlanet: string
    dateRange: string
    traits: string[]
    compatibility: string[]
    symbol: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const zodiacData = {
    aries: {
      name: "Aries",
      element: "Fire",
      quality: "Cardinal",
      rulingPlanet: "Mars",
      dateRange: "March 21 - April 19",
      traits: ["Energetic", "Confident", "Independent", "Competitive"],
      compatibility: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
      symbol: "♈ Ram",
    },
    taurus: {
      name: "Taurus",
      element: "Earth",
      quality: "Fixed",
      rulingPlanet: "Venus",
      dateRange: "April 20 - May 20",
      traits: ["Reliable", "Patient", "Practical", "Devoted"],
      compatibility: ["Virgo", "Capricorn", "Cancer", "Pisces"],
      symbol: "♉ Bull",
    },
    gemini: {
      name: "Gemini",
      element: "Air",
      quality: "Mutable",
      rulingPlanet: "Mercury",
      dateRange: "May 21 - June 20",
      traits: ["Adaptable", "Curious", "Communicative", "Witty"],
      compatibility: ["Libra", "Aquarius", "Aries", "Leo"],
      symbol: "♊ Twins",
    },
    cancer: {
      name: "Cancer",
      element: "Water",
      quality: "Cardinal",
      rulingPlanet: "Moon",
      dateRange: "June 21 - July 22",
      traits: ["Emotional", "Nurturing", "Intuitive", "Protective"],
      compatibility: ["Scorpio", "Pisces", "Taurus", "Virgo"],
      symbol: "♋ Crab",
    },
    leo: {
      name: "Leo",
      element: "Fire",
      quality: "Fixed",
      rulingPlanet: "Sun",
      dateRange: "July 23 - August 22",
      traits: ["Confident", "Generous", "Creative", "Dramatic"],
      compatibility: ["Aries", "Sagittarius", "Gemini", "Libra"],
      symbol: "♌ Lion",
    },
    virgo: {
      name: "Virgo",
      element: "Earth",
      quality: "Mutable",
      rulingPlanet: "Mercury",
      dateRange: "August 23 - September 22",
      traits: ["Analytical", "Practical", "Helpful", "Perfectionist"],
      compatibility: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
      symbol: "♍ Virgin",
    },
    libra: {
      name: "Libra",
      element: "Air",
      quality: "Cardinal",
      rulingPlanet: "Venus",
      dateRange: "September 23 - October 22",
      traits: ["Diplomatic", "Balanced", "Social", "Artistic"],
      compatibility: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
      symbol: "♎ Scales",
    },
    scorpio: {
      name: "Scorpio",
      element: "Water",
      quality: "Fixed",
      rulingPlanet: "Pluto",
      dateRange: "October 23 - November 21",
      traits: ["Intense", "Passionate", "Mysterious", "Determined"],
      compatibility: ["Cancer", "Pisces", "Virgo", "Capricorn"],
      symbol: "♏ Scorpion",
    },
    sagittarius: {
      name: "Sagittarius",
      element: "Fire",
      quality: "Mutable",
      rulingPlanet: "Jupiter",
      dateRange: "November 22 - December 21",
      traits: ["Adventurous", "Optimistic", "Philosophical", "Independent"],
      compatibility: ["Aries", "Leo", "Libra", "Aquarius"],
      symbol: "♐ Archer",
    },
    capricorn: {
      name: "Capricorn",
      element: "Earth",
      quality: "Cardinal",
      rulingPlanet: "Saturn",
      dateRange: "December 22 - January 19",
      traits: ["Ambitious", "Disciplined", "Responsible", "Patient"],
      compatibility: ["Taurus", "Virgo", "Scorpio", "Pisces"],
      symbol: "♑ Goat",
    },
    aquarius: {
      name: "Aquarius",
      element: "Air",
      quality: "Fixed",
      rulingPlanet: "Uranus",
      dateRange: "January 20 - February 18",
      traits: ["Independent", "Innovative", "Humanitarian", "Eccentric"],
      compatibility: ["Gemini", "Libra", "Aries", "Sagittarius"],
      symbol: "♒ Water Bearer",
    },
    pisces: {
      name: "Pisces",
      element: "Water",
      quality: "Mutable",
      rulingPlanet: "Neptune",
      dateRange: "February 19 - March 20",
      traits: ["Compassionate", "Intuitive", "Artistic", "Dreamy"],
      compatibility: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
      symbol: "♓ Fish",
    },
  }

  const calculateZodiacSign = () => {
    try {
      if (!birthDate) {
        alert("Please enter your birth date.")
        return
      }

      const date = new Date(birthDate)
      const month = date.getMonth() + 1
      const day = date.getDate()

      let sign = ""

      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        sign = "aries"
      } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        sign = "taurus"
      } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        sign = "gemini"
      } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        sign = "cancer"
      } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        sign = "leo"
      } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        sign = "virgo"
      } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        sign = "libra"
      } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        sign = "scorpio"
      } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        sign = "sagittarius"
      } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        sign = "capricorn"
      } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        sign = "aquarius"
      } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
        sign = "pisces"
      }

      if (!sign) {
        alert("Unable to determine zodiac sign for this date.")
        return
      }

      const signData = zodiacData[sign as keyof typeof zodiacData]

      setResults({
        zodiacSign: signData.name,
        element: signData.element,
        quality: signData.quality,
        rulingPlanet: signData.rulingPlanet,
        dateRange: signData.dateRange,
        traits: signData.traits,
        compatibility: signData.compatibility,
        symbol: signData.symbol,
        formula: `Born ${birthDate} = ${signData.name}`,
      })
    } catch (error) {
      alert("Invalid input. Please check your birth date.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setBirthDate("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Star className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Zodiac Sign Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover your zodiac sign, element, traits, and compatibility based on your birth date with MaiCalcs.
              Perfect for astrology enthusiasts and self-discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>Birth Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Zodiac Elements:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Fire: Aries, Leo, Sagittarius</p>
                    <p>• Earth: Taurus, Virgo, Capricorn</p>
                    <p>• Air: Gemini, Libra, Aquarius</p>
                    <p>• Water: Cancer, Scorpio, Pisces</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Qualities:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Cardinal: Leadership, initiation</p>
                    <p>• Fixed: Stability, determination</p>
                    <p>• Mutable: Adaptability, flexibility</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateZodiacSign} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-pink-600" />
                  <span>Your Zodiac Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Zodiac Sign:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.zodiacSign}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.zodiacSign)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Symbol:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.symbol}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.symbol)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Element:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">{results.element}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Quality:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.quality}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Ruling Planet:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">{results.rulingPlanet}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Date Range:</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">{results.dateRange}</span>
                      </div>
                    </div>

                    <div className="bg-rose-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <span className="font-medium text-gray-700">Key Traits:</span>
                        <div className="flex flex-wrap gap-2">
                          {results.traits.map((trait, index) => (
                            <span
                              key={index}
                              className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-sm font-medium"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <span className="font-medium text-gray-700">Compatible Signs:</span>
                        <div className="flex flex-wrap gap-2">
                          {results.compatibility.map((sign, index) => (
                            <span
                              key={index}
                              className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm font-medium"
                            >
                              {sign}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Result:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Based on Western astrology system</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Personal self-discovery</p>
                        <p>• Relationship compatibility</p>
                        <p>• Understanding personality traits</p>
                        <p>• Astrological chart creation</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your birth date to discover your zodiac sign</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner />
      </div>

      <Footer />
    </div>
  )
}
