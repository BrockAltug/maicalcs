"use client"

import {
  Calculator,
  ActivityIcon as Function,
  BarChart3,
  Sigma,
  Triangle,
  Infinity,
  Pi,
  Square,
  Hash,
  Percent,
  CombineIcon as Combination,
  ChurchIcon as Roman,
  Plus,
  BarChart,
  SortAsc,
  X,
  Divide,
  Zap,
  Circle,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const mathCalculators = [
  {
    title: "Percentage Calculator",
    description: "Calculate percentages, percentage change, and percentage of numbers",
    icon: Calculator,
    href: "/math/percentage",
    popular: true,
    features: ["Basic Percent", "Percent Change", "Percent Of", "Increase/Decrease"],
  },
  {
    title: "Fractions Calculator",
    description: "Add, subtract, multiply, and divide fractions with step-by-step solutions",
    icon: Function,
    href: "/math/fractions",
    popular: true,
    features: ["Add/Subtract", "Multiply/Divide", "Simplify", "Mixed Numbers"],
  },
  {
    title: "Arithmetic Mean Calculator",
    description: "Calculate the average (arithmetic mean) of a set of numbers",
    icon: BarChart3,
    href: "/math/arithmetic-mean",
    popular: true,
    features: ["Simple Average", "Weighted Mean", "Data Analysis", "Statistics"],
  },
  {
    title: "Weighted Average Calculator",
    description: "Calculate weighted averages with different weights for each value",
    icon: Sigma,
    href: "/math/weighted-average",
    popular: false,
    features: ["Custom Weights", "Grade Calculation", "Portfolio Average", "Data Weighting"],
  },
  {
    title: "Root Calculator",
    description: "Calculate nth roots, square roots, cube roots, and more",
    icon: Square,
    href: "/math/root",
    popular: true,
    features: ["Nth Root", "Square Root", "Cube Root", "Real/Complex"],
  },
  {
    title: "Square Root Calculator",
    description: "Calculate square roots with precision and step-by-step solutions",
    icon: Square,
    href: "/math/square-root",
    popular: true,
    features: ["Perfect Squares", "Decimal Results", "Simplification", "Estimation"],
  },
  {
    title: "Cubic Root Calculator",
    description: "Calculate cube roots and third roots of any number",
    icon: Square,
    href: "/math/cubic-root",
    popular: false,
    features: ["Cube Root", "Real Numbers", "Negative Numbers", "Precision"],
  },
  {
    title: "Rounding Numbers Calculator",
    description: "Round numbers to specified decimal places or significant figures",
    icon: Triangle,
    href: "/math/rounding",
    popular: false,
    features: ["Decimal Places", "Significant Figures", "Nearest Integer", "Custom Rules"],
  },
  {
    title: "Binary Calculator",
    description: "Convert between binary, decimal, hexadecimal, and octal number systems",
    icon: Pi,
    href: "/math/binary",
    popular: false,
    features: ["Binary Convert", "Hex Convert", "Octal Convert", "Bit Operations"],
  },
  {
    title: "Arccos Calculator",
    description: "Calculate inverse cosine (arccos) values in degrees and radians",
    icon: Infinity,
    href: "/math/arccos",
    popular: false,
    features: ["Degrees/Radians", "Domain Check", "Principal Value", "Trigonometry"],
  },
  {
    title: "Arcsin Calculator",
    description: "Calculate inverse sine (arcsin) values in degrees and radians",
    icon: Infinity,
    href: "/math/arcsin",
    popular: false,
    features: ["Degrees/Radians", "Domain Check", "Principal Value", "Trigonometry"],
  },
  {
    title: "Arctan Calculator",
    description: "Calculate inverse tangent (arctan) values in degrees and radians",
    icon: Infinity,
    href: "/math/arctan",
    popular: false,
    features: ["Degrees/Radians", "All Real Numbers", "Principal Value", "Trigonometry"],
  },
  {
    title: "Number Sequence Calculator",
    description: "Find patterns and generate arithmetic and geometric sequences",
    icon: BarChart3,
    href: "/math/sequence",
    popular: false,
    features: ["Arithmetic Seq", "Geometric Seq", "Pattern Find", "Next Terms"],
  },
  {
    title: "Pi Digits Calculator",
    description: "Calculate and display digits of Pi (π) to specified precision",
    icon: Pi,
    href: "/math/pi-digits",
    popular: false,
    features: ["High Precision", "Digit Count", "Pi Facts", "Mathematical Constants"],
  },
  {
    title: "Big Numbers Calculator",
    description: "Perform calculations with very large numbers beyond standard limits",
    icon: Hash,
    href: "/math/big-numbers",
    popular: true,
    features: ["Large Numbers", "Precision Math", "Scientific Notation", "No Limits"],
  },
  {
    title: "Remainder Calculator",
    description: "Calculate remainders and quotients from division operations",
    icon: Divide,
    href: "/math/remainder",
    popular: false,
    features: ["Division Remainder", "Quotient", "Euclidean Division", "Step by Step"],
  },
  {
    title: "Hex Calculator",
    description: "Convert and calculate with hexadecimal numbers",
    icon: Hash,
    href: "/math/hex",
    popular: false,
    features: ["Hex to Decimal", "Hex Math", "Color Codes", "Programming"],
  },
  {
    title: "X is what percent of Y Calculator",
    description: "Find what percentage one number is of another number",
    icon: Percent,
    href: "/math/x-percent-of-y",
    popular: true,
    features: ["Percentage Of", "Ratio Analysis", "Proportion", "Quick Calculate"],
  },
  {
    title: "Combinations Calculator",
    description: "Calculate combinations and permutations for probability problems",
    icon: Combination,
    href: "/math/combinations",
    popular: false,
    features: ["nCr Formula", "Permutations", "Probability", "Factorial"],
  },
  {
    title: "Roman Numeral Converter",
    description: "Convert between Roman numerals and Arabic numbers",
    icon: Roman,
    href: "/math/roman-numerals",
    popular: false,
    features: ["Roman to Arabic", "Arabic to Roman", "Historical", "Validation"],
  },
  {
    title: "Integer and Negative Number Calculator",
    description: "Perform operations with positive and negative integers",
    icon: Plus,
    href: "/math/integers",
    popular: false,
    features: ["Negative Numbers", "Integer Math", "Sign Rules", "Operations"],
  },
  {
    title: "Logarithm Calculator",
    description: "Calculate natural, common, and custom base logarithms",
    icon: Function,
    href: "/math/logarithm",
    popular: true,
    features: ["Natural Log", "Common Log", "Custom Base", "Log Properties"],
  },
  {
    title: "Median Calculator",
    description: "Find the median value from a set of numbers",
    icon: BarChart,
    href: "/math/median",
    popular: false,
    features: ["Middle Value", "Odd/Even Sets", "Statistics", "Data Analysis"],
  },
  {
    title: "Number Sorter",
    description: "Sort numbers in ascending or descending order",
    icon: SortAsc,
    href: "/math/number-sorter",
    popular: false,
    features: ["Ascending Sort", "Descending Sort", "Data Organization", "List Processing"],
  },
  {
    title: "Long Multiplication Calculator",
    description: "Perform long multiplication with step-by-step breakdown",
    icon: X,
    href: "/math/long-multiplication",
    popular: false,
    features: ["Step by Step", "Large Numbers", "Educational", "Detailed Process"],
  },
  {
    title: "Modulo Calculator",
    description: "Calculate modulo operations and remainders",
    icon: Divide,
    href: "/math/modulo",
    popular: false,
    features: ["Mod Operation", "Remainder", "Clock Arithmetic", "Programming"],
  },
  {
    title: "LCD Calculator",
    description: "Find the Least Common Denominator of fractions for easy addition and subtraction",
    icon: Divide,
    href: "/math/lcd",
    popular: true,
    features: ["Fraction LCD", "Multiple Fractions", "Step by Step", "Conversion"],
  },
  {
    title: "LCM Calculator",
    description: "Calculate the Least Common Multiple of two or more numbers",
    icon: Hash,
    href: "/math/lcm",
    popular: true,
    features: ["Multiple Numbers", "Prime Factors", "Step by Step", "Multiples"],
  },
  {
    title: "GCD Calculator",
    description: "Find the Greatest Common Divisor using the Euclidean algorithm",
    icon: Hash,
    href: "/math/gcd",
    popular: true,
    features: ["Multiple Numbers", "Euclidean Method", "Factor Analysis", "Step by Step"],
  },
  {
    title: "Exponential Notation Calculator",
    description: "Convert between standard, scientific, and engineering notation",
    icon: Zap,
    href: "/math/exponential-notation",
    popular: false,
    features: ["Scientific Notation", "Engineering Form", "Standard Form", "Conversion"],
  },
  {
    title: "Cylinder Volume Calculator",
    description: "Calculate volume, surface area, and properties of cylinders",
    icon: Circle,
    href: "/math/cylinder-volume",
    popular: true,
    features: ["Volume", "Surface Area", "Base Area", "Lateral Area"],
  },
  {
    title: "Circumference Calculator",
    description: "Calculate circumference from radius, diameter, or area of circles",
    icon: Circle,
    href: "/math/circumference",
    popular: true,
    features: ["From Radius", "From Diameter", "From Area", "Circle Properties"],
  },
  {
    title: "Square Perimeter Calculator",
    description: "Calculate perimeter and properties of squares from various inputs",
    icon: Square,
    href: "/math/square-perimeter",
    popular: false,
    features: ["From Side", "From Area", "From Diagonal", "All Properties"],
  },
  {
    title: "Rectangle Perimeter Calculator",
    description: "Calculate perimeter and properties of rectangles",
    icon: Square,
    href: "/math/rectangle-perimeter",
    popular: false,
    features: ["Length & Width", "From Area", "From Diagonal", "All Properties"],
  },
  {
    title: "Standard Deviation Calculator",
    description: "Calculate population and sample standard deviation with variance",
    icon: BarChart3,
    href: "/math/standard-deviation",
    popular: true,
    features: ["Population SD", "Sample SD", "Variance", "Statistics"],
  },
  {
    title: "Square Area Calculator",
    description: "Calculate area and properties of squares from side, perimeter, or diagonal",
    icon: Square,
    href: "/math/square-area",
    popular: true,
    features: ["From Side", "From Perimeter", "From Diagonal", "All Properties"],
  },
  {
    title: "Rectangle Area Calculator",
    description: "Calculate area and properties of rectangles from length and width",
    icon: Square,
    href: "/math/rectangle-area",
    popular: true,
    features: ["Length & Width", "From Perimeter", "From Diagonal", "All Properties"],
  },
  {
    title: "Circle Area Calculator",
    description: "Calculate area and properties of circles from radius, diameter, or circumference",
    icon: Circle,
    href: "/math/circle-area",
    popular: true,
    features: ["From Radius", "From Diameter", "From Circumference", "All Properties"],
  },
  {
    title: "Area of a Trapezoid Calculator",
    description: "Calculate the area of a trapezoid using parallel bases and height",
    icon: Square,
    href: "/math/trapezoid-area",
    popular: true,
    features: ["Parallel Bases", "Height Input", "Step by Step", "Area Formula"],
  },
  {
    title: "Comparing Fractions Calculator",
    description: "Compare two fractions to determine which is larger, smaller, or equal",
    icon: Function,
    href: "/math/comparing-fractions",
    popular: true,
    features: ["Fraction Compare", "Common Denominator", "Decimal Values", "Cross Multiply"],
  },
  {
    title: "Exponent Calculator",
    description: "Calculate powers and exponents with any base and exponent values",
    icon: Zap,
    href: "/math/exponent",
    popular: true,
    features: ["Power Calculation", "Scientific Notation", "Exponent Rules", "Step by Step"],
  },
  {
    title: "Speed Calculator",
    description: "Calculate speed, distance, or time using fundamental motion formulas",
    icon: Zap,
    href: "/math/speed",
    popular: false,
    features: ["Speed/Distance/Time", "Unit Conversion", "Multiple Units", "Physics Formula"],
  },
  {
    title: "Proportion Calculator",
    description: "Solve proportions by finding missing values in ratio equations",
    icon: Hash,
    href: "/math/proportion",
    popular: false,
    features: ["Cross Multiply", "Missing Value", "Ratio Solving", "Step by Step"],
  },
  {
    title: "Square Diagonal Calculator",
    description: "Calculate diagonal of a square from side length, area, or other properties",
    icon: Square,
    href: "/math/square-diagonal",
    popular: false,
    features: ["Diagonal Length", "From Side/Area", "Square Properties", "Pythagorean"],
  },
  {
    title: "Rectangle Diagonal Calculator",
    description: "Calculate diagonal of a rectangle using length and width dimensions",
    icon: Square,
    href: "/math/rectangle-diagonal",
    popular: false,
    features: ["Length & Width", "Pythagorean Theorem", "Rectangle Properties", "Diagonal Formula"],
  },
  {
    title: "Factorial Calculator",
    description: "Calculate factorials (n!) for any non-negative integer with step-by-step solutions",
    icon: Hash,
    href: "/math/factorial",
    popular: true,
    features: ["n! Calculation", "Large Numbers", "Step by Step", "Factorial Properties"],
  },
  {
    title: "Scale Calculator",
    description: "Calculate scale ratios, scaled dimensions, and actual sizes for models and maps",
    icon: Triangle,
    href: "/math/scale",
    popular: false,
    features: ["Scale Ratios", "Model Scaling", "Blueprint Scale", "Size Conversion"],
  },
  // NEW CALCULATORS ADDED
  {
    title: "Simplifying Fractions Calculator",
    description: "Simplify fractions to their lowest terms by finding the greatest common divisor",
    icon: Divide,
    href: "/math/simplifying-fractions",
    popular: true,
    features: ["GCD Method", "Step by Step", "Decimal Equivalent", "Lowest Terms"],
  },
  {
    title: "Diameter of a Circle Calculator",
    description: "Calculate the diameter of a circle from radius, circumference, or area",
    icon: Circle,
    href: "/math/circle-diameter",
    popular: true,
    features: ["From Radius", "From Circumference", "From Area", "Circle Properties"],
  },
  {
    title: "Geometric Mean Calculator",
    description: "Calculate the geometric mean of a set of positive numbers",
    icon: BarChart3,
    href: "/math/geometric-mean",
    popular: true,
    features: ["Growth Rates", "Financial Analysis", "Statistical Mean", "Positive Numbers"],
  },
  {
    title: "Pythagorean Theorem Calculator",
    description: "Calculate missing sides of right triangles using the Pythagorean theorem",
    icon: Triangle,
    href: "/math/pythagorean-theorem",
    popular: true,
    features: ["Right Triangles", "Missing Sides", "Triangle Area", "Geometry"],
  },
  {
    title: "Fraction to Percent Calculator",
    description: "Convert fractions to percentages instantly with step-by-step solutions",
    icon: Percent,
    href: "/math/fraction-to-percent",
    popular: true,
    features: ["Fraction Convert", "Percentage Form", "Decimal Equivalent", "Math Homework"],
  },
  {
    title: "Percentage Change Calculator",
    description: "Calculate percentage increase or decrease between two values",
    icon: TrendingUp,
    href: "/math/percentage-change",
    popular: true,
    features: ["Increase/Decrease", "Growth Analysis", "Price Changes", "Statistical Variation"],
  },
  {
    title: "Binary, Decimal, Hex, Octal Converter",
    description: "Convert numbers between binary, decimal, hexadecimal, and octal systems",
    icon: Hash,
    href: "/math/number-base-converter",
    popular: true,
    features: ["Number Systems", "Programming", "Digital Electronics", "Base Conversion"],
  },
  {
    title: "Decimal to Fraction Calculator",
    description: "Convert decimal numbers to fractions in simplest form",
    icon: Divide,
    href: "/math/decimal-to-fraction",
    popular: true,
    features: ["Decimal Convert", "Simplest Form", "Cooking Measurements", "Precise Calculations"],
  },
  {
    title: "Fraction to Decimal Calculator",
    description: "Convert fractions to decimal numbers with precision",
    icon: Divide,
    href: "/math/fraction-to-decimal",
    popular: true,
    features: ["Fraction Convert", "High Precision", "Financial Calculations", "Measurement Conversions"],
  },
]

export default function MathCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Math Calculators
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              From basic arithmetic to advanced calculus, MaiCalcs math calculators help students, teachers, and
              professionals solve complex mathematical problems with ease.
            </p>

            {/* Tools Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Math Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {mathCalculators.map((calc, index) => (
                  <Link
                    key={index}
                    href={calc.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <calc.icon className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 truncate">
                        {calc.title}
                      </span>
                    </div>
                    {calc.popular && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                  {mathCalculators.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-3 py-1">
                  {mathCalculators.filter((calc) => calc.popular).length} Popular
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container-custom px-4 mb-16">
        <AdBanner />
      </div>

      {/* Calculator Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="calculator-grid">
            {mathCalculators.map((calc, index) => {
              const IconComponent = calc.icon
              return (
                <Link key={index} href={calc.href} className="group">
                  <Card className="calculator-card card-math h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center calculator-icon shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          {calc.popular && (
                            <Badge
                              variant="secondary"
                              className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1"
                            >
                              Popular
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                          {calc.title}
                        </CardTitle>
                        <CardDescription className="text-small text-gray-600 leading-relaxed flex-1">
                          {calc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 mt-auto">
                        <div className="space-y-3">
                          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Features</p>
                          <div className="grid grid-cols-2 gap-2">
                            {calc.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <span className="text-xs text-gray-600 leading-tight">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h3 className="heading-secondary mb-6">Most Popular Math Tools</h3>
            <p className="text-body text-gray-600">These calculators are used by students and professionals daily</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mathCalculators
              .filter((calc) => calc.popular)
              .slice(0, 3)
              .map((calc, index) => {
                const IconComponent = calc.icon
                return (
                  <Card key={index} className="calculator-card card-math group">
                    <div className="calculator-card-content">
                      <CardHeader className="text-center pb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 calculator-icon shadow-xl">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="heading-tertiary text-gray-900 mb-3">{calc.title}</CardTitle>
                        <CardDescription className="text-small text-gray-600 leading-relaxed">
                          {calc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={calc.href}>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                            Open Calculator
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </Card>
                )
              })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
