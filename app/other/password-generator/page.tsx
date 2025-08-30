"use client"

import { useState, useEffect } from "react"
import { Key, Info, Clipboard, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/header"
import AdBanner from "@/components/ad-banner"
import Footer from "@/components/footer"

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lower = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let charset = ""
    if (includeUppercase) charset += upper
    if (includeLowercase) charset += lower
    if (includeNumbers) charset += numbers
    if (includeSymbols) charset += symbols

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type.",
        variant: "destructive",
      })
      setPassword("")
      return
    }

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(newPassword)
  }

  useEffect(() => {
    generatePassword()
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      toast({
        title: "Copied!",
        description: "Password copied to clipboard.",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <main className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Key className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Password Generator
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Create strong, secure, and random passwords to protect your accounts.
            </p>
          </div>

          <AdBanner />

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Password Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="length">Password Length: {length}</Label>
                  <Input
                    id="length"
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="uppercase"
                      checked={includeUppercase}
                      onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))}
                    />
                    <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lowercase"
                      checked={includeLowercase}
                      onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))}
                    />
                    <Label htmlFor="lowercase">Lowercase (a-z)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="numbers"
                      checked={includeNumbers}
                      onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))}
                    />
                    <Label htmlFor="numbers">Numbers (0-9)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="symbols"
                      checked={includeSymbols}
                      onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))}
                    />
                    <Label htmlFor="symbols">Symbols (!@#...)</Label>
                  </div>
                </div>
                <div className="relative">
                  <Input readOnly value={password} className="pr-20 text-lg font-mono" />
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={generatePassword}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                      <Clipboard className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-indigo-50 border-indigo-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-800">
                    <Info className="mr-2" /> Password Security Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-indigo-700">
                  <p>
                    A strong password is long, complex, and unique. Use a combination of uppercase and lowercase
                    letters, numbers, and symbols to make your passwords harder to guess. Avoid using personal
                    information.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-800">
                    <Info className="mr-2" /> Why Use a Password Generator?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-green-700">
                  <p>
                    Password generators create complex, unpredictable passwords that are difficult for humans to think
                    of and for hackers to crack. This significantly helps protect your online accounts from unauthorized
                    access.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
