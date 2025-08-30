"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Key, Info, Lightbulb, HelpCircle, Calculator, ArrowRight, HeartPulse, Copy, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    setError("")
    setCopied(false)

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
    const numberChars = "0123456789"
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let charPool = ""
    if (includeUppercase) charPool += uppercaseChars
    if (includeLowercase) charPool += lowercaseChars
    if (includeNumbers) charPool += numberChars
    if (includeSymbols) charPool += symbolChars

    if (charPool === "") {
      setError("Please select at least one character type.")
      setPassword("")
      return
    }

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length)
      newPassword += charPool[randomIndex]
    }

    setPassword(newPassword)
  }

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const reset = () => {
    setLength(16)
    setIncludeUppercase(true)
    setIncludeLowercase(true)
    setIncludeNumbers(true)
    setIncludeSymbols(true)
    setPassword("")
    setError("")
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header />

      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Key className="h-16 w-16 text-pink-600" />
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Password Generator
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create strong, secure, and random passwords to protect your online accounts.
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
                  <Calculator className="h-5 w-5 text-pink-600" />
                  <span>Generator Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="length">Password Length</Label>
                    <span className="font-semibold text-pink-600">{length}</span>
                  </div>
                  <Slider
                    id="length"
                    min={8}
                    max={64}
                    step={1}
                    value={[length]}
                    onValueChange={(val) => setLength(val[0])}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-uppercase"
                      checked={includeUppercase}
                      onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))}
                    />
                    <Label htmlFor="include-uppercase" className="font-normal">
                      Uppercase (A-Z)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-lowercase"
                      checked={includeLowercase}
                      onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))}
                    />
                    <Label htmlFor="include-lowercase" className="font-normal">
                      Lowercase (a-z)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-numbers"
                      checked={includeNumbers}
                      onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))}
                    />
                    <Label htmlFor="include-numbers" className="font-normal">
                      Numbers (0-9)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="include-symbols"
                      checked={includeSymbols}
                      onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))}
                    />
                    <Label htmlFor="include-symbols" className="font-normal">
                      Symbols (!@#$)
                    </Label>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Pro Tip
                  </h4>
                  <p className="text-sm text-green-700">
                    For maximum security, use a password manager to store your complex, unique passwords. Never reuse
                    passwords across different websites.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button onClick={handleGenerate} className="flex-1 bg-pink-600 hover:bg-pink-700">
                    <Key className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                  <Button onClick={reset} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5 text-purple-600" />
                    <span>Result</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {password ? (
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <div className="relative flex items-center">
                        <Input type="text" readOnly value={password} className="font-mono text-lg pr-10" />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-1 -translate-y-1/2"
                          onClick={handleCopy}
                        >
                          {copied ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <Copy className="h-5 w-5 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HeartPulse className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated password will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-pink-600" />
                    <span>About Secure Passwords</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    A strong password is your first line of defense. It should be long, complex, and unique to each
                    account to minimize security risks.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <HelpCircle className="h-5 w-5 text-pink-600" />
                    <span>How to Use</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-600">
                  <p>1. Adjust the slider to set your desired password length.</p>
                  <p>2. Select the character types to include for complexity.</p>
                  <p>3. Click "Generate" to create a new password.</p>
                  <p>4. Use the copy button to easily save it.</p>
                </CardContent>
              </Card>
            </div>
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
