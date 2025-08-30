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

const zodiacSigns = [
  {
    name: "Aries",
    symbol: "♈",
    element: "Fire",
    dates: "March 21 - April 19",
    traits: ["Energetic", "Confident", "Pioneering", "Independent"],
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
  },
  {
    name: "Taurus",
    symbol: "♉",
    element: "Earth",
    dates: "April 20 - May 20",
    traits: ["Reliable", "Patient", "Practical", "Devoted"],
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
  },
  {
    name: "Gemini",
    symbol: "♊",
    element: "Air",
    dates: "May 21 - June 20",
    traits: ["Adaptable", "Curious", "Communicative", "Witty"],
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
  },
  {
    name: "Cancer",
    symbol: "♋",
    element: "Water",
    dates: "June 21 - July 22",
    traits: ["Emotional", "Nurturing", "Intuitive", "Protective"],
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
  },
  {
    name: "Leo",
    symbol: "♌",
    element: "Fire",
    dates: "July 23 - August 22",
    traits: ["Confident", "Generous", "Creative", "Dramatic"],
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
  },
  {
    name: "Virgo",
    symbol: "♍",
    element: "Earth",
    dates: "August 23 - September 22",
    traits: ["Analytical", "Practical", "Helpful", "Perfectionist"],
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
  },
  {
    name: "Libra",
    symbol: "♎",
    element: "Air",
    dates: "September 23 - October 22",
    traits: ["Diplomatic", "Balanced", "Social", "Artistic"],
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
  },
  {
    name: "Scorpio",
    symbol: "♏",
    element: "Water",
    dates: "October 23 - November 21",
    traits: ["Intense", "Passionate", "Mysterious", "Determined"],
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    dates: "November 22 - December 21",
    traits: ["Adventurous", "Optimistic", "Philosophical", "Independent"],
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,

    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
  },
  {
    name: "Capricorn",
    symbol: "♑",
    element: "Earth",
    dates: "December 22 - January 19",
    traits: ["Ambitious", "Disciplined", "Responsible", "Practical"],
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
  },
  {
    name: "Aquarius",
    symbol: "♒",
    element: "Air",
    dates: "January 20 - February 18",
    traits: ["Independent", "Innovative", "Humanitarian", "Eccentric"],
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
  },
  {
    name: "Pisces",
    symbol: "♓",
    element: "Water",
    dates: "February 19 - March 20",
    traits: ["Compassionate", "Intuitive", "Artistic", "Dreamy"],
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
  },
]

export default function ZodiacSignCalculatorPage() {
  const [birthDate, setBirthDate] = useState("")
  const [results, setResults] = useState<{
    zodiacSign: string
    symbol: string
    element: string
    dates: string
    traits: string[]
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateZodiacSign = () => {
    try {
      if (!birthDate) {
        alert("Please enter your birth date.")
        return
      }

      const date = new Date(birthDate)
      const month = date.getMonth() + 1 // JavaScript months are 0-indexed
      const day = date.getDate()

      if (isNaN(month) || isNaN(day)) {
        alert("Please enter a valid birth date.")
        return
      }

      let zodiacSign = null

      for (const sign of zodiacSigns) {
        // Handle signs that cross year boundary (like Capricorn)
        if (sign.startMonth > sign.endMonth) {
          if (
            (month === sign.startMonth && day >= sign.startDay) ||
            (month === sign.endMonth && day <= sign.endDay) ||
            month > sign.startMonth ||
            month < sign.endMonth
          ) {
            zodiacSign = sign
            break
          }
        } else {
          // Normal signs within the same year
          if (
            (month === sign.startMonth && day >= sign.startDay) ||
            (month === sign.endMonth && day <= sign.endDay) ||
            (month > sign.startMonth && month < sign.endMonth)
          ) {
            zodiacSign = sign
            break
          }
        }
      }

      if (!zodiacSign) {
        alert("Unable to determine zodiac sign. Please check your birth date.")
        return
      }

      setResults({
        zodiacSign: zodiacSign.name,
        symbol: zodiacSign.symbol,
        element: zodiacSign.element,
        dates: zodiacSign.dates,
        traits: zodiacSign.traits,
        formula: `Born on ${birthDate} - ${zodiacSign.name}`,
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
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Zodiac Sign Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find your zodiac sign based on your birth date with MaiCalcs. Discover your astrological sign, element,
              and personality traits.
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
                  <span>Birth Date Input</span>
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
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• March 25 = Aries ♈</p>
                    <p>• July 15 = Cancer ♋</p>
                    <p>• December 1 = Sagittarius ♐</p>
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
                  <ArrowRight className="h-5 w-5 text-violet-600" />
                  <span>Zodiac Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Zodiac Sign:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.zodiacSign} {results.symbol}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.zodiacSign} ${results.symbol}`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Element:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.element}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.element)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Date Range:</span>
                        <span className="text-lg font-bold text-violet-600 font-mono">{results.dates}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="space-y-2">
                        <span className="font-medium text-gray-700">Personality Traits:</span>
                        <div className="grid grid-cols-2 gap-2">
                          {results.traits.map((trait, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <span className="text-sm text-blue-700 font-medium">{trait}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Result:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Birth Date: {birthDate}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Astrological compatibility</p>
                        <p>• Personality insights</p>
                        <p>• Horoscope reading</p>
                        <p>• Self-discovery and reflection</p>
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
