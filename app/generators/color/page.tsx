"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette, Info, Lightbulb, HelpCircle, Calculator, ArrowRight, HeartPulse, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ColorGeneratorPage() {
  const [count, setCount] = useState("6")
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState("")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const handleGenerate = () => {
    setError("")
    const numCount = Number.parseInt(count)

    if (isNaN(numCount) || numCount <= 0) {
      setError("Please enter a valid number of colors.")
      setResults([])
      return
    }
    if (numCount > 50) {
      setError("You can generate a maximum of 50 colors at a time.")
      setResults([])
      return
    }

    const generatedColors: string[] = []
    for (let i = 0; i < numCount; i++) {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      generatedColors.push(randomColor)
    }
    setResults(generatedColors)
  }

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const reset = () => {
    setCount("6")
    setResults([])
    setError("")
    setCopiedColor(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Palette className="h-16 w-16 text-pink-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Color Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover new color palettes and get inspiration for your design projects.
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
                <div className="space-y-2">
                  <Label htmlFor="count">Number of Colors</Label>
                  <Input
                    id="count"
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="e.g., 6"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Pro Tip
                  </h4>
                  <p className="text-sm text-green-700">
                    Found a color you like? Use an online color tool to find complementary or analogous colors to build
                    a full palette around it.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleGenerate} className="flex-1 bg-pink-600 hover:bg-pink-700">
                    <Palette className="h-4 w-4 mr-2" />
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
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                      {results.map((color, index) => (
                        <div key={index} className="group relative">
                          <div
                            className="w-full h-20 rounded-lg border border-gray-200"
                            style={{ backgroundColor: color }}
                          ></div>
                          <div className="text-center mt-2">
                            <button
                              onClick={() => handleCopy(color)}
                              className="font-mono text-sm text-gray-600 hover:text-pink-600"
                            >
                              {color}
                            </button>
                            {copiedColor === color && <Check className="h-4 w-4 text-green-600 inline-block ml-1" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated colors will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-pink-600" />
                    <span>About Color Codes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Colors on the web are often represented by HEX codes, a six-digit hexadecimal number. This generator
                    creates random HEX codes to give you a wide spectrum of color possibilities.
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
                  <p>1. Enter the number of random colors you want to see.</p>
                  <p>2. Click "Generate" to create a new palette.</p>
                  <p>3. Click the HEX code to copy it to your clipboard.</p>
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
