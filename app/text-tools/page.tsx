"use client"

import { Type, FileText, AlignLeft, Hash, Search, Scissors } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const textTools = [
  {
    title: "Word Counter",
    description: "Count words, characters, paragraphs, and reading time.",
    icon: Hash,
    href: "/text-tools/word-counter",
    popular: true,
    features: ["Word Count", "Character Count", "Paragraphs", "Reading Time"],
  },
  {
    title: "Text Formatter",
    description: "Format and clean up text with various options.",
    icon: AlignLeft,
    href: "/text-tools/formatter",
    popular: true,
    features: ["Remove Spaces", "Line Breaks", "Clean Text", "Case Options"],
  },
  {
    title: "Case Converter",
    description: "Convert text between different case formats.",
    icon: Type,
    href: "/text-tools/case-converter",
    popular: true,
    features: ["UPPERCASE", "lowercase", "Title Case", "Sentence case"],
  },
  {
    title: "Text Analyzer",
    description: "Analyze text for readability, keywords, and statistics.",
    icon: Search,
    href: "/text-tools/analyzer",
    popular: false,
    features: ["Readability Score", "Keyword Density", "Sentiment", "Statistics"],
  },
  {
    title: "Text Splitter",
    description: "Split text by lines, words, or custom delimiters.",
    icon: Scissors,
    href: "/text-tools/splitter",
    popular: false,
    features: ["Split by Line", "Split by Word", "Custom Delimiter", "Batch Split"],
  },
  {
    title: "Text Diff Checker",
    description: "Compare two texts and highlight differences.",
    icon: FileText,
    href: "/text-tools/diff-checker",
    popular: false,
    features: ["Side-by-Side", "Inline Diff", "Highlight Changes", "Ignore Whitespace"],
  },
]

export default function TextToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <Header />

      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Type className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Text Tools
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              Powerful text manipulation and analysis tools for writers, developers, and content creators. Format,
              analyze, and transform text with ease.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Text Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {textTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 border border-gray-200 hover:border-teal-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <tool.icon className="h-4 w-4 text-teal-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700 truncate">
                        {tool.title}
                      </span>
                    </div>
                    {tool.popular && <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></div>}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 px-3 py-1">
                  {textTools.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-teal-100 text-teal-700 px-3 py-1">
                  {textTools.filter((tool) => tool.popular).length} Popular
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom px-4 mb-16">
        <AdBanner />
      </div>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="calculator-grid">
            {textTools.map((tool) => {
              const IconComponent = tool.icon
              return (
                <Link key={tool.href} href={tool.href} className="group">
                  <Card className="calculator-card h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center calculator-icon shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          {tool.popular && (
                            <Badge
                              variant="secondary"
                              className="bg-cyan-100 text-cyan-700 text-xs font-medium px-2 py-1"
                            >
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-teal-600 transition-colors duration-300 mb-2">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-small text-gray-600 leading-relaxed flex-1">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto">
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Features</p>
                          <div className="grid grid-cols-2 gap-2">
                            {tool.features.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                                <span className="text-xs text-gray-600 leading-tight">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
