"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-dashed border-blue-200 overflow-hidden">
      <div className="absolute top-3 right-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="h-8 w-8 p-0 hover:bg-white/50 rounded-full"
        >
          <X className="h-4 w-4 text-gray-500" />
        </Button>
      </div>

      <div className="p-8 text-center">
        <div className="text-gray-500 text-sm mb-3 font-medium uppercase tracking-wide">Advertisement</div>
        <div className="text-2xl font-bold text-gray-700 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Your Ad Could Be Here
        </div>
        <div className="text-gray-600 mb-4 max-w-md mx-auto leading-relaxed">
          Reach millions of users with targeted advertising on MaiCalcs. Premium placement available.
        </div>
        <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
          <span className="text-sm text-gray-500 font-medium">728 x 90 Banner Ad Space</span>
        </div>
      </div>
    </Card>
  )
}
