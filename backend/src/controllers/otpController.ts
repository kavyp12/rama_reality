// backend/src/controllers/otpController.ts
import { Request, Response } from 'express';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

// In-memory OTP storage (use Redis in production)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Send OTP to phone number
// @route   POST /api/otp/send
export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a phone number',
      });
    }

    // Format phone number to E.164 format (+91XXXXXXXXXX for India)
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with 10-minute expiry
    otpStore.set(formattedPhone, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    // Send OTP via Messaging Service
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}. Valid for 10 minutes. Do not share with anyone.`,
      messagingServiceSid: messagingServiceSid,
      to: formattedPhone,
    });

    console.log(`✅ OTP sent to ${formattedPhone}, SID: ${message.sid}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        phone: formattedPhone,
        status: message.status,
      },
    });
  } catch (error: any) {
    console.error('❌ Error sending OTP:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP',
      message: error.message,
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/otp/verify
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.status(400).json({
        success: false,
        error: 'Please provide phone number and OTP code',
      });
    }

    // Format phone number
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    // Get stored OTP
    const stored = otpStore.get(formattedPhone);

    if (!stored) {
      return res.status(400).json({
        success: false,
        error: 'OTP not found or expired',
      });
    }

    // Check if OTP is expired
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(formattedPhone);
      return res.status(400).json({
        success: false,
        error: 'OTP expired',
      });
    }

    // Verify OTP
    if (stored.otp === code) {
      otpStore.delete(formattedPhone); // Delete after successful verification
      console.log(`✅ OTP verified for ${formattedPhone}`);
      
      res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        data: {
          phone: formattedPhone,
          verified: true,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid OTP code',
      });
    }
  } catch (error: any) {
    console.error('❌ Error verifying OTP:', error.message);
    res.status(400).json({
      success: false,
      error: 'Invalid OTP code',
      message: error.message,
    });
  }
};