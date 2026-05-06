"use server"

import { getCartId } from "./cookies"

export async function sendBoxNote(
  note: string
): Promise<{ success: boolean; cartId: string | null; error?: string }> {
  const cartId = await getCartId()

  if (!note.trim()) {
    return { success: false, cartId: cartId ?? null, error: "Note is empty" }
  }

  const reference = cartId ?? `box-${Date.now()}`

  const htmlBody = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #f1eae1; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #FF67B3; font-size: 28px; margin: 0;">Obana</h1>
        <p style="color: #636363; font-size: 13px; margin: 4px 0 0;">New Box Note Received</p>
      </div>
      <div style="background: #fff; border-radius: 12px; padding: 24px;">
        <p style="margin: 0 0 8px; color: #636363; font-size: 13px;"><strong>Reference ID:</strong></p>
        <p style="margin: 0 0 20px; font-family: monospace; font-size: 14px; color: #101010; background: #f5f5f5; padding: 8px 12px; border-radius: 6px;">${reference}</p>
        <p style="margin: 0 0 8px; color: #636363; font-size: 13px;"><strong>Customer Note:</strong></p>
        <blockquote style="margin: 0; padding: 16px; border-left: 3px solid #FF67B3; background: #fde8ef; border-radius: 0 8px 8px 0; color: #101010; font-size: 15px; line-height: 1.6;">
          ${note.replace(/\n/g, "<br/>")}
        </blockquote>
      </div>
      <p style="text-align: center; color: #9ca3af; font-size: 11px; margin-top: 24px;">© ${new Date().getFullYear()} Obana</p>
    </div>
  `

  const textBody = `New Obana Box Note\n\nReference ID: ${reference}\n\nCustomer Note:\n${note}`

  try {
    const nodemailer = (await import("nodemailer")).default

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS
    ) {
      console.warn(
        "[box-note] SMTP env vars not configured — note logged below\n",
        textBody
      )
      return { success: true, cartId: cartId ?? null }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Obana Store" <${process.env.SMTP_USER}>`,
      to: "jummiekay2012@gmail.com",
      subject: `📦 Box Note — Ref: ${reference}`,
      text: textBody,
      html: htmlBody,
    })

    return { success: true, cartId: cartId ?? null }
  } catch (e: any) {
    console.error("[box-note] Failed to send email:", e?.message)
    return { success: false, cartId: cartId ?? null, error: e?.message }
  }
}
