"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Scroll } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function RomanNumeralDateConverterPage() {
  const [conversionType, setConversionType] = useState("toRoman")
  const [inputDate, setInputDate] = useState("")
  const [romanDate, setRomanDate] = useState("")
  const [results, setResults] = useState<{
    convertedDate: string
    dayRoman: string
    monthRoman: string
    yearRoman: string
    dayArabic: number
    monthArabic: number
    yearArabic: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const arabicToRoman = (num: number): string => {
    if (num <= 0) return ""

    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const numerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

    let result = ""
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += numerals[i]
        num -= values[i]
      }
    }
    return result
  }

  const romanToArabic = (roman: string): number => {
    if (!roman || roman.trim() === "") return 0

    const cleanRoman = roman.trim().toUpperCase()

    // Validate input contains only valid Roman numeral characters
    if (!/^[IVXLCDM]+$/.test(cleanRoman)) {
      throw new Error("Invalid Roman numeral characters")
    }

    const romanNumerals: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    }

    let result = 0

    for (let i = 0; i < cleanRoman.length; i++) {
      const current = romanNumerals[cleanRoman[i]]
      const next = i + 1 < cleanRoman.length ? romanNumerals[cleanRoman[i + 1]] : 0

      if (current < next) {
        result += next - current
        i++
      } else {
        result += current
      }
    }

    return result
  }

  const convertDate = () => {
    try {
      if (conversionType === "toRoman") {
        if (!inputDate) {
          alert("Please enter a date.")
          return
        }

        const date = new Date(inputDate)
        if (isNaN(date.getTime())) {
          alert("Invalid date format.")
          return
        }

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const dayRoman = arabicToRoman(day)
        const monthRoman = arabicToRoman(month)
        const yearRoman = arabicToRoman(year)

        const convertedDate = `${dayRoman}.${monthRoman}.${yearRoman}`

        setResults({
          convertedDate,
          dayRoman,
          monthRoman,
          yearRoman,
          dayArabic: day,
          monthArabic: month,
          yearArabic: year,
          formula: `${inputDate} → ${convertedDate}`,
        })
      } else {
        if (!romanDate || romanDate.trim() === "") {
          alert("Please enter a Roman numeral date.")
          return
        }

        const parts = romanDate.trim().split(".")
        if (parts.length !== 3) {
          alert("Please use format: DD.MM.YYYY (e.g., XV.VI.MMXXIV)")
          return
        }

        let dayArabic: number
        let monthArabic: number
        let yearArabic: number

        try {
          dayArabic = romanToArabic(parts[0])
          monthArabic = romanToArabic(parts[1])
          yearArabic = romanToArabic(parts[2])

          if (dayArabic === 0 || monthArabic === 0 || yearArabic === 0) {
            alert("Invalid Roman numerals. Please check your input.")
            return
          }
        } catch (error) {
          alert("Invalid Roman numerals. Please check your input.")
          return
        }

        if (dayArabic < 1 || dayArabic > 31) {
          alert("Invalid day value. Day must be between 1 and 31.")
          return
        }

        if (monthArabic < 1 || monthArabic > 12) {
          alert("Invalid month value. Month must be between 1 and 12.")
          return
        }

        if (yearArabic < 1) {
          alert("Invalid year value. Year must be greater than 0.")
          return
        }

        const testDate = new Date(yearArabic, monthArabic - 1, dayArabic)
        if (
          testDate.getDate() !== dayArabic ||
          testDate.getMonth() !== monthArabic - 1 ||
          testDate.getFullYear() !== yearArabic
        ) {
          alert("Invalid date. This date does not exist in the calendar.")
          return
        }

        const convertedDate = `${yearArabic}-${monthArabic.toString().padStart(2, "0")}-${dayArabic.toString().padStart(2, "0")}`

        setResults({
          convertedDate,
          dayRoman: parts[0].trim(),
          monthRoman: parts[1].trim(),
          yearRoman: parts[2].trim(),
          dayArabic,
          monthArabic,
          yearArabic,
          formula: `${romanDate} → ${convertedDate}`,
        })
      }
    } catch (error) {
      alert("An error occurred during conversion. Please check your input.")
    }
  }

  const copyResult = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      const textArea = document.createElement("textarea")
      textArea.value = value
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const reset = () => {
    setInputDate("")
    setRomanDate("")
    setResults(null)
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Scroll className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Roman Numeral Date Converter
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert dates between Arabic numerals and Roman numerals with MaiCalcs. Perfect for historical documents,
              classical studies, and decorative purposes.
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
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>Date Conversion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="conversionType">Conversion Type</Label>
                  <Select value={conversionType} onValueChange={setConversionType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toRoman">Date to Roman Numerals</SelectItem>
                      <SelectItem value="fromRoman">Roman Numerals to Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {conversionType === "toRoman" ? (
                  <div className="space-y-2">
                    <Label htmlFor="inputDate">Date</Label>
                    <Input
                      id="inputDate"
                      type="date"
                      value={inputDate}
                      onChange={(e) => setInputDate(e.target.value)}
                      className="text-lg font-mono"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="romanDate">Roman Numeral Date</Label>
                    <Input
                      id="romanDate"
                      type="text"
                      placeholder="e.g., XV.VI.MMXXIV"
                      value={romanDate}
                      onChange={(e) => setRomanDate(e.target.value.toUpperCase())}
                      className="text-lg font-mono"
                    />
                    <p className="text-sm text-gray-500">Format: DD.MM.YYYY (e.g., XV.VI.MMXXIV for 15.06.2024)</p>
                  </div>
                )}

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Roman Numerals:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• I=1, V=5, X=10, L=50</p>
                    <p>• C=100, D=500, M=1000</p>
                    <p>• Subtractive notation: IV=4, IX=9</p>
                    <p>• Format: Day.Month.Year</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 2024-01-01 → I.I.MMXXIV</p>
                    <p>• 2024-12-25 → XXV.XII.MMXXIV</p>
                    <p>• XV.VI.MMXXIV → 2024-06-15</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={convertDate} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Convert
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-pink-600" />
                  <span>Conversion Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Converted Date:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">{results.convertedDate}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.convertedDate)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Day:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">
                            {conversionType === "toRoman" ? results.dayRoman : results.dayArabic}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyResult(conversionType === "toRoman" ? results.dayRoman : results.dayArabic.toString())
                            }
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Month:</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">
                          {conversionType === "toRoman" ? results.monthRoman : results.monthArabic}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Year:</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">
                          {conversionType === "toRoman" ? results.yearRoman : results.yearArabic}
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="text-center">
                        <span className="font-medium text-gray-700">Complete Breakdown:</span>
                        <div className="mt-2 text-lg font-bold text-emerald-600 font-mono">
                          {conversionType === "toRoman"
                            ? `${results.dayArabic} → ${results.dayRoman} | ${results.monthArabic} → ${results.monthRoman} | ${results.yearArabic} → ${results.yearRoman}`
                            : `${results.dayRoman} → ${results.dayArabic} | ${results.monthRoman} → ${results.monthArabic} | ${results.yearRoman} → ${results.yearArabic}`}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Conversion:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Format: Day.Month.Year</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Historical document dating</p>
                        <p>• Classical studies and research</p>
                        <p>• Decorative inscriptions</p>
                        <p>• Educational purposes</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Scroll className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter a date to convert between Arabic and Roman numerals</p>
                  </div>
                )}
              </CardContent>
            </Card>
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
