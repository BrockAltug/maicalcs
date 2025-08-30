"use client"

import { useState } from "react"
import { Search, BookOpen, Info, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Flesch-Kincaid Grade Level formula
const calculateReadability = (sentences, words, syllables) => {
  if (words === 0 || sentences === 0) return 0
  const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59
  return Math.max(0, grade).toFixed(1)
}

const countSyllables = (word) => {
  word = word.toLowerCase()
  if (word.length <= 3) return 1
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
  word = word.replace(/^y/, "")
  const match = word.match(/[aeiouy]{1,2}/g)
  return match ? match.length : 0
}

export default function TextAnalyzerPage() {
  const [text, setText] = useState("")
  const [result, setResult] = useState({
    readabilityGrade: 0,
    keywordDensity: [],
    sentiment: "Neutral",
  })

  const handleAnalyze = () => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 1
    const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0)

    const readabilityGrade = calculateReadability(sentences, words.length, totalSyllables)

    const wordCounts = words.reduce((acc, word) => {
      if (word.length > 3) {
        // Ignore short words
        acc[word] = (acc[word] || 0) + 1
      }
      return acc
    }, {})

    const keywordDensity = Object.entries(wordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }))

    // Basic sentiment analysis (placeholder)
    const positiveWords = ["good", "great", "excellent", "happy", "love"].length
    const negativeWords = ["bad", "terrible", "sad", "hate"].length
    let sentiment = "Neutral"
    if (positiveWords > negativeWords) sentiment = "Positive"
    if (negativeWords > positiveWords) sentiment = "Negative"

    setResult({ readabilityGrade, keywordDensity, sentiment })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-teal-100 rounded-full">
              <Search className="w-12 h-12 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Text Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gain insights into your text with readability scores, keyword density, and more.
            </p>
          </section>

          <section className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Enter Your Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Textarea
                    placeholder="Paste your text here to analyze..."
                    className="min-h-[250px] text-base"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Button
                    onClick={handleAnalyze}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6"
                  >
                    Analyze Text
                  </Button>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <Lightbulb className="h-6 w-6 text-green-600 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800">Pro Tip</h4>
                        <p className="text-sm text-green-700">
                          Aim for a readability grade of 8-10 for general web content to ensure it's accessible to a
                          wide audience.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Readability (Grade Level)</h4>
                    <div className="p-4 bg-teal-50 rounded-lg text-center">
                      <p className="text-3xl font-bold text-teal-700">{result.readabilityGrade}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Top Keywords</h4>
                    <ul className="space-y-1">
                      {result.keywordDensity.map(({ word, count }) => (
                        <li key={word} className="flex justify-between text-sm bg-gray-100 px-2 py-1 rounded">
                          <span className="text-gray-800">{word}</span>
                          <span className="font-bold text-teal-600">{count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <Info className="w-6 h-6 text-teal-600" />
                  <CardTitle>About Text Analyzer</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    A text analyzer evaluates writing based on various linguistic metrics. It helps writers improve
                    clarity, target the right audience, and optimize for search engines (SEO).
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                  <CardTitle>How to Use</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>1. Paste your text into the input area.</p>
                  <p>2. Click "Analyze Text".</p>
                  <p>
                    3. Review the readability score and keyword density to understand your text's complexity and main
                    topics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
