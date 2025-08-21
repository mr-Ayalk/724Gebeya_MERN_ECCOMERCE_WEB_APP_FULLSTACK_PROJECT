import sendEmail from "./emailService.js";

const sendEmailFun = async ({ sendTo, subject, text = "", html = "" }) => {
  console.log("📩 Sending email to:", sendTo);

  const result = await sendEmail({ sendTo, subject, text, html });

  if (result.success) {
    return true;
  } else {
    console.error("❌ Failed to send email:", result.error);
    return false;
  }
};

export default sendEmailFun;
