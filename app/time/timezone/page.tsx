"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)", offset: 0 },
  { value: "EST", label: "EST (Eastern Standard Time)", offset: -5 },
  { value: "CST", label: "CST (Central Standard Time)", offset: -6 },
  { value: "MST", label: "MST (Mountain Standard Time)", offset: -7 },
  { value: "PST", label: "PST (Pacific Standard Time)", offset: -8 },
  { value: "GMT", label: "GMT (Greenwich Mean Time)", offset: 0 },
  { value: "CET", label: "CET (Central European Time)", offset: 1 },
  { value: "JST", label: "JST (Japan Standard Time)", offset: 9 },
  { value: "AEST", label: "AEST (Australian Eastern Standard Time)", offset: 10 },
  { value: "IST", label: "IST (India Standard Time)", offset: 5.5 },
]

export default function TimezoneCalculatorPage() {
  const [inputTime, setInputTime] = useState("")
  const [inputDate, setInputDate] = useState("")
  const [fromTimezone, setFromTimezone] = useState("UTC")
  const [toTimezone, setToTimezone] = useState("EST")
  const [results, setResults] = useState<{
    convertedTime: string
    convertedDate: string
    timeDifference: number
    fromOffset: number
    toOffset: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateTimezone = () => {
    try {
      if (!inputTime || !inputDate) {
        alert("Please enter both time and date.")
        return
      }

      const fromTz = timezones.find((tz) => tz.value === fromTimezone)
      const toTz = timezones.find((tz) => tz.value === toTimezone)

      if (!fromTz || !toTz) {
        alert("Invalid timezone selection.")
        return
      }

      // Create date object from input
      const inputDateTime = new Date(`${inputDate}T${inputTime}:00`)

      // Convert to UTC first
      const utcTime = new Date(inputDateTime.getTime() - fromTz.offset * 60 * 60 * 1000)

      // Then convert to target timezone
      const targetTime = new Date(utcTime.getTime() + toTz.offset * 60 * 60 * 1000)

      const convertedTime = targetTime.toTimeString().slice(0, 5)
      const convertedDate = targetTime.toISOString().split("T")[0]
      const timeDifference = toTz.offset - fromTz.offset

      setResults({
        convertedTime,
        convertedDate,
        timeDifference,
        fromOffset: fromTz.offset,
        toOffset: toTz.offset,
        formula: `${inputTime} ${fromTimezone} → ${convertedTime} ${toTimezone}`,
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
    setInputTime("")
    setInputDate("")
    setFromTimezone("UTC")
    setToTimezone("EST")
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
              <Globe className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Timezone Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert time between different timezones with MaiCalcs. Perfect for international meetings, travel
              planning, and global coordination.
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
                  <span>Timezone Conversion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="inputDate">Date</Label>
                  <Input
                    id="inputDate"
                    type="date"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inputTime">Time</Label>
                  <Input
                    id="inputTime"
                    type="time"
                    value={inputTime}
                    onChange={(e) => setInputTime(e.target.value)}
                    className="text-lg font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromTimezone">From Timezone</Label>
                  <Select value={fromTimezone} onValueChange={setFromTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toTimezone">To Timezone</Label>
                  <Select value={toTimezone} onValueChange={setToTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Timezone Features:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Convert between major timezones</p>
                    <p>• Calculate time differences</p>
                    <p>• Handle date changes</p>
                    <p>• UTC offset calculations</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 15:00 UTC → 10:00 EST</p>
                    <p>• 09:00 PST → 18:00 CET</p>
                    <p>• 12:00 JST → 22:00 EST (prev day)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTimezone} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convert
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
                  <span>Conversion Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Converted Time:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.convertedTime}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.convertedTime)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Converted Date:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.convertedDate}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.convertedDate)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Time Difference:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-pink-600 font-mono">
                            {results.timeDifference > 0 ? "+" : ""}
                            {results.timeDifference}h
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.timeDifference}h`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Conversion:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>
                          • From: UTC{results.fromOffset >= 0 ? "+" : ""}
                          {results.fromOffset}
                        </p>
                        <p>
                          • To: UTC{results.toOffset >= 0 ? "+" : ""}
                          {results.toOffset}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• International meeting scheduling</p>
                        <p>• Travel itinerary planning</p>
                        <p>• Global team coordination</p>
                        <p>• Event time announcements</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter time and select timezones to convert</p>
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
