"use client"

import { useState } from "react"
import { AlignLeft, BookOpen, Info, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function TextFormatterPage() {
  const [text, setText] = useState("")
  const [formattedText, setFormattedText] = useState("")
  const [formatType, setFormatType] = useState("removeExtraSpaces")

  const handleFormat = () => {
    let result = text
    switch (formatType) {
      case "removeExtraSpaces":
        result = text.replace(/\s+/g, " ").trim()
        break
      case "removeLineBreaks":
        result = text
          .replace(/(\r\n|\n|\r)/gm, " ")
          .replace(/\s+/g, " ")
          .trim()
        break
      case "removeSpaces":
        result = text.replace(/\s/g, "")
        break
      case "addBreaksAfterPeriods":
        result = text.replace(/\.\s*/g, ".\n")
        break
      default:
        break
    }
    setFormattedText(result)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-teal-100 rounded-full">
              <AlignLeft className="w-12 h-12 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Text Formatter
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quickly clean up and format your text with a variety of powerful options.
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
                    placeholder="Paste your text here to format..."
                    className="min-h-[250px] text-base"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Select value={formatType} onValueChange={setFormatType}>
                      <SelectTrigger className="w-full sm:w-[250px]">
                        <SelectValue placeholder="Select Format Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="removeExtraSpaces">Remove Extra Spaces</SelectItem>
                        <SelectItem value="removeLineBreaks">Remove All Line Breaks</SelectItem>
                        <SelectItem value="removeSpaces">Remove All Spaces</SelectItem>
                        <SelectItem value="addBreaksAfterPeriods">Add Line Breaks After Periods</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleFormat}
                      className="w-full flex-1 bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 sm:py-2"
                    >
                      Format Text
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <Lightbulb className="h-6 w-6 text-green-600 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800">Pro Tip</h4>
                        <p className="text-sm text-green-700">
                          Use 'Remove All Line Breaks' to convert a multi-line list into a single paragraph, perfect for
                          cleaning up copied text.
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
                  <CardTitle className="text-2xl text-gray-800">Formatted Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    placeholder="Your formatted text will appear here..."
                    className="min-h-[200px] text-base bg-gray-50"
                    value={formattedText}
                  />
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <Info className="w-6 h-6 text-teal-600" />
                  <CardTitle>About Text Formatter</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    A text formatter is a utility that cleans and standardizes text according to predefined rules. It's
                    useful for fixing common formatting issues like inconsistent spacing or line breaks.
                  </p>
                  <p>
                    This tool is perfect for preparing text for publication, data entry, or simply making it more
                    readable.
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
                  <p>2. Select the desired formatting option from the dropdown menu.</p>
                  <p>3. Click "Format Text" to see the result in the "Formatted Text" box.</p>
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
