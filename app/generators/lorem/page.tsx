"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shuffle, Info, Lightbulb, HelpCircle, Calculator, ArrowRight, HeartPulse, Copy, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const loremWords =
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(
    " ",
  )

export default function LoremIpsumGeneratorPage() {
  const [type, setType] = useState("paragraphs")
  const [count, setCount] = useState("3")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const generateWords = (num: number) => {
    const words = []
    for (let i = 0; i < num; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
    }
    return words.join(" ")
  }

  const generateSentences = (num: number) => {
    const sentences = []
    for (let i = 0; i < num; i++) {
      let sentence = generateWords(Math.floor(Math.random() * 10) + 5)
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + "."
      sentences.push(sentence)
    }
    return sentences.join(" ")
  }

  const generateParagraphs = (num: number) => {
    const paragraphs = []
    for (let i = 0; i < num; i++) {
      paragraphs.push(generateSentences(Math.floor(Math.random() * 5) + 3))
    }
    return paragraphs.join("\n\n")
  }

  const handleGenerate = () => {
    setError("")
    setCopied(false)
    const numCount = Number.parseInt(count)

    if (isNaN(numCount) || numCount <= 0) {
      setError("Please enter a valid number.")
      setResult("")
      return
    }
    if (numCount > 100) {
      setError("You can generate a maximum of 100 units at a time.")
      setResult("")
      return
    }

    let generatedText = ""
    if (type === "paragraphs") {
      generatedText = generateParagraphs(numCount)
    } else if (type === "sentences") {
      generatedText = generateSentences(numCount)
    } else {
      generatedText = generateWords(numCount)
    }
    setResult(generatedText)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const reset = () => {
    setType("paragraphs")
    setCount("3")
    setResult("")
    setError("")
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shuffle className="h-16 w-16 text-pink-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Lorem Ipsum Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Quickly generate placeholder text for your designs and mockups.
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
                    <Label htmlFor="type">Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                        <SelectItem value="sentences">Sentences</SelectItem>
                        <SelectItem value="words">Words</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="count">Amount</Label>
                    <Input
                      id="count"
                      type="number"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      placeholder="e.g., 3"
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
                    Using realistic placeholder text helps stakeholders focus on the layout and design, rather than
                    getting distracted by readable but irrelevant content.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleGenerate} className="flex-1 bg-pink-600 hover:bg-pink-700">
                    <Shuffle className="h-4 w-4 mr-2" />
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
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5 text-purple-600" />
                    <span>Result</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!result}>
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {result ? (
                    <Textarea readOnly value={result} className="h-48 font-serif bg-pink-50" />
                  ) : (
                    <div className="text-center py-12">
                      <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated text will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-pink-600" />
                    <span>About Lorem Ipsum</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Lorem Ipsum is placeholder text commonly used in graphic design and publishing for previewing
                    layouts and visual mockups where the final content is not yet available.
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
                  <p>1. Choose whether you want paragraphs, sentences, or words.</p>
                  <p>2. Specify the amount you need.</p>
                  <p>3. Click "Generate" to create the placeholder content.</p>
                  <p>4. Use the copy button to transfer it to your project.</p>
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
