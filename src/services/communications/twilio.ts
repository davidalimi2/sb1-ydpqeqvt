import { Twilio } from 'twilio';

const client = new Twilio(
  process.env.VITE_TWILIO_ACCOUNT_SID,
  process.env.VITE_TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, message: string): Promise<void> {
  try {
    await client.messages.create({
      body: message,
      to,
      from: process.env.VITE_TWILIO_PHONE_NUMBER
    });
  } catch (error) {
    console.error('Failed to send SMS:', error);
    throw error;
  }
}

export async function sendFax(to: string, mediaUrl: string): Promise<void> {
  try {
    await client.fax.v1.faxes.create({
      to,
      mediaUrl,
      from: process.env.VITE_TWILIO_FAX_NUMBER
    });
  } catch (error) {
    console.error('Failed to send fax:', error);
    throw error;
  }
}