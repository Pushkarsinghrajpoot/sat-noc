import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, formatContactFormEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json()

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error("[v0] Missing Supabase environment variables")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/demo_inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        status: "new",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Supabase error:", error)
      throw new Error("Failed to save to database")
    }

    // Send email notification
    try {
      const emailData = formatContactFormEmail({ name, email, phone }, 'Demo Request')
      const emailSent = await sendEmail(emailData)
      
      if (!emailSent) {
        console.warn('Email notification failed, but demo request was saved to database')
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json({ message: "Demo request submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Demo inquiry error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
