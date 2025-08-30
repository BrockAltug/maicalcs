"use client"

import { Camera, BookOpen, Info, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PhotoSolver from "@/components/photo-solver"

export default function AISolverPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      <main>
        <section className="section-padding">
          <div className="container-custom text-center">
            <div className="max-w-6xl mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Camera className="h-10 w-10 text-white" />
              </div>
              <h1 className="heading-primary mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Photo Equation Solver
              </h1>
              <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
                Snap a photo of any math equation and get instant step-by-step solutions powered by advanced AI.
              </p>
            </div>
          </div>
        </section>

        <div className="container-custom px-4 pb-16">
          <section className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="h-full shadow-lg bg-white/60 backdrop-blur-sm border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Upload Your Equation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <PhotoSolver />
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start">
                      <Lightbulb className="h-6 w-6 text-purple-600 mr-3 mt-1 shrink-0" />
                      <div>
                        <h4 className="font-bold text-purple-800">Pro Tip</h4>
                        <p className="text-sm text-purple-700">
                          For best results, use a clear, well-lit photo with the equation written on a plain background.
                          Avoid shadows and blurry images.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm border-gray-200">
                <CardHeader className="flex-row items-center gap-4">
                  <Info className="w-6 h-6 text-purple-600" />
                  <CardTitle>About AI Solver</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>
                    Our AI-powered equation solver uses advanced computer vision and mathematical reasoning to analyze
                    your handwritten or printed equations and provide detailed solutions.
                  </p>
                  <p>It supports a wide range of math types, from basic algebra to complex calculus problems.</p>
                </CardContent>
              </Card>
              <Card className="shadow-lg bg-white/60 backdrop-blur-sm border-gray-200">
                <CardHeader className="flex-row items-center gap-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <CardTitle>How to Use</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>1. Click the "Choose Image" button or drag an image file into the designated area.</p>
                  <p>2. Our AI will automatically detect and process the equation in the image.</p>
                  <p>3. The step-by-step solution will appear in the results area next to the image preview.</p>
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
