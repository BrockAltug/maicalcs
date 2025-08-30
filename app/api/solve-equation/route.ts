import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this mathematical equation or problem in the image and provide a step-by-step solution. Be clear and detailed in your explanation.",
            },
            {
              type: "image",
              image: imageData,
            },
          ],
        },
      ],
    })

    return NextResponse.json({ solution: text })
  } catch (error) {
    console.error("Error solving equation:", error)
    return NextResponse.json({ error: "Failed to solve equation" }, { status: 500 })
  }
}
