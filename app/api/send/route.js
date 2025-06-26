import nodemailer from "nodemailer";
import "dotenv/config";

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error(
    "Missing required environment variables: EMAIL_USER or EMAIL_PASS"
  );
}

export async function POST(req) {
  try {
    const { email, subject, message, userName, phone } = await req.json();

    if (!email || !subject || !message || !userName) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields: name, email, subject, or message",
        }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${userName}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Message: ${subject}`,
      text: `You have received a new message:\n\nFrom: ${userName}\nEmail: ${email}\nPhone: ${
        phone || "Not Provided"
      }\n\nMessage:\n${message}`,
    });

    console.log("Email sent successfully");
    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error.message);
    return new Response(
      JSON.stringify({
        message: "Error sending message",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
