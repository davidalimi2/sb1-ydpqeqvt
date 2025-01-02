import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.VITE_SMTP_HOST,
  port: parseInt(process.env.VITE_SMTP_PORT || '587'),
  secure: process.env.VITE_SMTP_SECURE === 'true',
  auth: {
    user: process.env.VITE_SMTP_USER,
    pass: process.env.VITE_SMTP_PASS
  }
});

export async function sendEmail(to: string, subject: string, content: string): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.VITE_SMTP_FROM,
      to,
      subject,
      html: content
    });
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}