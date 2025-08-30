"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function TileCalculatorPage() {
  const [roomLength, setRoomLength] = useState("")
  const [roomWidth, setRoomWidth] = useState("")
  const [tileLength, setTileLength] = useState("")
  const [tileWidth, setTileWidth] = useState("")
  const [unit, setUnit] = useState("meters")
  const [wastage, setWastage] = useState("10")
  const [pricePerTile, setPricePerTile] = useState("")
  const [results, setResults] = useState<{
    tilesNeeded: number
    tilesWithWastage: number
    totalCost: number
    roomArea: number
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const unitConversions = {
    meters: 1,
    feet: 0.3048,
    inches: 0.0254,
    centimeters: 0.01,
  }

  const calculateTiles = () => {
    try {
      if (!roomLength || !roomWidth || !tileLength || !tileWidth) {
        alert("Please fill in all dimension fields.")
        return
      }

      const rl = Number.parseFloat(roomLength)
      const rw = Number.parseFloat(roomWidth)
      const tl = Number.parseFloat(tileLength)
      const tw = Number.parseFloat(tileWidth)
      const waste = Number.parseFloat(wastage) || 0
      const price = Number.parseFloat(pricePerTile) || 0

      if (rl <= 0 || rw <= 0 || tl <= 0 || tw <= 0) {
        alert("All dimensions must be positive numbers.")
        return
      }

      const conversion = unitConversions[unit as keyof typeof unitConversions]
      const roomArea = rl * conversion * (rw * conversion)
      const tileArea = tl * conversion * (tw * conversion)

      if (tileArea === 0) {
        alert("Tile area cannot be zero.")
        return
      }

      const tilesNeeded = Math.ceil(roomArea / tileArea)
      const tilesWithWastage = Math.ceil(tilesNeeded * (1 + waste / 100))
      const totalCost = tilesWithWastage * price

      setResults({
        tilesNeeded,
        tilesWithWastage,
        totalCost,
        roomArea,
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
    setRoomLength("")
    setRoomWidth("")
    setTileLength("")
    setTileWidth("")
    setUnit("meters")
    setWastage("10")
    setPricePerTile("")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <LayoutGrid className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Tile Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Plan your flooring project perfectly by calculating the exact number of tiles and estimated cost.
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
                  <Calculator className="h-5 w-5 text-orange-600" />
                  <span>Project Dimensions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meters">Meters</SelectItem>
                      <SelectItem value="feet">Feet</SelectItem>
                      <SelectItem value="inches">Inches</SelectItem>
                      <SelectItem value="centimeters">Centimeters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Room Dimensions ({unit})</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                      placeholder="Length"
                      className="text-lg font-mono"
                    />
                    <Input
                      type="number"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                      placeholder="Width"
                      className="text-lg font-mono"
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Tile Dimensions ({unit})</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="number"
                      value={tileLength}
                      onChange={(e) => setTileLength(e.target.value)}
                      placeholder="Length"
                      className="text-lg font-mono"
                    />
                    <Input
                      type="number"
                      value={tileWidth}
                      onChange={(e) => setTileWidth(e.target.value)}
                      placeholder="Width"
                      className="text-lg font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wastage">Wastage (%)</Label>
                    <Input
                      id="wastage"
                      type="number"
                      value={wastage}
                      onChange={(e) => setWastage(e.target.value)}
                      className="text-lg font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Tile ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={pricePerTile}
                      onChange={(e) => setPricePerTile(e.target.value)}
                      placeholder="Optional"
                      className="text-lg font-mono"
                    />
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Calculations Provided:</h4>
                  <div className="text-sm text-orange-700 space-y-1">
                    <p>• Total tiles needed (with wastage)</p>
                    <p>• Total project area</p>
                    <p>• Estimated cost</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Standard Wastage:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Simple layout: 5-10%</p>
                    <p>• Diagonal/complex layout: 15-20%</p>
                    <p>• Large format tiles: 15%</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateTiles} className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate
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
                  <ArrowRight className="h-5 w-5 text-red-600" />
                  <span>Tile Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Tiles (with wastage):</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-600 font-mono">
                            {results.tilesWithWastage}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.tilesWithWastage.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Tiles (exact):</span>
                        <span className="text-xl font-bold text-green-600 font-mono">{results.tilesNeeded}</span>
                      </div>
                    </div>

                    {pricePerTile && (
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">Estimated Cost:</span>
                          <span className="text-xl font-bold text-emerald-600 font-mono">
                            ${results.totalCost.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Project Area:</h4>
                      <p className="text-sm text-yellow-700 font-mono">
                        {results.roomArea.toFixed(2)} m² ({(results.roomArea * 10.764).toFixed(2)} ft²)
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <LayoutGrid className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter dimensions to calculate tiles needed</p>
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
