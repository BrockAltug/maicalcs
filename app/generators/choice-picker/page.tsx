"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dice1, Info, Lightbulb, HelpCircle, Calculator, ArrowRight, HeartPulse } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ChoicePickerPage() {
  const [choices, setChoices] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const handleGenerate = () => {
    setError("")
    const choiceArray = choices
      .split("\n")
      .map((c) => c.trim())
      .filter((c) => c !== "")

    if (choiceArray.length < 2) {
      setError("Please enter at least two choices, each on a new line.")
      setResult("")
      return
    }

    const randomIndex = Math.floor(Math.random() * choiceArray.length)
    setResult(choiceArray[randomIndex])
  }

  const reset = () => {
    setChoices("")
    setResult("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Dice1 className="h-16 w-16 text-pink-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Random Choice Picker
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Can't decide? Let fate choose for you! Enter your options and get a random answer.
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
                  <Label htmlFor="choices">Enter Choices (one per line)</Label>
                  <Textarea
                    id="choices"
                    value={choices}
                    onChange={(e) => setChoices(e.target.value)}
                    placeholder="Pizza&#10;Tacos&#10;Sushi&#10;Burger"
                    className="h-40"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Pro Tip
                  </h4>
                  <p className="text-sm text-green-700">
                    Stuck on a big decision? Break it down into smaller choices and use the picker for each one to
                    clarify the bigger picture.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleGenerate} className="flex-1 bg-pink-600 hover:bg-pink-700">
                    <Dice1 className="h-4 w-4 mr-2" />
                    Pick a Choice
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
                    <span>The Winner Is...</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <div className="flex items-center justify-center h-48 bg-pink-50 rounded-lg">
                      <p className="text-pink-800 font-bold text-3xl text-center break-words p-4">{result}</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">The winning choice will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-pink-600" />
                    <span>About Choice Pickers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    A random choice picker eliminates decision fatigue by making an unbiased selection from a list of
                    options. It's great for choosing a restaurant or picking a giveaway winner.
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
                  <p>1. Type or paste your list of choices into the text box.</p>
                  <p>2. Make sure each choice is on its own line.</p>
                  <p>3. Click "Pick a Choice" to let the generator decide.</p>
                  <p>4. The randomly selected winner will be displayed.</p>
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
