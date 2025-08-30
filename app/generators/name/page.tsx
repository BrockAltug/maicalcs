"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Info, Lightbulb, HelpCircle, Calculator, ArrowRight, HeartPulse } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const firstNamesMale = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
]
const firstNamesFemale = [
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
]
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
]

export default function NameGeneratorPage() {
  const [gender, setGender] = useState("any")
  const [count, setCount] = useState("5")
  const [results, setResults] = useState<string[]>([])
  const [error, setError] = useState("")

  const handleGenerate = () => {
    setError("")
    const numCount = Number.parseInt(count)

    if (isNaN(numCount) || numCount <= 0) {
      setError("Please enter a valid number of names to generate.")
      setResults([])
      return
    }
    if (numCount > 100) {
      setError("You can generate a maximum of 100 names at a time.")
      setResults([])
      return
    }

    const generatedNames: string[] = []
    for (let i = 0; i < numCount; i++) {
      let firstName = ""
      if (gender === "male") {
        firstName = firstNamesMale[Math.floor(Math.random() * firstNamesMale.length)]
      } else if (gender === "female") {
        firstName = firstNamesFemale[Math.floor(Math.random() * firstNamesFemale.length)]
      } else {
        const allFirstNames = [...firstNamesMale, ...firstNamesFemale]
        firstName = allFirstNames[Math.floor(Math.random() * allFirstNames.length)]
      }
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
      generatedNames.push(`${firstName} ${lastName}`)
    }
    setResults(generatedNames)
  }

  const reset = () => {
    setGender("any")
    setCount("5")
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
              <User className="h-16 w-16 text-pink-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Name Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Generate random names for characters, projects, or any creative endeavor.
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
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="count">Number of Names</Label>
                    <Input
                      id="count"
                      type="number"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      placeholder="e.g., 5"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Pro Tip
                  </h4>
                  <p className="text-sm text-green-700">
                    Need a name for a fictional character? Generate a few options and pick the one that best fits their
                    personality and background.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleGenerate} className="flex-1 bg-pink-600 hover:bg-pink-700">
                    <User className="h-4 w-4 mr-2" />
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
                      <ul className="space-y-2 text-gray-700 font-mono text-lg text-center">
                        {results.map((name, index) => (
                          <li key={index}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated names will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-pink-600" />
                    <span>About Name Generation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Name generators combine first and last names from curated lists to create realistic-sounding names,
                    perfect for writers, game developers, and creating test data.
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
                  <p>1. Select the desired gender for the first names.</p>
                  <p>2. Enter the number of full names you wish to generate.</p>
                  <p>3. Click "Generate" to see the list of results.</p>
                  <p>4. Run it again for a completely new set of names.</p>
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
