import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // const {
    //   SMTP_HOST,
    //   SMTP_PORT,
    //   SMTP_USER,
    //   SMTP_PASS,
    //   FROM_EMAIL,
    //   TO_EMAIL,
    //   SMTP_SECURE,
    // } = process.env as Record<string, string | undefined>;

    // if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !TO_EMAIL) {
    //   return NextResponse.json({ error: "Email transport not configured" }, { status: 500 });
    // }

    const transporter = nodemailer.createTransport({
      service:"Gmail",
      // port:"465",
      // secure: SMTP_SECURE ? SMTP_SECURE === "true" : Number(SMTP_PORT) === 465,
      auth: { user: "dossier.verify@gmail.com", pass: "rfkh xyce gudb rgzh" },
    });

    await transporter.verify();

    const now = new Date().toISOString();

   const res= await transporter.sendMail({
      from: "dossier.verify@gmail.com",
      to: "obviouslyankush@gmail.com",
      replyTo: email,
      subject: "New newsletter subscriber",
      text: `A new subscriber joined.\nEmail: ${email}\nTime: ${now}`,
      html: `<p>A new subscriber joined.</p><p><b>Email:</b> ${email}</p><p><b>Time:</b> ${now}</p>`,
    });
console.log(res);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}