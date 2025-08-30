"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, Loader2, FileImage } from "lucide-react"

export default function PhotoSolver() {
  const [image, setImage] = useState<string | null>(null)
  const [solution, setSolution] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setSolution("")
      }
      reader.readAsDataURL(file)
    }
  }

  const solveEquation = async () => {
    if (!image) return

    setLoading(true)
    try {
      const response = await fetch("/api/solve-equation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageData: image }),
      })

      const data = await response.json()
      if (data.solution) {
        setSolution(data.solution)
      } else {
        setSolution("Sorry, I couldn't solve this equation. Please try with a clearer image.")
      }
    } catch (error) {
      setSolution("An error occurred while solving the equation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
      {/* Upload Section */}
      <Card className="shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-purple-600" />
            <span>Upload Equation Photo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            {image ? (
              <div className="space-y-4">
                <img
                  src={image || "/placeholder.svg"}
                  alt="Uploaded equation"
                  className="max-w-full h-auto mx-auto rounded-lg"
                />
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Different Image
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <FileImage className="h-16 w-16 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-700">Upload an equation photo</p>
                  <p className="text-sm text-gray-500">PNG, JPG, or JPEG up to 10MB</p>
                </div>
                <Button onClick={() => fileInputRef.current?.click()} className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Image
                </Button>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

          {image && (
            <Button onClick={solveEquation} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Solving...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Solve Equation
                </>
              )}
            </Button>
          )}

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Tips for best results:</h4>
            <div className="text-sm text-purple-700 space-y-1">
              <p>• Ensure the equation is clearly visible</p>
              <p>• Use good lighting and avoid shadows</p>
              <p>• Keep the image focused and sharp</p>
              <p>• Include the entire equation in the frame</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solution Section */}
      <Card className="shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileImage className="h-5 w-5 text-green-600" />
            <span>AI Solution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600">Analyzing equation...</span>
            </div>
          ) : solution ? (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Step-by-Step Solution:</h4>
                <div className="text-green-700 whitespace-pre-wrap text-sm leading-relaxed">{solution}</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Upload an equation photo to get an AI-powered solution</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
