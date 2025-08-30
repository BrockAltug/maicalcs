"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function SleepCalculatorPage() {
  const [wakeUpTime, setWakeUpTime] = useState("")
  const [bedTime, setBedTime] = useState("")
  const [calculationType, setCalculationType] = useState("bedtime")
  const [results, setResults] = useState<{
    bedtimes: string[]
    wakeUpTimes: string[]
    sleepDuration: string
    sleepCycles: number
    recommendation: string
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const calculateSleepTimes = () => {
    try {
      if (calculationType === "bedtime" && !wakeUpTime) {
        alert("Please enter your wake up time.")
        return
      }

      if (calculationType === "wakeup" && !bedTime) {
        alert("Please enter your bedtime.")
        return
      }

      const sleepCycleDuration = 90 // minutes
      const fallAsleepTime = 15 // minutes to fall asleep
      const recommendedCycles = [5, 6, 4, 3] // in order of preference

      if (calculationType === "bedtime") {
        // Calculate bedtimes based on wake up time
        const [hours, minutes] = wakeUpTime.split(":").map(Number)
        const wakeUp = new Date()
        wakeUp.setHours(hours, minutes, 0, 0)

        const bedtimes: string[] = []

        recommendedCycles.forEach((cycles) => {
          const totalSleepTime = cycles * sleepCycleDuration + fallAsleepTime
          const bedtime = new Date(wakeUp.getTime() - totalSleepTime * 60000)

          // Handle previous day
          if (bedtime.getDate() !== wakeUp.getDate()) {
            bedtime.setDate(bedtime.getDate())
          }

          bedtimes.push(formatTime(bedtime))
        })

        setResults({
          bedtimes,
          wakeUpTimes: [],
          sleepDuration: "",
          sleepCycles: 0,
          recommendation: `For optimal sleep, go to bed at ${bedtimes[0]} (6 cycles) or ${bedtimes[1]} (5 cycles)`,
          formula: `Wake up at ${wakeUpTime} - calculated bedtimes`,
        })
      } else {
        // Calculate wake up times based on bedtime
        const [hours, minutes] = bedTime.split(":").map(Number)
        const bedtime = new Date()
        bedtime.setHours(hours, minutes, 0, 0)

        const wakeUpTimes: string[] = []

        recommendedCycles.forEach((cycles) => {
          const totalSleepTime = cycles * sleepCycleDuration + fallAsleepTime
          const wakeUp = new Date(bedtime.getTime() + totalSleepTime * 60000)

          // Handle next day
          if (wakeUp.getDate() !== bedtime.getDate()) {
            wakeUp.setDate(wakeUp.getDate())
          }

          wakeUpTimes.push(formatTime(wakeUp))
        })

        setResults({
          bedtimes: [],
          wakeUpTimes,
          sleepDuration: "",
          sleepCycles: 0,
          recommendation: `For optimal sleep, wake up at ${wakeUpTimes[1]} (5 cycles) or ${wakeUpTimes[0]} (6 cycles)`,
          formula: `Bedtime at ${bedTime} - calculated wake up times`,
        })
      }
    } catch (error) {
      alert("Invalid input. Please check your time format.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setWakeUpTime("")
    setBedTime("")
    setCalculationType("bedtime")
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
              <Moon className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sleep Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate optimal bedtime and wake up times based on sleep cycles with MaiCalcs. Perfect for improving
              sleep quality and waking up refreshed.
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
                  <span>Sleep Planning</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="calculationType">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bedtime">Calculate Bedtime (I know when to wake up)</SelectItem>
                      <SelectItem value="wakeup">Calculate Wake Up Time (I know when to sleep)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === "bedtime" ? (
                  <div className="space-y-2">
                    <Label htmlFor="wakeUpTime">Wake Up Time</Label>
                    <Input
                      id="wakeUpTime"
                      type="time"
                      value={wakeUpTime}
                      onChange={(e) => setWakeUpTime(e.target.value)}
                      className="text-lg font-mono"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="bedTime">Bedtime</Label>
                    <Input
                      id="bedTime"
                      type="time"
                      value={bedTime}
                      onChange={(e) => setBedTime(e.target.value)}
                      className="text-lg font-mono"
                    />
                  </div>
                )}

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Sleep Cycle Facts:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Each sleep cycle lasts ~90 minutes</p>
                    <p>• 5-6 cycles = 7.5-9 hours (optimal)</p>
                    <p>• Waking between cycles feels more refreshing</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Sleep Recommendations:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Adults: 7-9 hours per night</p>
                    <p>• Teenagers: 8-10 hours per night</p>
                    <p>• Allow 15 minutes to fall asleep</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateSleepTimes} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Sleep Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    {results.bedtimes.length > 0 && (
                      <>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="space-y-2">
                            <span className="font-medium text-gray-700">Recommended Bedtimes:</span>
                            <div className="space-y-2">
                              {results.bedtimes.map((time, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">
                                    {index === 0
                                      ? "6 cycles (9h)"
                                      : index === 1
                                        ? "5 cycles (7.5h)"
                                        : index === 2
                                          ? "4 cycles (6h)"
                                          : "3 cycles (4.5h)"}
                                    :
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-purple-600 font-mono">{time}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyResult(time)}
                                      className="h-8 w-8 p-0"
                                    >
                                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {results.wakeUpTimes.length > 0 && (
                      <>
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="space-y-2">
                            <span className="font-medium text-gray-700">Recommended Wake Up Times:</span>
                            <div className="space-y-2">
                              {results.wakeUpTimes.map((time, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">
                                    {index === 0
                                      ? "6 cycles (9h)"
                                      : index === 1
                                        ? "5 cycles (7.5h)"
                                        : index === 2
                                          ? "4 cycles (6h)"
                                          : "3 cycles (4.5h)"}
                                    :
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-lg font-bold text-green-600 font-mono">{time}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => copyResult(time)}
                                      className="h-8 w-8 p-0"
                                    >
                                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Best Recommendation:</span>
                        <p className="text-lg font-bold text-violet-600 mt-2">{results.recommendation}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Each cycle = 90 minutes</p>
                        <p>• Fall asleep time = 15 minutes</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Sleep Tips:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Maintain consistent sleep schedule</p>
                        <p>• Avoid screens 1 hour before bed</p>
                        <p>• Keep bedroom cool and dark</p>
                        <p>• Avoid caffeine 6 hours before sleep</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Moon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter your sleep schedule to calculate optimal times</p>
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
