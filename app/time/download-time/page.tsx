"use client"

import { useState } from "react"
import { Calculator, ArrowRight, Copy, Check, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function DownloadTimeCalculatorPage() {
  const [fileSize, setFileSize] = useState("")
  const [fileSizeUnit, setFileSizeUnit] = useState("MB")
  const [speed, setSpeed] = useState("")
  const [speedUnit, setSpeedUnit] = useState("Mbps")
  const [results, setResults] = useState<{
    downloadTime: number
    hours: number
    minutes: number
    seconds: number
    fileSizeBytes: number
    speedBps: number
    formula: string
  } | null>(null)
  const [copied, setCopied] = useState(false)

  const calculateDownloadTime = () => {
    try {
      const size = Number.parseFloat(fileSize)
      const downloadSpeed = Number.parseFloat(speed)

      if (isNaN(size) || isNaN(downloadSpeed) || size <= 0 || downloadSpeed <= 0) {
        alert("Please enter valid positive numbers for file size and speed.")
        return
      }

      // Convert file size to bytes
      let sizeInBytes = size
      switch (fileSizeUnit) {
        case "KB":
          sizeInBytes *= 1024
          break
        case "MB":
          sizeInBytes *= 1024 * 1024
          break
        case "GB":
          sizeInBytes *= 1024 * 1024 * 1024
          break
        case "TB":
          sizeInBytes *= 1024 * 1024 * 1024 * 1024
          break
      }

      // Convert speed to bytes per second
      let speedInBps = downloadSpeed
      switch (speedUnit) {
        case "Kbps":
          speedInBps = (downloadSpeed * 1000) / 8
          break
        case "Mbps":
          speedInBps = (downloadSpeed * 1000000) / 8
          break
        case "Gbps":
          speedInBps = (downloadSpeed * 1000000000) / 8
          break
        case "KBps":
          speedInBps = downloadSpeed * 1024
          break
        case "MBps":
          speedInBps = downloadSpeed * 1024 * 1024
          break
        case "GBps":
          speedInBps = downloadSpeed * 1024 * 1024 * 1024
          break
      }

      const timeInSeconds = sizeInBytes / speedInBps
      const hours = Math.floor(timeInSeconds / 3600)
      const minutes = Math.floor((timeInSeconds % 3600) / 60)
      const seconds = Math.floor(timeInSeconds % 60)

      setResults({
        downloadTime: Number(timeInSeconds.toFixed(2)),
        hours,
        minutes,
        seconds,
        fileSizeBytes: sizeInBytes,
        speedBps: speedInBps,
        formula: `${size} ${fileSizeUnit} at ${downloadSpeed} ${speedUnit}`,
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
    setFileSize("")
    setFileSizeUnit("MB")
    setSpeed("")
    setSpeedUnit("Mbps")
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Download className="h-16 w-16 text-purple-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Download Time Calculator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Calculate download time based on file size and internet speed with MaiCalcs. Perfect for planning
              downloads, estimating transfer times, and bandwidth analysis.
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
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>Download Parameters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">File Size</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="fileSize">Size</Label>
                      <Input
                        id="fileSize"
                        type="number"
                        placeholder="Enter file size"
                        value={fileSize}
                        onChange={(e) => setFileSize(e.target.value)}
                        className="text-lg font-mono"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fileSizeUnit">Unit</Label>
                      <Select value={fileSizeUnit} onValueChange={setFileSizeUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="KB">Kilobytes (KB)</SelectItem>
                          <SelectItem value="MB">Megabytes (MB)</SelectItem>
                          <SelectItem value="GB">Gigabytes (GB)</SelectItem>
                          <SelectItem value="TB">Terabytes (TB)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Internet Speed</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="speed">Speed</Label>
                      <Input
                        id="speed"
                        type="number"
                        placeholder="Enter speed"
                        value={speed}
                        onChange={(e) => setSpeed(e.target.value)}
                        className="text-lg font-mono"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="speedUnit">Unit</Label>
                      <Select value={speedUnit} onValueChange={setSpeedUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kbps">Kilobits/sec (Kbps)</SelectItem>
                          <SelectItem value="Mbps">Megabits/sec (Mbps)</SelectItem>
                          <SelectItem value="Gbps">Gigabits/sec (Gbps)</SelectItem>
                          <SelectItem value="KBps">Kilobytes/sec (KBps)</SelectItem>
                          <SelectItem value="MBps">Megabytes/sec (MBps)</SelectItem>
                          <SelectItem value="GBps">Gigabytes/sec (GBps)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Speed Units:</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <p>• bps = bits per second</p>
                    <p>• Bps = bytes per second</p>
                    <p>• 1 byte = 8 bits</p>
                    <p>• Actual speeds may vary</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Examples:</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• 1 GB file at 100 Mbps = ~1.3 minutes</p>
                    <p>• 500 MB file at 50 Mbps = ~1.3 minutes</p>
                    <p>• 4 GB movie at 25 Mbps = ~21 minutes</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={calculateDownloadTime} className="flex-1 bg-purple-600 hover:bg-purple-700">
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
                  <ArrowRight className="h-5 w-5 text-pink-600" />
                  <span>Download Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Download Time:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-purple-600 font-mono">
                            {results.hours > 0 && `${results.hours}h `}
                            {results.minutes > 0 && `${results.minutes}m `}
                            {results.seconds}s
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(`${results.hours}h ${results.minutes}m ${results.seconds}s`)}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Total Seconds:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600 font-mono">{results.downloadTime}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyResult(results.downloadTime.toString())}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-pink-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">File Size (bytes):</span>
                        <span className="text-xl font-bold text-pink-600 font-mono">
                          {results.fileSizeBytes.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">Speed (bytes/sec):</span>
                        <span className="text-lg font-bold text-blue-600 font-mono">
                          {Math.round(results.speedBps).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Calculation:</h4>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• {results.formula}</p>
                        <p>• Time = File Size ÷ Download Speed</p>
                        <p>• Actual time may vary due to network conditions</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>• Planning large file downloads</p>
                        <p>• Estimating backup times</p>
                        <p>• Bandwidth requirement analysis</p>
                        <p>• Network performance testing</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Download className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Enter file size and internet speed to calculate download time</p>
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
