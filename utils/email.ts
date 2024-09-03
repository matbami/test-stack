import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_USER || "smtp.ethereal.email",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER || "bruce.hartmann@ethereal.email",
    pass: process.env.SMTP_PASSWORD || "PerPmR8B4uembcYuCu",
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
      from: '"StackOverflow Clone" <bruce.hartmann@ethereal.email>', // sender address
      ...mailOptions,
    });

    console.log("Notification email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
