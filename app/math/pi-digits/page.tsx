"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Pi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PiDigitsCalculatorPage() {
  const [precision, setPrecision] = useState("")
  const [results, setResults] = useState<{
    piValue: string
    digitCount: number
    facts: string[]
  } | null>(null)
  const [copied, setCopied] = useState(false)

  // Pre-calculated Pi to high precision (first 1000 digits)
  const piDigits =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632788659361533818279682303019520353018529689957736225994138912497217752834791315155748572424541506959508295331168617278558890750983817546374649393192550604009277016711390098488240128583616035637076601047101819429555961989467678374494482553797747268471040475346462080466842590694912933136770289891521047521620569660240580381501935112533824300355876402474964732639141992726042699227967823547816360093417216412199245863150302861829745557067498385054945885869269956909272107975093029553211653449872027559602364806654991198818347977535663698074265425278625518184175746728909777727938000816470600161452491921732172147723501414419735685481613611573525521334757418494684385233239073941433345477624168625189835694855620992192221842725502542568876717904946016746097659798123321047611951126513674598598120"

  const calculatePiDigits = () => {
    const digits = Number.parseInt(precision)

    if (isNaN(digits) || digits < 1 || digits > 1000) {
      return
    }

    // Extract the requested number of digits
    let piValue: string
    if (digits === 1) {
      piValue = "3"
    } else {
      piValue = piDigits.substring(0, digits + 1) // +1 to include the decimal point
    }

    const facts = [
      `π (Pi) is approximately ${piValue}`,
      `You requested ${digits} digit${digits > 1 ? "s" : ""} of precision`,
      "π is an irrational number, meaning it has infinite non-repeating decimal places",
      "π represents the ratio of a circle's circumference to its diameter",
      "The symbol π was first used by Welsh mathematician William Jones in 1706",
      "March 14th (3/14) is celebrated as Pi Day worldwide",
      `The ${digits}${getOrdinalSuffix(digits)} digit of π is ${piValue.replace(".", "").charAt(digits - 1) || "unknown"}`,
      "π appears in many mathematical formulas beyond geometry",
    ]

    setResults({
      piValue,
      digitCount: digits,
      facts,
    })
  }

  const getOrdinalSuffix = (num: number): string => {
    const j = num % 10
    const k = num % 100
    if (j === 1 && k !== 11) return "st"
    if (j === 2 && k !== 12) return "nd"
    if (j === 3 && k !== 13) return "rd"
    return "th"
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setPrecision("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Pi className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pi Digits Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate π (Pi) to your desired precision with MaiCalcs. Get up to 1000 digits of Pi with detailed
              explanations and mathematical facts.
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
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Pi Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="precision">Number of Digits (1-1000)</Label>
                  <Input
                    id="precision"
                    type="number"
                    min="1"
                    max="1000"
                    placeholder="Enter number of digits"
                    value={precision}
                    onChange={(e) => setPrecision(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">About Pi (π):</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <p>• π is the ratio of a circle's circumference to its diameter</p>
                    <p>• It's an irrational number with infinite decimal places</p>
                    <p>• Used in geometry, trigonometry, and physics</p>
                    <p>• March 14th (3/14) is celebrated as Pi Day</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculatePiDigits} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Pi
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
                  <ArrowRight className="h-5 w-5 text-purple-600" />
                  <span>Pi Value</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Pi to {results.digitCount} digits:</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyResult(results.piValue)}
                          className="h-8 w-8 p-0"
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="font-mono text-lg break-all bg-white p-3 rounded border text-blue-600">
                        {results.piValue}
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Precision Details:</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>• Digits requested: {results.digitCount}</p>
                        <p>• Character count: {results.piValue.length}</p>
                        <p>• Last digit: {results.piValue.replace(".", "").charAt(results.digitCount - 1) || "N/A"}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Interesting Facts:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        {results.facts.slice(0, 4).map((fact, index) => (
                          <p key={index}>• {fact}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Pi className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter the number of digits and click "Calculate Pi" to see results</p>
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

      {/* Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">About Pi (π)</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Pi (π) is a mathematical constant that represents the ratio of a circle's circumference to its
                  diameter. It's approximately equal to 3.14159, but it's actually an irrational number with infinite
                  decimal places that never repeat.
                </p>
                <p>
                  Pi has been studied for over 4,000 years. Ancient civilizations like the Babylonians and Egyptians
                  approximated its value. The symbol π was introduced by William Jones in 1706 and popularized by
                  Leonhard Euler.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">How to Use</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Enter the number of digits you want (1-1000)</p>
                <p>• Click "Calculate Pi" to generate the result</p>
                <p>• Copy the Pi value by clicking the copy icon</p>
                <p>• View interesting facts about Pi</p>
                <p>• Use the reset button to start over</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
