import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //email html

    const emailHtml = `<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    Click <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}" style="color: #4CAF50; text-decoration: none;">here</a> to 
    ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    } or copy and paste the link below in your browser.
    <br>
    <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}" style="color: #4CAF50; text-decoration: none;">${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}</a>
</p>
`;

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "effe3024082dd8",
        pass: "43a9cbcb64111c",
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email,
      subject:
        emailType === "VERIFY" ? "veify your email" : "Reset your password",
      html: emailHtml,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
