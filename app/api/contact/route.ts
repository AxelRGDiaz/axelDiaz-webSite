import { NextRequest, NextResponse } from "next/server"
import { PERSONAL_INFO } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    if (message.length < 20) {
      return NextResponse.json({ error: "Message too short" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.log("Contact form submission (Resend not configured):", { name, email, subject, message })
      return NextResponse.json({ success: true })
    }

    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: "Portfolio Contact <portafolio@axel-diaz.com>",
      to: [PERSONAL_INFO.email],
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ""}
Message:
${message}
      `.trim(),
      html: `
<div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
  <div style="background: #09090b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 24px;">
    <h2 style="color: #e4e4e7; font-size: 18px; margin: 0 0 16px;">New message from your portfolio</h2>
    <div style="space-y: 12px;">
      <div style="margin-bottom: 12px;">
        <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">From</span>
        <p style="color: #e4e4e7; margin: 4px 0 0;">${name} &lt;${email}&gt;</p>
      </div>
      ${subject ? `<div style="margin-bottom: 12px;"><span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Subject</span><p style="color: #e4e4e7; margin: 4px 0 0;">${subject}</p></div>` : ""}
      <div>
        <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</span>
        <p style="color: #a1a1aa; margin: 8px 0 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
      </div>
    </div>
  </div>
</div>
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
