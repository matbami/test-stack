import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: 'bruce.hartmann@ethereal.email',
        pass: 'PerPmR8B4uembcYuCu'
    },
  });
  
  export default transporter;



export async function sendAnswerNotificationEmail(to: string, questionTitle: string, answerBody: string) {
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