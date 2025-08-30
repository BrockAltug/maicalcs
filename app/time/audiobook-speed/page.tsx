"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function AudiobookSpeedCalculatorPage() {
  const [totalHours, setTotalHours] = useState("")
  const [currentSpeed, setCurrentSpeed] = useState("1")
  const [targetSpeed, setTargetSpeed] = useState("1.5")
  const [results, setResults] = useState<{
    originalDuration: number
    newDuration: number
    timeSaved: number
    originalHours: number
    originalMinutes: number
    newHours: number
    newMinutes: number
    savedHours: number
    savedMinutes: number
    speedIncrease: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const formatDuration = (totalMinutes: number): { hours: number; minutes: number; formatted: string } => {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.round(totalMinutes % 60)
    const formatted = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
    return { hours, minutes, formatted }
  }

  const calculateAudiobookSpeed = () => {
    try {
      const hours = Number.parseFloat(totalHours)
      const currentSpeedNum = Number.parseFloat(currentSpeed)
      const targetSpeedNum = Number.parseFloat(targetSpeed)

      if (isNaN(hours) || hours <= 0) {
        alert("Please enter a valid audiobook duration in hours.")
        return
      }

      if (isNaN(currentSpeedNum) || currentSpeedNum <= 0) {
        alert("Please enter a valid current speed.")
        return
      }

      if (isNaN(targetSpeedNum) || targetSpeedNum <= 0) {
        alert("Please enter a valid target speed.")
        return
      }

      // Convert to minutes for easier calculation
      const originalMinutes = hours * 60

      // Calculate actual duration at current speed
      const actualOriginalMinutes = originalMinutes / currentSpeedNum

      // Calculate new duration at target speed
      const newMinutes = actualOriginalMinutes / targetSpeedNum

      // Calculate time saved
      const timeSavedMinutes = originalMinutes - newMinutes

      const original = formatDuration(originalMinutes)
      const newDuration = formatDuration(newMinutes)
      const saved = formatDuration(timeSavedMinutes)

      const speedIncrease = ((targetSpeedNum - currentSpeedNum) / currentSpeedNum) * 100

      setResults({
        originalDuration: originalMinutes,
        newDuration: newMinutes,
        timeSaved: timeSavedMinutes,
        originalHours: original.hours,
        originalMinutes: original.minutes,
        newHours: newDuration.hours,
        newMinutes: newDuration.minutes,
        savedHours: saved.hours,
        savedMinutes: saved.minutes,
        speedIncrease,
        formula: `${hours}h from ${currentSpeedNum}x to ${targetSpeedNum}x`,
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
    setTotalHours("")
    setCurrentSpeed("1")
    setTargetSpeed("1.5")
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
              <Headphones className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Audiobook Speed Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate listening time and time saved when changing audiobook playback speeds with MaiCalcs. Perfect for
              optimizing your audiobook consumption and learning efficiency.
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
                  <span>Audiobook Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="totalHours">Audiobook Duration (hours)</Label>
                  <Input
                    id="totalHours"
                    type="number"
                    placeholder="Enter duration in hours (e.g., 8.5)"
                    value={totalHours}
                    onChange={(e) => setTotalHours(e.target.value)}
                    className="text-lg font-mono"
                    step="0.1"
                    min="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSpeed">Current Speed</Label>
                  <Select value={currentSpeed} onValueChange={setCurrentSpeed}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x (Half Speed)</SelectItem>
                      <SelectItem value="0.75">0.75x (Slow)</SelectItem>
                      <SelectItem value="1">1x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x (Slightly Fast)</SelectItem>
                      <SelectItem value="1.5">1.5x (Fast)</SelectItem>
                      <SelectItem value="1.75">1.75x (Very Fast)</SelectItem>
                      <SelectItem value="2">2x (Double Speed)</SelectItem>
                      <SelectItem value="2.5">2.5x (Ultra Fast)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetSpeed">Target Speed</Label>
                  <Select value={targetSpeed} onValueChange={setTargetSpeed}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x (Half Speed)</SelectItem>
                      <SelectItem value="0.75">0.75x (Slow)</SelectItem>
                      <SelectItem value="1">1x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x (Slightly Fast)</SelectItem>
                      <SelectItem value="1.5">1.5x (Fast)</SelectItem>
                      <SelectItem value="1.75">1.75x (Very Fast)</SelectItem>
                      <SelectItem value="2">2x (Double Speed)</SelectItem>
                      <SelectItem value="2.5">2.5x (Ultra Fast)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Recommended Speeds:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• 1.25x: Comfortable for most listeners</p>
                    <p>• 1.5x: Good balance of speed and comprehension</p>
                    <p>• 2x: For experienced listeners</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 10h book at 1.5x = 6h 40m (3h 20m saved)</p>
                    <p>• 8h book at 2x = 4h (4h saved)</p>
                    <p>• 12h book at 1.25x = 9h 36m (2h 24m saved)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateAudiobookSpeed} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Listening Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">New Duration:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.newHours > 0
                              ? `${results.newHours}h ${results.newMinutes}m`
                              : `${results.newMinutes}m`}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(
                                results.newHours > 0
                                  ? `${results.newHours}h ${results.newMinutes}m`
                                  : `${results.newMinutes}m`,
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
                        <span className="font-medium text-gray-700">Time Saved:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {results.savedHours > 0
                              ? `${results.savedHours}h ${results.savedMinutes}m`
                              : `${results.savedMinutes}m`}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(
                                results.savedHours > 0
                                  ? `${results.savedHours}h ${results.savedMinutes}m`
                                  : `${results.savedMinutes}m`,
                              )
                            }
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Original Duration:</span>
                        <span className="text-xl font-bold text-violet-600 font-mono">
                          {results.originalHours > 0
                            ? `${results.originalHours}h ${results.originalMinutes}m`
                            : `${results.originalMinutes}m`}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Speed Change:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">
                          {currentSpeed}x → {targetSpeed}x
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Speed Increase:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">
                          {results.speedIncrease > 0 ? "+" : ""}
                          {Math.round(results.speedIncrease)}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Time Efficiency:</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">
                          {Math.round((results.timeSaved / results.originalDuration) * 100)}% saved
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• New Duration = Original ÷ Target Speed</p>
                        <p>• Time Saved = Original - New Duration</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Audiobook consumption planning</p>
                        <p>• Learning efficiency optimization</p>
                        <p>• Time management for busy schedules</p>
                        <p>• Educational content consumption</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Headphones className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter audiobook details to calculate listening time and savings</p>
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
