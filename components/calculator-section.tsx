"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calculator, History, Copy, Check } from "lucide-react"

export default function CalculatorSection() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)

      // Add to history
      const calculation = `${currentValue} ${operation} ${inputValue} = ${newValue}`
      setHistory((prev) => [calculation, ...prev.slice(0, 9)])
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(display)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ]

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
      {/* Calculator */}
      <div className="lg:col-span-2">
        <Card className="shadow-2xl border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span>Advanced Calculator</span>
              </CardTitle>
              <Badge variant="secondary">Scientific</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Display */}
            <div className="relative">
              <Input
                value={display}
                readOnly
                className="text-right text-3xl font-mono h-16 text-gray-800 bg-gray-50 border-2"
              />
              <Button variant="ghost" size="sm" className="absolute right-2 top-2" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-3">
              {buttons.flat().map((btn, index) => (
                <Button
                  key={index}
                  variant={["C", "±", "%", "÷", "×", "-", "+", "="].includes(btn) ? "default" : "outline"}
                  className={`h-14 text-lg font-semibold ${btn === "0" ? "col-span-2" : ""} ${
                    ["÷", "×", "-", "+", "="].includes(btn)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : btn === "C"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : ""
                  }`}
                  onClick={() => {
                    if (btn === "C") {
                      clear()
                    } else if (btn === ".") {
                      inputDecimal()
                    } else if (["+", "-", "×", "÷", "="].includes(btn)) {
                      performOperation(btn)
                    } else if (!isNaN(Number(btn))) {
                      inputDigit(btn)
                    }
                  }}
                >
                  {btn}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History & Functions */}
      <div className="space-y-6">
        {/* History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <History className="h-4 w-4" />
              <span>History</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-gray-500 text-sm">No calculations yet</p>
              ) : (
                history.map((calc, index) => (
                  <div
                    key={index}
                    className="text-sm font-mono bg-gray-50 p-2 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      const result = calc.split(" = ")[1]
                      setDisplay(result)
                    }}
                  >
                    {calc}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Functions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Functions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDisplay(String(Math.sqrt(Number.parseFloat(display))))}
              >
                √x
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDisplay(String(Math.pow(Number.parseFloat(display), 2)))}
              >
                x²
              </Button>
              <Button variant="outline" size="sm" onClick={() => setDisplay(String(1 / Number.parseFloat(display)))}>
                1/x
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDisplay(String(Math.abs(Number.parseFloat(display))))}
              >
                |x|
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
