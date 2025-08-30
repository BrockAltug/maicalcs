"use client"

import { useState } from "react"
import { Hash, BookOpen, Info, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function WordCounterPage() {
  const [text, setText] = useState("")
  const [result, setResult] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  })

  const handleCalculate = () => {
    const words = text.match(/\b\w+\b/g)?.length || 0
    const characters = text.length
    const sentences = text.match(/[^.!?]+[.!?]+/g)?.length || 0
    const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "").length || 0
    const readingTime = Math.ceil(words / 200) // Average reading speed of 200 WPM

    setResult({ words, characters, sentences, paragraphs, readingTime })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-teal-100 rounded-full">
              <Hash className="w-12 h-12 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Word Counter
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Instantly count words, characters, sentences, paragraphs, and estimate reading time for any text.
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
                    placeholder="Paste your text here..."
                    className="min-h-[250px] text-base"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6"
                  >
                    Count Words
                  </Button>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <Lightbulb className="h-6 w-6 text-green-600 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800">Pro Tip</h4>
                        <p className="text-sm text-green-700">
                          Use this tool to check if your writing meets specific length requirements for essays,
                          articles, or social media posts.
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
                  <CardTitle className="text-2xl text-gray-800">Results</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <p className="text-3xl font-bold text-teal-700">{result.words}</p>
                    <p className="text-sm text-gray-600">Words</p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <p className="text-3xl font-bold text-teal-700">{result.characters}</p>
                    <p className="text-sm text-gray-600">Characters</p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <p className="text-3xl font-bold text-teal-700">{result.sentences}</p>
                    <p className="text-sm text-gray-600">Sentences</p>
                  </div>
                  <div className="p-4 bg-teal-50 rounded-lg">
                    <p className="text-3xl font-bold text-teal-700">{result.paragraphs}</p>
                    <p className="text-sm text-gray-600">Paragraphs</p>
                  </div>
                  <div className="col-span-2 p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-700">~{result.readingTime} min</p>
                    <p className="text-sm text-gray-600">Reading Time</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <Info className="w-6 h-6 text-teal-600" />
                  <CardTitle>About Word Counter</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    A word counter is an essential tool for anyone who works with text. It provides key metrics to help
                    you understand and refine your writing.
                  </p>
                  <p>
                    It's widely used by writers, students, editors, and marketers to ensure content meets specific
                    guidelines and is easy to read.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                  <CardTitle>How to Use</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>1. Type or paste your text into the text area.</p>
                  <p>2. Click the "Count Words" button.</p>
                  <p>
                    3. The results will instantly appear in the "Results" card, showing a detailed breakdown of your
                    text's statistics.
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
