"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function ConcreteBlockCalculatorPage() {
  const [wallLength, setWallLength] = useState("")
  const [wallHeight, setWallHeight] = useState("")
  const [blockSize, setBlockSize] = useState("standard")
  const [openingArea, setOpeningArea] = useState("")
  const [results, setResults] = useState<{
    wallArea: number
    netArea: number
    blocks: number
    mortar: number
    cost: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const blockSizes = {
    standard: { length: 0.4, height: 0.2, cost: 2.5 }, // 40cm x 20cm
    large: { length: 0.6, height: 0.2, cost: 3.5 }, // 60cm x 20cm
    small: { length: 0.2, height: 0.2, cost: 1.5 }, // 20cm x 20cm
  }

  const calculateConcreteBlock = () => {
    try {
      if (!wallLength || !wallHeight) {
        alert("Please enter wall length and height.")
        return
      }

      const length = Number.parseFloat(wallLength)
      const height = Number.parseFloat(wallHeight)
      const openings = openingArea ? Number.parseFloat(openingArea) : 0

      if (length <= 0 || height <= 0 || openings < 0) {
        alert("All values must be positive numbers.")
        return
      }

      const wallArea = length * height
      const netArea = wallArea - openings

      if (netArea <= 0) {
        alert("Opening area cannot be larger than wall area.")
        return
      }

      const block = blockSizes[blockSize as keyof typeof blockSizes]
      const blockArea = block.length * block.height

      // Calculate number of blocks needed (add 5% waste factor)
      const blocks = Math.ceil((netArea / blockArea) * 1.05)

      // Mortar calculation: approximately 0.02 m³ per m² of wall
      const mortar = netArea * 0.02

      // Cost calculation
      const blockCost = blocks * block.cost
      const mortarCost = mortar * 150 // $150 per m³ of mortar
      const cost = blockCost + mortarCost

      setResults({
        wallArea,
        netArea,
        blocks,
        mortar,
        cost,
        formula: `${length}m × ${height}m = ${wallArea.toFixed(2)} m² - ${openings.toFixed(2)} m² openings = ${netArea.toFixed(2)} m²`,
      })
    } catch (error) {
      alert("Invalid input. Please check your values.")
    }
  }

  const copyResult = async (value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    setWallLength("")
    setWallHeight("")
    setBlockSize("standard")
    setOpeningArea("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Building className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Concrete Block Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate concrete blocks needed for walls and structures with MaiCalcs. Perfect for masonry projects and
              construction planning.
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
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span>Wall Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="wallLength">Wall Length (meters)</Label>
                  <Input
                    id="wallLength"
                    type="number"
                    value={wallLength}
                    onChange={(e) => setWallLength(e.target.value)}
                    placeholder="Enter wall length"
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallHeight">Wall Height (meters)</Label>
                  <Input
                    id="wallHeight"
                    type="number"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(e.target.value)}
                    placeholder="Enter wall height"
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="blockSize">Block Size</Label>
                  <Select value={blockSize} onValueChange={setBlockSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (40cm × 20cm)</SelectItem>
                      <SelectItem value="large">Large (60cm × 20cm)</SelectItem>
                      <SelectItem value="small">Small (20cm × 20cm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="openingArea">Opening Area (m²) - Optional</Label>
                  <Input
                    id="openingArea"
                    type="number"
                    value={openingArea}
                    onChange={(e) => setOpeningArea(e.target.value)}
                    placeholder="Enter area of doors/windows"
                    className="text-lg font-mono"
                    step="0.1"
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Block Calculations:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Number of blocks needed</p>
                    <p>• Mortar quantity calculation</p>
                    <p>• Opening deductions</p>
                    <p>• 5% waste factor included</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Block Sizes:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Standard: 40cm × 20cm × 20cm</p>
                    <p>• Large: 60cm × 20cm × 20cm</p>
                    <p>• Small: 20cm × 20cm × 20cm</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateConcreteBlock} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
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
                  <ArrowRight className="h-5 w-5 text-red-600" />
                  <span>Block Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Wall Area:</span>
                        <span className="text-xl font-bold text-orange-600 font-mono">
                          {results.wallArea.toFixed(2)} m²
                        </span>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Net Area:</span>
                        <span className="text-xl font-bold text-green-600 font-mono">
                          {results.netArea.toFixed(2)} m²
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Blocks Needed:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-blue-600 font-mono">{results.blocks} blocks</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.blocks} blocks`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Mortar Volume:</span>
                        <span className="text-xl font-bold text-purple-600 font-mono">
                          {results.mortar.toFixed(3)} m³
                        </span>
                      </div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Estimated Cost:</span>
                        <span className="text-xl font-bold text-emerald-600 font-mono">${results.cost.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation Summary:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Block size: {blockSize}</p>
                        <p>• Includes 5% waste factor</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Retaining wall construction</p>
                        <p>• Building foundation walls</p>
                        <p>• Garden and landscape walls</p>
                        <p>• Commercial masonry projects</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter wall dimensions to calculate blocks needed</p>
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

      <Footer />
    </div>
  )
}
