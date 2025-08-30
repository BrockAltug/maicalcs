"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function AgeDifferenceCalculatorPage() {
  const [person1BirthDate, setPerson1BirthDate] = useState("")
  const [person2BirthDate, setPerson2BirthDate] = useState("")
  const [person1Name, setPerson1Name] = useState("Person 1")
  const [person2Name, setPerson2Name] = useState("Person 2")
  const [results, setResults] = useState<{
    ageDifferenceYears: number
    ageDifferenceMonths: number
    ageDifferenceDays: number
    totalDays: number
    totalWeeks: number
    totalMonths: number
    olderPerson: string
    youngerPerson: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateAgeDifference = () => {
    try {
      if (!person1BirthDate || !person2BirthDate) {
        alert("Please enter both birth dates.")
        return
      }

      const date1 = new Date(person1BirthDate)
      const date2 = new Date(person2BirthDate)

      // Determine who is older
      const olderDate = date1 < date2 ? date1 : date2
      const youngerDate = date1 < date2 ? date2 : date1
      const olderPerson = date1 < date2 ? person1Name : person2Name
      const youngerPerson = date1 < date2 ? person2Name : person1Name

      // Calculate age difference
      let years = youngerDate.getFullYear() - olderDate.getFullYear()
      let months = youngerDate.getMonth() - olderDate.getMonth()
      let days = youngerDate.getDate() - olderDate.getDate()

      if (days < 0) {
        months--
        const lastMonth = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0)
        days += lastMonth.getDate()
      }

      if (months < 0) {
        years--
        months += 12
      }

      // Calculate totals
      const totalDays = Math.floor((youngerDate.getTime() - olderDate.getTime()) / (1000 * 60 * 60 * 24))
      const totalWeeks = Math.floor(totalDays / 7)
      const totalMonths = years * 12 + months

      setResults({
        ageDifferenceYears: years,
        ageDifferenceMonths: months,
        ageDifferenceDays: days,
        totalDays,
        totalWeeks,
        totalMonths,
        olderPerson,
        youngerPerson,
        formula: `${olderPerson} (${olderDate.toISOString().split("T")[0]}) vs ${youngerPerson} (${youngerDate.toISOString().split("T")[0]})`,
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setPerson1BirthDate("")
    setPerson2BirthDate("")
    setPerson1Name("Person 1")
    setPerson2Name("Person 2")
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
              <Users className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Age Difference Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate the age difference between two people with MaiCalcs. Perfect for relationships, family
              comparisons, and demographic analysis.
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
                  <span>Age Difference Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="person1Name">First Person Name</Label>
                  <Input
                    id="person1Name"
                    type="text"
                    placeholder="Enter first person's name"
                    value={person1Name}
                    onChange={(e) => setPerson1Name(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="person1BirthDate">First Person Birth Date</Label>
                  <Input
                    id="person1BirthDate"
                    type="date"
                    value={person1BirthDate}
                    onChange={(e) => setPerson1BirthDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="person2Name">Second Person Name</Label>
                  <Input
                    id="person2Name"
                    type="text"
                    placeholder="Enter second person's name"
                    value={person2Name}
                    onChange={(e) => setPerson2Name(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="person2BirthDate">Second Person Birth Date</Label>
                  <Input
                    id="person2BirthDate"
                    type="date"
                    value={person2BirthDate}
                    onChange={(e) => setPerson2BirthDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Age Difference Features:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Exact age difference in years, months, days</p>
                    <p>• Total difference in days and weeks</p>
                    <p>• Identifies older and younger person</p>
                    <p>• Comprehensive breakdown</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Siblings: 3 years 2 months apart</p>
                    <p>• Couples: 5 years 6 months difference</p>
                    <p>• Parent-child: 25 years difference</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateAgeDifference} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Age Difference Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Age Difference:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.ageDifferenceYears}y {results.ageDifferenceMonths}m {results.ageDifferenceDays}d
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(
                                `${results.ageDifferenceYears}y ${results.ageDifferenceMonths}m ${results.ageDifferenceDays}d`,
                              )
                            }
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Days:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.totalDays.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalDays.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Weeks:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-pink-600 font-mono">
                            {results.totalWeeks.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalWeeks.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Months:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.totalMonths}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalMonths.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Older Person:</span>
                        <span className="text-xl font-bold text-indigo-600 font-mono">{results.olderPerson}</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Younger Person:</span>
                        <span className="text-xl font-bold text-emerald-600 font-mono">{results.youngerPerson}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Comparison:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>
                          • {results.olderPerson} is {results.ageDifferenceYears} years, {results.ageDifferenceMonths}{" "}
                          months, {results.ageDifferenceDays} days older
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Relationship age gap analysis</p>
                        <p>• Family member comparisons</p>
                        <p>• Demographic research</p>
                        <p>• Historical figure comparisons</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter birth dates to calculate age difference</p>
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
