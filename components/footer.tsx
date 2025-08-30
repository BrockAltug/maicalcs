"use client"

import { Calculator, Heart, Mail, MapPin, Phone } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Footer() {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const calculatorCategories = [
    { name: "Financial Calculators", href: "/financial" },
    { name: "Math Calculators", href: "/math" },
    { name: "Time Calculators", href: "/time" },
    { name: "Construction Calculators", href: "/construction" },
    { name: "Sports & Health", href: "/sports" },
    { name: "Other Tools", href: "/other" },
  ]

  const toolCategories = [
    { name: "Random Generators", href: "/generators" },
    { name: "Text Tools", href: "/text-tools" },
    { name: "AI Math Solver", href: "/ai-solver" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container-custom px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-3 mb-4 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MaiCalcs
                </span>
                <span className="text-xs text-gray-300 font-medium -mt-1">Ultimate Calculator Hub</span>
              </div>
            </button>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Your one-stop destination for all calculation needs. From simple math to complex financial calculations, we've got you covered.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-300 text-sm">
                <Heart className="h-4 w-4 text-red-400 mr-1" />
                Made with love
              </div>
            </div>
          </div>

          {/* Calculator Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Calculators</h3>
            <ul className="space-y-2">
              {calculatorCategories.map((category) => (
                <li key={category.name}>
                  <button
                    onClick={() => handleNavigation(category.href)}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline text-left"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Generators */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Tools & Generators</h3>
            <ul className="space-y-2">
              {toolCategories.map((tool) => (
                <li key={tool.name}>
                  <button
                    onClick={() => handleNavigation(tool.href)}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline text-left"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Legal & Contact</h3>
            <ul className="space-y-2 mb-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:support@maicalcs.com" className="hover:text-white transition-colors">
                  support@maicalcs.com
                </a>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 MaiCalcs. All rights reserved. Built with precision and care.
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => handleNavigation('/')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('/math')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Calculators
              </button>
              <button
                onClick={() => handleNavigation('/generators')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Tools
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
