"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Divide } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function LCDCalculatorPage() {
  const [fractions, setFractions] = useState([
    { numerator: "", denominator: "" },
    { numerator: "", denominator: "" },
  ])
  const [results, setResults] = useState<{
    lcd: number
    convertedFractions: Array<{ numerator: number; denominator: number }>
    steps: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const lcm = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b)
  }

  const calculateLCD = () => {
    try {
      const validFractions = fractions.filter((f) => f.numerator && f.denominator)

      if (validFractions.length < 2) {
        alert("Please enter at least 2 fractions.")
        return
      }

      const denominators = validFractions.map((f) => Number.parseInt(f.denominator))

      if (denominators.some((d) => d <= 0 || isNaN(d))) {
        alert("Please enter valid positive denominators.")
        return
      }

      let lcd = denominators[0]
      for (let i = 1; i < denominators.length; i++) {
        lcd = lcm(lcd, denominators[i])
      }

      const convertedFractions = validFractions.map((f) => ({
        numerator: Number.parseInt(f.numerator) * (lcd / Number.parseInt(f.denominator)),
        denominator: lcd,
      }))

      const steps = [
        `Original fractions: ${validFractions.map((f) => `${f.numerator}/${f.denominator}`).join(", ")}`,
        `Denominators: ${denominators.join(", ")}`,
        `LCD = ${lcd}`,
        `Converted fractions: ${convertedFractions.map((f) => `${f.numerator}/${f.denominator}`).join(", ")}`,
      ]

      setResults({ lcd, convertedFractions, steps })
    } catch (error) {
      alert("Invalid input. Please check your fractions.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addFraction = () => {
    setFractions([...fractions, { numerator: "", denominator: "" }])
  }

  const removeFraction = (index: number) => {
    if (fractions.length > 2) {
      setFractions(fractions.filter((_, i) => i !== index))
    }
  }

  const updateFraction = (index: number, field: "numerator" | "denominator", value: string) => {
    const newFractions = [...fractions]
    newFractions[index][field] = value
    setFractions(newFractions)
  }

  const reset = () => {
    setFractions([
      { numerator: "", denominator: "" },
      { numerator: "", denominator: "" },
    ])
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Divide className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LCD Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Find the Least Common Denominator (LCD) of fractions with MaiCalcs. Perfect for adding and subtracting
              fractions with different denominators.
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
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Fraction Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {fractions.map((fraction, index) => (
                  <div key={index} className="space-y-2">
                    <Label>Fraction {index + 1}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        placeholder="Numerator"
                        value={fraction.numerator}
                        onChange={(e) => updateFraction(index, "numerator", e.target.value)}
                        className="text-lg font-mono"
                      />
                      <span className="text-2xl font-bold text-gray-400">/</span>
                      <Input
                        type="number"
                        placeholder="Denominator"
                        value={fraction.denominator}
                        onChange={(e) => updateFraction(index, "denominator", e.target.value)}
                        className="text-lg font-mono"
                      />
                      {fractions.length > 2 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFraction(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <Button onClick={addFraction} variant="outline" className="w-full bg-transparent">
                  Add Another Fraction
                </Button>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">What is LCD?</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• LCD is the smallest positive integer that is divisible by all denominators</p>
                    <p>• Used to add or subtract fractions with different denominators</p>
                    <p>• Also known as Least Common Multiple (LCM) of denominators</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 1/4 and 1/6: LCD = 12</p>
                    <p>• 2/3 and 3/8: LCD = 24</p>
                    <p>• 1/2, 1/3, 1/4: LCD = 12</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateLCD} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate LCD
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
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <span>LCD Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Least Common Denominator:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.lcd}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.lcd.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Converted Fractions:</h4>
                      <div className="space-y-2">
                        {results.convertedFractions.map((fraction, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Fraction {index + 1}:</span>
                            <span className="text-lg font-bold text-green-600 font-mono">
                              {fraction.numerator}/{fraction.denominator}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Step-by-Step Solution:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {results.steps.map((step, index) => (
                          <p key={index}>• {step}</p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Usage:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Use these converted fractions to add or subtract</p>
                        <p>• All fractions now have the same denominator</p>
                        <p>• Simply add/subtract the numerators</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Divide className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter fractions to find their LCD</p>
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
