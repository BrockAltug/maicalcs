"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function WordsToMinutesCalculatorPage() {
  const [text, setText] = useState("")
  const [wordCount, setWordCount] = useState("")
  const [readingSpeed, setReadingSpeed] = useState("200")
  const [results, setResults] = useState<{
    totalWords: number
    readingTime: number
    speakingTime: number
    readingMinutes: number
    readingSeconds: number
    speakingMinutes: number
    speakingSeconds: number
    wordsPerMinute: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateWordsToMinutes = () => {
    try {
      let totalWords = 0

      if (text.trim()) {
        // Count words from text
        totalWords = text
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length
      } else if (wordCount) {
        // Use manual word count
        totalWords = Number.parseInt(wordCount)
        if (isNaN(totalWords) || totalWords <= 0) {
          alert("Please enter a valid word count.")
          return
        }
      } else {
        alert("Please enter text or word count.")
        return
      }

      const wpm = Number.parseInt(readingSpeed)
      if (isNaN(wpm) || wpm <= 0) {
        alert("Please enter a valid reading speed.")
        return
      }

      // Reading time calculation
      const readingTimeMinutes = totalWords / wpm
      const readingMinutes = Math.floor(readingTimeMinutes)
      const readingSeconds = Math.round((readingTimeMinutes - readingMinutes) * 60)

      // Speaking time (typically slower than reading)
      const speakingWpm = Math.round(wpm * 0.75) // Speaking is about 75% of reading speed
      const speakingTimeMinutes = totalWords / speakingWpm
      const speakingMinutes = Math.floor(speakingTimeMinutes)
      const speakingSecondsCalc = Math.round((speakingTimeMinutes - speakingMinutes) * 60)

      setResults({
        totalWords,
        readingTime: Number(readingTimeMinutes.toFixed(2)),
        speakingTime: Number(speakingTimeMinutes.toFixed(2)),
        readingMinutes,
        readingSeconds,
        speakingMinutes,
        speakingSeconds: speakingSecondsCalc,
        wordsPerMinute: wpm,
        formula: `${totalWords} words at ${wpm} WPM`,
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const formatTime = (minutes: number, seconds: number): string => {
    if (minutes === 0) {
      return `${seconds}s`
    }
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setText("")
    setWordCount("")
    setReadingSpeed("200")
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
              <FileText className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Words to Minutes Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate reading and speaking time based on word count with MaiCalcs. Perfect for presentations,
              speeches, articles, and content planning.
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
                  <span>Text Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="text">Paste Your Text (Optional)</Label>
                  <Textarea
                    id="text"
                    placeholder="Paste your text here to automatically count words..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[120px] text-sm"
                  />
                  {text && (
                    <p className="text-sm text-gray-500">
                      Word count:{" "}
                      {
                        text
                          .trim()
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length
                      }
                    </p>
                  )}
                </div>

                <div className="text-center text-gray-400 font-medium">OR</div>

                <div className="space-y-2">
                  <Label htmlFor="wordCount">Manual Word Count</Label>
                  <Input
                    id="wordCount"
                    type="number"
                    placeholder="Enter number of words"
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                    className="text-lg font-mono"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readingSpeed">Reading Speed (WPM)</Label>
                  <Select value={readingSpeed} onValueChange={setReadingSpeed}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="150">150 WPM (Slow reader)</SelectItem>
                      <SelectItem value="200">200 WPM (Average reader)</SelectItem>
                      <SelectItem value="250">250 WPM (Good reader)</SelectItem>
                      <SelectItem value="300">300 WPM (Fast reader)</SelectItem>
                      <SelectItem value="400">400 WPM (Speed reader)</SelectItem>
                      <SelectItem value="500">500 WPM (Very fast reader)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Reading Speeds:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• Average adult: 200-250 WPM</p>
                    <p>• College student: 250-300 WPM</p>
                    <p>• Speed reader: 400+ WPM</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 500 words at 200 WPM = 2.5 minutes</p>
                    <p>• 1000 words at 250 WPM = 4 minutes</p>
                    <p>• 1500 words at 300 WPM = 5 minutes</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateWordsToMinutes} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <span>Time Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Words:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.totalWords.toLocaleString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.totalWords.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Reading Time:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {formatTime(results.readingMinutes, results.readingSeconds)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(formatTime(results.readingMinutes, results.readingSeconds))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-violet-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Speaking Time:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-violet-600 font-mono">
                            {formatTime(results.speakingMinutes, results.speakingSeconds)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(formatTime(results.speakingMinutes, results.speakingSeconds))}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Reading Speed:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">{results.wordsPerMinute} WPM</span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Reading (decimal):</span>
                        <span className="text-lg font-bold text-emerald-600 font-mono">{results.readingTime} min</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Speaking (decimal):</span>
                        <span className="text-lg font-bold text-amber-600 font-mono">{results.speakingTime} min</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Reading Time = Words ÷ WPM</p>
                        <p>• Speaking Time = Words ÷ (WPM × 0.75)</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Speech and presentation timing</p>
                        <p>• Content planning and scheduling</p>
                        <p>• Reading time estimation</p>
                        <p>• Educational material planning</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter text or word count to calculate reading time</p>
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
