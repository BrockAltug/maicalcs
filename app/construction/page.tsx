"use client"

import {
  Hammer,
  Ruler,
  Home,
  Calculator,
  Wrench,
  Building,
  Layers,
  Paintbrush,
  Mountain,
  Square,
  CuboidIcon as Cube,
  PipetteIcon as Pipe,
  Shovel,
  Grid3x3,
  TrendingUp,
  TrendingDown,
  Package,
  MapPin,
  ArrowUpDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const constructionCalculators = [
  {
    title: "Material Calculator",
    description: "Calculate quantities of concrete, lumber, drywall, and other materials",
    icon: Building,
    href: "/construction/materials",
    popular: true,
    features: ["Concrete Volume", "Lumber Calc", "Drywall Sheets", "Paint Coverage"],
  },
  {
    title: "Area Calculator",
    description: "Calculate area for flooring, roofing, and surface measurements",
    icon: Ruler,
    href: "/construction/area",
    popular: true,
    features: ["Square Footage", "Room Area", "Roof Area", "Wall Area"],
  },
  {
    title: "Cost Estimator",
    description: "Estimate project costs for construction and renovation work",
    icon: Calculator,
    href: "/construction/cost",
    popular: true,
    features: ["Labor Costs", "Material Costs", "Total Estimate", "Budget Planning"],
  },
  {
    title: "Foundation Calculator",
    description: "Calculate concrete needed for foundations, slabs, and footings",
    icon: Home,
    href: "/construction/foundation",
    popular: false,
    features: ["Slab Volume", "Footing Calc", "Reinforcement", "Excavation"],
  },
  {
    title: "Roofing Calculator",
    description: "Calculate shingles, underlayment, and roofing materials needed",
    icon: Home,
    href: "/construction/roofing",
    popular: false,
    features: ["Shingle Calc", "Pitch Calculator", "Ridge Length", "Waste Factor"],
  },
  {
    title: "Stair Calculator",
    description: "Design and calculate stair dimensions and materials",
    icon: Wrench,
    href: "/construction/stairs",
    popular: false,
    features: ["Rise & Run", "Tread Calc", "Stringer Layout", "Code Compliance"],
  },
  {
    title: "Asphalt Calculator",
    description: "Calculate asphalt quantities for driveways and roads",
    icon: Layers,
    href: "/construction/asphalt",
    popular: true,
    features: ["Tonnage Calc", "Thickness", "Area Coverage", "Cost Estimate"],
  },
  {
    title: "Concrete Slab Calculator",
    description: "Calculate concrete needed for slabs and flat surfaces",
    icon: Square,
    href: "/construction/concrete-slab",
    popular: true,
    features: ["Volume Calc", "Reinforcement", "Thickness", "Waste Factor"],
  },
  {
    title: "Concrete Block Calculator",
    description: "Calculate concrete blocks needed for walls and structures",
    icon: Building,
    href: "/construction/concrete-block",
    popular: false,
    features: ["Block Count", "Mortar Calc", "Wall Height", "Opening Deductions"],
  },
  {
    title: "Wood Calculator",
    description: "Calculate lumber and wood materials for construction projects",
    icon: Wrench,
    href: "/construction/wood",
    popular: true,
    features: ["Board Feet", "Linear Feet", "Framing Calc", "Waste Factor"],
  },
  {
    title: "Paint Calculator",
    description: "Calculate paint quantities needed for walls and surfaces",
    icon: Paintbrush,
    href: "/construction/paint",
    popular: true,
    features: ["Coverage Area", "Coats Needed", "Primer Calc", "Cost Estimate"],
  },
  {
    title: "Soil Calculator",
    description: "Calculate soil, dirt, and fill material quantities",
    icon: Mountain,
    href: "/construction/soil",
    popular: false,
    features: ["Cubic Yards", "Tonnage", "Depth Calc", "Compaction Factor"],
  },
  {
    title: "Square Meters Calculator",
    description: "Calculate area measurements in square meters",
    icon: Square,
    href: "/construction/square-meters",
    popular: false,
    features: ["Area Calc", "Room Size", "Floor Area", "Unit Conversion"],
  },
  {
    title: "Cubic Meters Calculator",
    description: "Calculate volume measurements in cubic meters",
    icon: Cube,
    href: "/construction/cubic-meters",
    popular: false,
    features: ["Volume Calc", "Material Qty", "Space Calc", "Unit Conversion"],
  },
  {
    title: "Pipe Volume Calculator",
    description: "Calculate volume of pipes and cylindrical structures",
    icon: Pipe,
    href: "/construction/pipe-volume",
    popular: false,
    features: ["Pipe Volume", "Flow Calc", "Diameter", "Length Calc"],
  },
  {
    title: "Sand Calculator",
    description: "Calculate sand quantities for construction projects",
    icon: Shovel,
    href: "/construction/sand",
    popular: false,
    features: ["Cubic Yards", "Tonnage", "Coverage", "Depth Calc"],
  },
  {
    title: "Tile Calculator",
    description: "Calculate tiles needed for flooring and wall projects",
    icon: Grid3x3,
    href: "/construction/tile",
    popular: true,
    features: ["Tile Count", "Coverage", "Waste Factor", "Grout Calc"],
  },
  {
    title: "Degrees to Percent Slope",
    description: "Convert slope degrees to percentage grade",
    icon: TrendingUp,
    href: "/construction/degrees-to-percent",
    popular: false,
    features: ["Slope Conversion", "Grade Calc", "Rise Over Run", "Angle Calc"],
  },
  {
    title: "Percent Slope to Degrees",
    description: "Convert percentage grade to slope degrees",
    icon: TrendingDown,
    href: "/construction/percent-to-degrees",
    popular: false,
    features: ["Grade Conversion", "Angle Calc", "Slope Calc", "Rise Over Run"],
  },
  {
    title: "Styrofoam Calculator",
    description: "Calculate styrofoam insulation quantities needed",
    icon: Package,
    href: "/construction/styrofoam",
    popular: false,
    features: ["Board Count", "R-Value", "Thickness", "Coverage Area"],
  },
  {
    title: "Land Area Calculator",
    description: "Calculate land area for property and site planning",
    icon: MapPin,
    href: "/construction/land-area",
    popular: false,
    features: ["Acreage", "Square Feet", "Hectares", "Property Size"],
  },
  {
    title: "m² to m³ Converter",
    description: "Convert square meters to cubic meters with thickness",
    icon: ArrowUpDown,
    href: "/construction/m2-to-m3",
    popular: false,
    features: ["Area to Volume", "Thickness Calc", "Material Qty", "Unit Conversion"],
  },
  {
    title: "m³ to m² Converter",
    description: "Convert cubic meters to square meters with thickness",
    icon: ArrowUpDown,
    href: "/construction/m3-to-m2",
    popular: false,
    features: ["Volume to Area", "Thickness Calc", "Coverage", "Unit Conversion"],
  },
  {
    title: "ft² to ft³ Converter",
    description: "Convert square feet to cubic feet with thickness",
    icon: ArrowUpDown,
    href: "/construction/ft2-to-ft3",
    popular: false,
    features: ["Area to Volume", "Thickness Calc", "Material Qty", "Unit Conversion"],
  },
  {
    title: "ft³ to ft² Converter",
    description: "Convert cubic feet to square feet with thickness",
    icon: ArrowUpDown,
    href: "/construction/ft3-to-ft2",
    popular: false,
    features: ["Volume to Area", "Thickness Calc", "Coverage", "Unit Conversion"],
  },
]

export default function ConstructionCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Hammer className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Construction Calculators
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              Professional construction calculators for contractors, builders, and DIY enthusiasts. Get accurate
              material estimates and project calculations with MaiCalcs.
            </p>

            {/* Tools Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Construction Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {constructionCalculators.map((calc, index) => (
                  <Link
                    key={index}
                    href={calc.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 border border-gray-200 hover:border-orange-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <calc.icon className="h-4 w-4 text-orange-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700 truncate">
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
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-3 py-1">
                  {constructionCalculators.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-3 py-1">
                  {constructionCalculators.filter((calc) => calc.popular).length} Popular
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
            {constructionCalculators.map((calc, index) => {
              const IconComponent = calc.icon
              return (
                <Link key={index} href={calc.href} className="group">
                  <Card className="calculator-card card-construction h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center calculator-icon shadow-lg">
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
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-2">
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
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
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

      <Footer />
    </div>
  )
}
