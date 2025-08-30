"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Hash, Info, Lightbulb, HelpCircle, Calculator, ArrowRight, HeartPulse } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState("1")
  const [max, setMax] = useState("100")
  const [count, setCount] = useState("10")
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [results, setResults] = useState<number[]>([])
  const [error, setError] = useState("")

  const handleGenerate = () => {
    setError("")
    const minValue = Number.parseInt(min)
    const maxValue = Number.parseInt(max)
    const numCount = Number.parseInt(count)

    if (isNaN(minValue) || isNaN(maxValue) || isNaN(numCount)) {
      setError("Please enter valid numbers for all fields.")
      setResults([])
      return
    }

    if (minValue >= maxValue) {
      setError("Minimum value must be less than maximum value.")
      setResults([])
      return
    }

    if (numCount <= 0) {
      setError("Number of results must be greater than zero.")
      setResults([])
      return
    }

    const range = maxValue - minValue + 1
    if (!allowDuplicates && numCount > range) {
      setError("Cannot generate more unique numbers than the available range.")
      setResults([])
      return
    }

    const generatedNumbers = new Set<number>()
    const resultArray: number[] = []

    if (allowDuplicates) {
      for (let i = 0; i < numCount; i++) {
        const randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
        resultArray.push(randomNum)
      }
    } else {
      while (generatedNumbers.size < numCount) {
        const randomNum = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
        generatedNumbers.add(randomNum)
      }
      resultArray.push(...Array.from(generatedNumbers))
    }

    setResults(resultArray)
  }

  const reset = () => {
    setMin("1")
    setMax("100")
    setCount("10")
    setAllowDuplicates(true)
    setResults([])
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Hash className="h-16 w-16 text-pink-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Random Number Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Instantly generate a set of random numbers within your specified range.
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
                  <Calculator className="h-5 w-5 text-pink-600" />
                  <span>Generator Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-value">Minimum Value</Label>
                    <Input
                      id="min-value"
                      type="number"
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                      placeholder="e.g., 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-value">Maximum Value</Label>
                    <Input
                      id="max-value"
                      type="number"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      placeholder="e.g., 100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="count">Number of Results</Label>
                  <Input
                    id="count"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow-duplicates"
                    checked={allowDuplicates}
                    onCheckedChange={(checked) => setAllowDuplicates(Boolean(checked))}
                  />
                  <Label htmlFor="allow-duplicates" className="font-normal">
                    Allow duplicate numbers
                  </Label>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Pro Tip
                  </h4>
                  <p className="text-sm text-green-700">
                    For statistical analysis, generating a larger set of numbers will often provide a more accurate
                    representation of a true random distribution.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleGenerate} className="flex-1 bg-pink-600 hover:bg-pink-700">
                    <Hash className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5 text-purple-600" />
                    <span>Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results.length > 0 ? (
                    <div className="p-4 bg-pink-50 rounded-lg max-h-40 overflow-y-auto">
                      <p className="text-gray-700 font-mono text-lg text-center break-words">{results.join(", ")}</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated numbers will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-pink-600" />
                    <span>About Random Numbers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    A random number generator is a tool that produces a sequence of numbers that cannot be reasonably
                    predicted. This is essential for simulations, games, cryptography, and statistical sampling.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-pink-600" />
                    <span>How to Use</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-600">
                  <p>1. Set the minimum and maximum values for your desired range.</p>
                  <p>2. Specify how many random numbers you want to generate.</p>
                  <p>3. Choose whether to allow duplicates in the results.</p>
                  <p>4. Click "Generate" to see the outcome.</p>
                </CardContent>
              </Card>
            </div>
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
