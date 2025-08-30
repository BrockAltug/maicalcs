"use client"

import { useState } from "react"
import { Scissors, BookOpen, Info, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TextSplitterPage() {
  const [text, setText] = useState("")
  const [splitText, setSplitText] = useState("")
  const [splitType, setSplitType] = useState("line")
  const [customDelimiter, setCustomDelimiter] = useState("")

  const handleSplit = () => {
    let result = []
    switch (splitType) {
      case "line":
        result = text.split(/\r?\n/)
        break
      case "word":
        result = text.split(/\s+/)
        break
      case "custom":
        if (customDelimiter) {
          result = text.split(new RegExp(customDelimiter.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")))
        }
        break
      default:
        break
    }
    setSplitText(result.join("\n"))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-teal-100 rounded-full">
              <Scissors className="w-12 h-12 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Text Splitter
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Split large blocks of text into smaller parts by line, word, or a custom delimiter.
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
                    placeholder="Paste your text here to split..."
                    className="min-h-[250px] text-base"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select value={splitType} onValueChange={setSplitType}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Split by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">New Line</SelectItem>
                        <SelectItem value="word">Word (Space)</SelectItem>
                        <SelectItem value="custom">Custom Delimiter</SelectItem>
                      </SelectContent>
                    </Select>
                    {splitType === "custom" && (
                      <Input
                        placeholder="Enter delimiter"
                        value={customDelimiter}
                        onChange={(e) => setCustomDelimiter(e.target.value)}
                        className="w-full sm:w-[180px]"
                      />
                    )}
                    <Button
                      onClick={handleSplit}
                      className="w-full flex-1 bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 sm:py-2"
                    >
                      Split Text
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <Lightbulb className="h-6 w-6 text-green-600 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800">Pro Tip</h4>
                        <p className="text-sm text-green-700">
                          Use a custom delimiter like "," to split comma-separated values (CSV) data into individual
                          items on new lines.
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
                  <CardTitle className="text-2xl text-gray-800">Split Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    placeholder="Your split text will appear here, with each part on a new line."
                    className="min-h-[200px] text-base bg-gray-50"
                    value={splitText}
                  />
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <Info className="w-6 h-6 text-teal-600" />
                  <CardTitle>About Text Splitter</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    A text splitter breaks down a single string of text into multiple substrings based on a defined
                    separator, or "delimiter".
                  </p>
                  <p>
                    This is incredibly useful for data processing, list creation, and extracting information from
                    unstructured text.
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
                  <p>2. Choose how you want to split the text (by line, word, or a custom character).</p>
                  <p>3. Click "Split Text" to see the result.</p>
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
