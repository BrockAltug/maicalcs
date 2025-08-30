"use client"

import { Calculator, Menu, X, Camera, Shuffle, Type } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const navigationItems = [
    { name: "Financial", href: "/financial", color: "hover:text-green-600 hover:bg-green-50" },
    { name: "Math", href: "/math", color: "hover:text-blue-600 hover:bg-blue-50" },
    { name: "Time", href: "/time", color: "hover:text-purple-600 hover:bg-purple-50" },
    { name: "Construction", href: "/construction", color: "hover:text-orange-600 hover:bg-orange-50" },
    { name: "Sports", href: "/sports", color: "hover:text-red-600 hover:bg-red-50" },
    { name: "Other", href: "/other", color: "hover:text-indigo-600 hover:bg-indigo-50" },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white/98 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container-custom px-4">
        <div className="flex items-center justify-between h-14">
          {/* Enhanced Logo */}
          <button 
            onClick={() => handleNavigation('/')}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                MaiCalcs
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">Ultimate Calculator Hub</span>
            </div>
          </button>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-gray-50/80 rounded-xl p-1 border border-gray-200/50">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`px-3 py-1.5 text-sm font-medium text-gray-600 ${item.color} rounded-lg transition-all duration-200 relative group`}
                >
                  {item.name}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></div>
                </button>
              ))}
            </div>
          </nav>

          {/* Enhanced CTA Buttons - Hidden on mobile screens */}
          <div className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => handleNavigation('/generators')}
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold px-3 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm flex items-center"
            >
              <Shuffle className="h-4 w-4 mr-1.5" />
              Generators
            </button>
            <button
              onClick={() => handleNavigation('/text-tools')}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold px-3 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm flex items-center"
            >
              <Type className="h-4 w-4 mr-1.5" />
              Text Tools
            </button>
            <button
              onClick={() => handleNavigation('/ai-solver')}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold px-3 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm flex items-center"
            >
              <Camera className="h-4 w-4 mr-1.5" />
              AI Solver
            </button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl border border-gray-200/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 mx-[-1rem] px-4">
            <div className="flex flex-col items-center space-y-1 max-w-md mx-auto">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full text-center px-4 py-2.5 text-gray-600 ${item.color} rounded-lg transition-all duration-200 font-medium text-sm`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-3 border-t border-gray-200 w-full space-y-2">
                <button
                  onClick={() => handleNavigation('/generators')}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow-lg text-sm flex items-center justify-center"
                >
                  <Shuffle className="h-4 w-4 mr-1.5" />
                  Random Generators
                </button>
                <button
                  onClick={() => handleNavigation('/text-tools')}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow-lg text-sm flex items-center justify-center"
                >
                  <Type className="h-4 w-4 mr-1.5" />
                  Text Tools
                </button>
                <button
                  onClick={() => handleNavigation('/ai-solver')}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-2 rounded-xl transition-all duration-200 shadow-lg text-sm flex items-center justify-center"
                >
                  <Camera className="h-4 w-4 mr-1.5" />
                  Try AI Solver
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
