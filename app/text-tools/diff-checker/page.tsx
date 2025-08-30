"use client"

import { useState } from "react"
import { FileText, BookOpen, Info, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { diff_match_patch, DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL } from "diff-match-patch"

export default function DiffCheckerPage() {
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  const [diffResult, setDiffResult] = useState([])

  const handleCompare = () => {
    const dmp = new diff_match_patch()
    const diff = dmp.diff_main(text1, text2)
    dmp.diff_cleanupSemantic(diff)
    setDiffResult(diff)
  }

  const renderDiff = () => {
    return diffResult.map(([type, text], index) => {
      switch (type) {
        case DIFF_INSERT:
          return (
            <ins key={index} className="bg-green-200 text-green-800 no-underline">
              {text}
            </ins>
          )
        case DIFF_DELETE:
          return (
            <del key={index} className="bg-red-200 text-red-800">
              {text}
            </del>
          )
        case DIFF_EQUAL:
          return <span key={index}>{text}</span>
        default:
          return null
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-teal-100 rounded-full">
              <FileText className="w-12 h-12 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Text Difference Checker
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare two pieces of text to instantly see the differences highlighted.
            </p>
          </section>

          <section className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Enter Texts to Compare</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Textarea
                      placeholder="Paste original text here..."
                      className="min-h-[250px] text-base"
                      value={text1}
                      onChange={(e) => setText1(e.target.value)}
                    />
                    <Textarea
                      placeholder="Paste modified text here..."
                      className="min-h-[250px] text-base"
                      value={text2}
                      onChange={(e) => setText2(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleCompare}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6"
                  >
                    Compare Texts
                  </Button>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <Lightbulb className="h-6 w-6 text-green-600 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-green-800">Pro Tip</h4>
                        <p className="text-sm text-green-700">
                          Use this tool to track changes in documents, compare code versions, or check for plagiarism.
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
                  <CardTitle className="text-2xl text-gray-800">Comparison Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[200px] p-4 bg-gray-50 rounded-md border whitespace-pre-wrap text-base">
                    {diffResult.length > 0 ? (
                      renderDiff()
                    ) : (
                      <p className="text-gray-400">Differences will be shown here...</p>
                    )}
                  </div>
                  <div className="flex justify-around mt-4 text-sm">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-200 mr-2 inline-block"></span> Added
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-200 mr-2 inline-block"></span> Deleted
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <Info className="w-6 h-6 text-teal-600" />
                  <CardTitle>About Diff Checker</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    A "diff" tool finds and highlights the differences between two files or blocks of text. It's a
                    fundamental tool in software development and document management.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm">
                <CardHeader className="flex-row items-center gap-4">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                  <CardTitle>How to Use</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>1. Paste the original text in the left box.</p>
                  <p>2. Paste the new or modified text in the right box.</p>
                  <p>3. Click "Compare Texts" to see the result with additions in green and deletions in red.</p>
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
