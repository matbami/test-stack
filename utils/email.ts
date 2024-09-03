import nodemailer from "nodemailer";
import dotenv from "dotenv";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: Number(process.env.PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transporter;

export async function sendAnswerNotificationEmail(
  to: string,
  questionTitle: string,
  answerBody: string
) {
  const mailOptions = {
    to,
    subject: `New Answer to Your Question: ${questionTitle}`,
    text: `Your question titled "${questionTitle}" has received a new answer. The answer is: "${answerBody}"`,
    html: `<p>Your question titled <strong>${questionTitle}</strong> has received a new answer. The answer is:</p><p>${answerBody}</p>`,
  };

  try {
    const info = await transporter.sendMail({
      from: '"StackOverflow Clone" <no-reply@stackoverlow>', // sender address
      ...mailOptions,
    });

    console.log("Notification email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
