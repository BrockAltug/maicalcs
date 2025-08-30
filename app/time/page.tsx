"use client"

import { Clock, Calendar, Timer, Globe, Hourglass } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdBanner from "@/components/ad-banner"

const timeCalculators = [
  {
    title: "Time Calculator",
    description: "Add, subtract, and calculate time differences with precision",
    icon: Clock,
    href: "/time/time-calculator",
    popular: true,
    features: ["Time Addition", "Time Subtraction", "Duration Calc", "Precise Results"],
  },
  {
    title: "Hours Calculator",
    description: "Calculate total hours worked, overtime, and time tracking",
    icon: Clock,
    href: "/time/hours",
    popular: true,
    features: ["Work Hours", "Overtime Calc", "Time Tracking", "Break Time"],
  },
  {
    title: "Date Calculator",
    description: "Add or subtract days, weeks, months, or years from any date",
    icon: Calendar,
    href: "/time/date",
    popular: true,
    features: ["Date Addition", "Date Subtraction", "Business Days", "Weekday Calculator"],
  },
  {
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, days, hours, and minutes",
    icon: Calendar,
    href: "/time/age",
    popular: true,
    features: ["Exact Age", "Days Lived", "Next Birthday", "Age Comparison"],
  },
  {
    title: "Download Time Calculator",
    description: "Calculate download time based on file size and internet speed",
    icon: Timer,
    href: "/time/download-time",
    popular: false,
    features: ["File Size Calc", "Speed Analysis", "Time Estimate", "Multiple Units"],
  },
  {
    title: "Leap Year Calculator",
    description: "Check if a year is a leap year and find leap years in ranges",
    icon: Calendar,
    href: "/time/leap-year",
    popular: false,
    features: ["Leap Year Check", "Year Ranges", "Historical Data", "Future Years"],
  },
  {
    title: "Playback Speed Calculator",
    description: "Calculate video/audio playback time at different speeds",
    icon: Timer,
    href: "/time/playback-speed",
    popular: false,
    features: ["Speed Adjustment", "Time Savings", "Multiple Speeds", "Duration Calc"],
  },
  {
    title: "Audiobook Speed Calculator",
    description: "Calculate listening time for audiobooks at various speeds",
    icon: Timer,
    href: "/time/audiobook-speed",
    popular: false,
    features: ["Speed Options", "Time Savings", "Book Duration", "Listening Time"],
  },
  {
    title: "Sleep Calculator",
    description: "Calculate optimal bedtime and wake time based on sleep cycles",
    icon: Hourglass,
    href: "/time/sleep",
    popular: true,
    features: ["Sleep Cycles", "Bedtime Calc", "Wake Time", "Sleep Quality"],
  },
  {
    title: "Zodiac Sign Calculator",
    description: "Find zodiac sign based on birth date and astrological information",
    icon: Globe,
    href: "/time/zodiac",
    popular: false,
    features: ["Birth Date", "Zodiac Signs", "Astrology Info", "Personality"],
  },
  {
    title: "Words to Minutes Calculator",
    description: "Calculate reading or speaking time based on word count",
    icon: Clock,
    href: "/time/words-to-minutes",
    popular: false,
    features: ["Reading Time", "Speaking Time", "Word Count", "Speed Options"],
  },
  {
    title: "Seconds to YY:DD:HH:MM:SS",
    description: "Convert seconds to years, days, hours, minutes, and seconds format",
    icon: Timer,
    href: "/time/seconds-to-ydhms",
    popular: false,
    features: ["Time Conversion", "Multiple Formats", "Precise Results", "Easy Input"],
  },
  {
    title: "Time Card Calculator",
    description: "Calculate total work hours from time card entries",
    icon: Clock,
    href: "/time/time-card",
    popular: true,
    features: ["Time Entries", "Break Time", "Overtime", "Weekly Total"],
  },
  {
    title: "Days Calculator",
    description: "Calculate number of days between dates or add days to dates",
    icon: Calendar,
    href: "/time/days",
    popular: false,
    features: ["Days Between", "Add Days", "Business Days", "Date Range"],
  },
  {
    title: "Day of the Week Calculator",
    description: "Find what day of the week any date falls on",
    icon: Calendar,
    href: "/time/day-of-week",
    popular: false,
    features: ["Weekday Finder", "Historical Dates", "Future Dates", "Calendar Info"],
  },
  {
    title: "Hotel Nights Calculator",
    description: "Calculate number of nights and total cost for hotel stays",
    icon: Calendar,
    href: "/time/hotel-nights",
    popular: false,
    features: ["Night Count", "Cost Calc", "Check-in/Out", "Stay Duration"],
  },
  {
    title: "Years Calculator",
    description: "Calculate years between dates and age-related calculations",
    icon: Calendar,
    href: "/time/years",
    popular: false,
    features: ["Years Between", "Age Calc", "Anniversary", "Time Spans"],
  },
  {
    title: "Age Difference Calculator",
    description: "Calculate age difference between two people or dates",
    icon: Calendar,
    href: "/time/age-difference",
    popular: false,
    features: ["Age Gap", "Date Difference", "Relationship Age", "Time Span"],
  },
  {
    title: "Months Calculator",
    description: "Calculate months between dates and monthly calculations",
    icon: Calendar,
    href: "/time/months",
    popular: false,
    features: ["Months Between", "Add Months", "Monthly Calc", "Date Range"],
  },
  {
    title: "Weeks Calculator",
    description: "Calculate weeks between dates and weekly planning",
    icon: Calendar,
    href: "/time/weeks",
    popular: false,
    features: ["Weeks Between", "Add Weeks", "Weekly Calc", "Planning Tool"],
  },
  {
    title: "Birthday Calculator",
    description: "Calculate days until birthday, age, and birthday statistics",
    icon: Calendar,
    href: "/time/birthday",
    popular: true,
    features: ["Days Until", "Age Calc", "Birthday Stats", "Next Birthday"],
  },
  {
    title: "Roman Numeral Date Converter",
    description: "Convert dates to Roman numerals and vice versa",
    icon: Globe,
    href: "/time/roman-date",
    popular: false,
    features: ["Date Conversion", "Roman Numerals", "Historical Dates", "Format Options"],
  },
  {
    title: "Time Percentage Calculator",
    description: "Calculate what percentage of time has passed or remains",
    icon: Timer,
    href: "/time/time-percentage",
    popular: false,
    features: ["Time Progress", "Percentage Calc", "Remaining Time", "Progress Track"],
  },
  {
    title: "Percentage of Time Calculator",
    description: "Calculate percentage of time spent on activities or tasks",
    icon: Timer,
    href: "/time/percentage-of-time",
    popular: false,
    features: ["Activity Time", "Time Allocation", "Productivity", "Time Analysis"],
  },
]

export default function TimeCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* Enhanced Hero Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Clock className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-primary mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Time Calculators
            </h1>
            <p className="text-body text-gray-600 mb-12 max-w-3xl mx-auto">
              Master time with MaiCalcs comprehensive collection of date, time, and duration calculators. Perfect for
              planning, scheduling, and time management.
            </p>

            {/* Tools Navigation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Access to All Time Tools</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                {timeCalculators.map((calc, index) => (
                  <Link
                    key={index}
                    href={calc.href}
                    className="group relative bg-gray-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 border border-gray-200 hover:border-purple-300 rounded-lg px-3 py-2 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <calc.icon className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700 truncate">
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
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1">
                  {timeCalculators.length} Total Tools
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-3 py-1">
                  {timeCalculators.filter((calc) => calc.popular).length} Popular
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
            {timeCalculators.map((calc, index) => {
              const IconComponent = calc.icon
              return (
                <Link key={index} href={calc.href} className="group">
                  <Card className="calculator-card card-time h-full">
                    <div className="calculator-card-content calculator-card-body">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center calculator-icon shadow-lg">
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
                        <CardTitle className="heading-tertiary text-gray-900 group-hover:text-purple-600 transition-colors duration-300 mb-2">
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
                                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></div>
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
