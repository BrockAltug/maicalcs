"use client"

import { Button } from "@/components/ui/button"
import { DollarSign, CreditCard, TrendingUp, PiggyBank, Calculator, Percent } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const financialCalculators = [
  {
    title: "VAT Calculator",
    description: "Calculate Value Added Tax (VAT) for your purchases and sales",
    icon: Calculator,
    href: "/financial/vat",
    popular: true,
    features: ["VAT Amount", "Net Price", "Gross Price", "Multiple Rates"],
  },
  {
    title: "Simple Interest Calculator",
    description: "Calculate simple interest on loans and investments",
    icon: Percent,
    href: "/financial/simple-interest",
    popular: true,
    features: ["Interest Amount", "Principal", "Rate & Time", "Payment Schedule"],
  },
  {
    title: "AdSense Calculator",
    description: "Estimate your Google AdSense earnings potential",
    icon: TrendingUp,
    href: "/financial/adsense",
    popular: true,
    features: ["Revenue Estimate", "CPC Analysis", "Traffic Impact", "Monthly Earnings"],
  },
  {
    title: "Tithing Calculator",
    description: "Calculate your tithe amount based on income",
    icon: DollarSign,
    href: "/financial/tithing",
    popular: false,
    features: ["10% Tithe", "Custom Percentage", "Monthly/Yearly", "Income Types"],
  },
  {
    title: "CPV Calculator",
    description: "Calculate cost per view for video advertising campaigns",
    icon: TrendingUp,
    href: "/financial/cpv",
    popular: false,
    features: ["Cost Per View", "Budget Planning", "View Goals", "Campaign ROI"],
  },
  {
    title: "Poshmark Fee Calculator",
    description: "Calculate Poshmark selling fees and net earnings",
    icon: CreditCard,
    href: "/financial/poshmark",
    popular: true,
    features: ["Selling Fees", "Net Earnings", "Profit Margin", "Price Optimization"],
  },
  {
    title: "Margin Calculator",
    description: "Calculate profit margins and markup percentages",
    icon: Percent,
    href: "/financial/margin",
    popular: true,
    features: ["Profit Margin", "Gross Margin", "Net Margin", "Break-even Point"],
  },
  {
    title: "Markup Calculator",
    description: "Calculate markup percentage and selling price",
    icon: TrendingUp,
    href: "/financial/markup",
    popular: false,
    features: ["Markup %", "Selling Price", "Cost Analysis", "Profit Calculation"],
  },
  {
    title: "Energy Calculator",
    description: "Calculate electricity costs and energy usage",
    icon: PiggyBank,
    href: "/financial/energy",
    popular: false,
    features: ["Power Usage", "Monthly Cost", "Annual Savings", "Efficiency Tips"],
  },
  {
    title: "Discount Calculator",
    description: "Calculate discounts, sale prices, and savings",
    icon: Percent,
    href: "/financial/discount",
    popular: true,
    features: ["Sale Price", "Discount Amount", "Savings %", "Multiple Discounts"],
  },
  {
    title: "Money Calculator",
    description: "Count and calculate money denominations",
    icon: DollarSign,
    href: "/financial/money",
    popular: false,
    features: ["Bill Counter", "Coin Counter", "Total Amount", "Change Calculator"],
  },
  {
    title: "Commission Calculator",
    description: "Calculate sales commissions and earnings",
    icon: TrendingUp,
    href: "/financial/commission",
    popular: false,
    features: ["Commission Rate", "Total Earnings", "Tiered Rates", "Sales Goals"],
  },
  {
    title: "YouTube Calculator",
    description: "Estimate YouTube ad revenue and earnings potential",
    icon: TrendingUp,
    href: "/financial/youtube",
    popular: true,
    features: ["Ad Revenue", "View Monetization", "CPM Analysis", "Channel Growth"],
  },
  {
    title: "Compound Interest",
    description: "Calculate compound interest and investment growth",
    icon: PiggyBank,
    href: "/financial/compound-interest",
    popular: true,
    features: ["Compound Growth", "Investment Timeline", "Regular Deposits", "Interest Frequency"],
  },
]

export default function FinancialCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Financial Calculators
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              Make informed financial decisions with MaiCalcs comprehensive suite of calculators. From VAT calculations
              to investment planning, we help you manage your finances with precision.
            </p>

            {/* Tools Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Financial Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {financialCalculators.map((calc, index) => (
                  <Link
                    key={index}
                    href={calc.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border border-gray-200 hover:border-green-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <calc.icon className="h-4 w-4 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 truncate">
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
                <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1">
                  {financialCalculators.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-3 py-1">
                  {financialCalculators.filter((calc) => calc.popular).length} Popular
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
            {financialCalculators.map((calc, index) => {
              const IconComponent = calc.icon
              return (
                <Link key={index} href={calc.href} className="group">
                  <Card className="calculator-card card-financial h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center calculator-icon shadow-lg">
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
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-2">
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
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
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
            <h3 className="heading-secondary mb-6">Most Popular Financial Tools</h3>
            <p className="text-body text-gray-600">These calculators are used by thousands of people daily</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {financialCalculators
              .filter((calc) => calc.popular)
              .slice(0, 3)
              .map((calc, index) => {
                const IconComponent = calc.icon
                return (
                  <Card key={index} className="calculator-card card-financial group">
                    <div className="calculator-card-content">
                      <CardHeader className="text-center pb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 calculator-icon shadow-xl">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="heading-tertiary text-gray-900 mb-3">{calc.title}</CardTitle>
                        <CardDescription className="text-small text-gray-600 leading-relaxed">
                          {calc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link href={calc.href}>
                          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
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

      {/* Ad Banner */}
      <div className="container-custom px-4 py-16">
        <AdBanner />
      </div>

      <Footer />
    </div>
  )
}
