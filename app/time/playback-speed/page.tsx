"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PlaybackSpeedCalculatorPage() {
  const [originalDuration, setOriginalDuration] = useState("")
  const [playbackSpeed, setPlaybackSpeed] = useState("1.25")
  const [results, setResults] = useState<{
    newDuration: number
    timeSaved: number
    originalMinutes: number
    originalSeconds: number
    newMinutes: number
    newSeconds: number
    timeSavedMinutes: number
    timeSavedSeconds: number
    speedMultiplier: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const parseTimeToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(":").map((part) => Number.parseInt(part))
    if (parts.length === 1) {
      // Just seconds
      return parts[0] || 0
    } else if (parts.length === 2) {
      // MM:SS
      return (parts[0] || 0) * 60 + (parts[1] || 0)
    } else if (parts.length === 3) {
      // HH:MM:SS
      return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0)
    }
    return 0
  }

  const formatTime = (totalSeconds: number): { minutes: number; seconds: number; formatted: string } => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.round(totalSeconds % 60)
    const formatted = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
    return { minutes, seconds, formatted }
  }

  const calculatePlaybackSpeed = () => {
    try {
      if (!originalDuration) {
        alert("Please enter the original duration.")
        return
      }

      const originalSeconds = parseTimeToSeconds(originalDuration)
      const speed = Number.parseFloat(playbackSpeed)

      if (originalSeconds <= 0) {
        alert("Please enter a valid duration.")
        return
      }

      if (isNaN(speed) || speed <= 0) {
        alert("Please enter a valid playback speed.")
        return
      }

      const newDurationSeconds = originalSeconds / speed
      const timeSavedSeconds = originalSeconds - newDurationSeconds

      const originalTime = formatTime(originalSeconds)
      const newTime = formatTime(newDurationSeconds)
      const savedTime = formatTime(timeSavedSeconds)

      setResults({
        newDuration: newDurationSeconds,
        timeSaved: timeSavedSeconds,
        originalMinutes: originalTime.minutes,
        originalSeconds: originalTime.seconds,
        newMinutes: newTime.minutes,
        newSeconds: newTime.seconds,
        timeSavedMinutes: savedTime.minutes,
        timeSavedSeconds: savedTime.seconds,
        speedMultiplier: speed,
        formula: `${originalDuration} at ${speed}x speed`,
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
    setOriginalDuration("")
    setPlaybackSpeed("1.25")
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
              <Play className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Playback Speed Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate new duration and time saved when watching videos at different playback speeds with MaiCalcs.
              Perfect for online learning and video consumption optimization.
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
                  <span>Video Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="originalDuration">Original Duration</Label>
                  <Input
                    id="originalDuration"
                    type="text"
                    placeholder="Enter duration (e.g., 30:00 or 1:30:00)"
                    value={originalDuration}
                    onChange={(e) => setOriginalDuration(e.target.value)}
                    className="text-lg font-mono"
                  />
                  <p className="text-sm text-gray-500">Format: MM:SS or HH:MM:SS or just seconds</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="playbackSpeed">Playback Speed</Label>
                  <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.25">0.25x (Very Slow)</SelectItem>
                      <SelectItem value="0.5">0.5x (Half Speed)</SelectItem>
                      <SelectItem value="0.75">0.75x (Slow)</SelectItem>
                      <SelectItem value="1">1x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x (Slightly Fast)</SelectItem>
                      <SelectItem value="1.5">1.5x (Fast)</SelectItem>
                      <SelectItem value="1.75">1.75x (Very Fast)</SelectItem>
                      <SelectItem value="2">2x (Double Speed)</SelectItem>
                      <SelectItem value="2.5">2.5x (Ultra Fast)</SelectItem>
                      <SelectItem value="3">3x (Maximum)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Popular Speeds:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• 1.25x: Comfortable learning speed</p>
                    <p>• 1.5x: Fast but still clear</p>
                    <p>• 2x: Maximum for comprehension</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 60 min at 1.5x = 40 min (20 min saved)</p>
                    <p>• 30 min at 2x = 15 min (15 min saved)</p>
                    <p>• 90 min at 1.25x = 72 min (18 min saved)</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePlaybackSpeed} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Playback Analysis</span>
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
                            {results.newMinutes > 0
                              ? `${results.newMinutes}m ${results.newSeconds}s`
                              : `${results.newSeconds}s`}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(
                                results.newMinutes > 0
                                  ? `${results.newMinutes}m ${results.newSeconds}s`
                                  : `${results.newSeconds}s`,
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
                            {results.timeSavedMinutes > 0
                              ? `${results.timeSavedMinutes}m ${results.timeSavedSeconds}s`
                              : `${results.timeSavedSeconds}s`}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(
                                results.timeSavedMinutes > 0
                                  ? `${results.timeSavedMinutes}m ${results.timeSavedSeconds}s`
                                  : `${results.timeSavedSeconds}s`,
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
                          {results.originalMinutes > 0
                            ? `${results.originalMinutes}m ${results.originalSeconds}s`
                            : `${results.originalSeconds}s`}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Playback Speed:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.speedMultiplier}x</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Time Efficiency:</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">
                          {Math.round((results.timeSaved / (results.newDuration + results.timeSaved)) * 100)}% saved
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• New Duration = Original ÷ Speed</p>
                        <p>• Time Saved = Original - New Duration</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Online course optimization</p>
                        <p>• Video lecture planning</p>
                        <p>• Content consumption efficiency</p>
                        <p>• Study time management</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Play className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter video duration and playback speed to calculate time savings</p>
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
