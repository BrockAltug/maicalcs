"use client"

import { useState } from "react"
import { Type, BookOpen, Info, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CaseConverterPage() {
  const [text, setText] = useState("")
  const [convertedText, setConvertedText] = useState("")
  const [caseType, setCaseType] = useState("upperCase")

  const handleConvert = () => {
    let result = text
    switch (caseType) {
      case "upperCase":
        result = text.toUpperCase()
        break
      case "lowerCase":
        result = text.toLowerCase()
        break
      case "titleCase":
        result = text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
        break
      case "sentenceCase":
        result = text.toLowerCase().replace(/(^\w{1}|\.\s*\w{1})/g, (char) => char.toUpperCase())
        break
      default:
        break
    }
    setConvertedText(result)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-teal-100 rounded-full">
              <Type className="w-12 h-12 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Case Converter
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Easily convert text between UPPER CASE, lower case, Title Case, and Sentence case.
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
                    placeholder="Paste your text here to convert its case..."
                    className="min-h-[250px] text-base"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select value={caseType} onValueChange={setCaseType}>
                      <SelectTrigger className="w-full sm:w-[250px]">
                        <SelectValue placeholder="Select Case Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upperCase">UPPER CASE</SelectItem>
                        <SelectItem value="lowerCase">lower case</SelectItem>
                        <SelectItem value="titleCase">Title Case</SelectItem>
                        <SelectItem value="sentenceCase">Sentence case</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleConvert}
                      className="w-full flex-1 bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 sm:py-2"
                    >
                      Convert Case
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <Lightbulb className="h-6 w-6 text-green-600 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800">Pro Tip</h4>
                        <p className="text-sm text-green-700">
                          Use 'Title Case' for headlines and 'Sentence case' for regular text to ensure your writing
                          follows standard capitalization rules.
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
                  <CardTitle className="text-2xl text-gray-800">Converted Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    placeholder="Your converted text will appear here..."
                    className="min-h-[200px] text-base bg-gray-50"
                    value={convertedText}
                  />
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <Info className="w-6 h-6 text-teal-600" />
                  <CardTitle>About Case Converter</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    A case converter is a simple tool that changes the capitalization of text. It's a huge time-saver
                    for correcting case errors or formatting text for specific uses, like titles or headings.
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
                  <p>2. Select the case you want to convert to.</p>
                  <p>3. Click "Convert Case" to see the result.</p>
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
