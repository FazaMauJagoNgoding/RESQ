import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const getResend = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key || key.includes('YOUR_RESEND_API_KEY')) return null;
  return new Resend(key);
};

// Simple in-memory store for OTPs (Email -> Code)
const otpStore = new Map<string, string>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API to send OTP
  app.post("/api/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Generate 4-digit code
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otpStore.set(email, otp);

    console.log(`Generated OTP for ${email}: ${otp}`);

    const resendClient = getResend();

    if (resendClient) {
      try {
        const result = await resendClient.emails.send({
          from: 'SmartNest <onboarding@resend.dev>',
          to: email,
          subject: 'Your SmartNest Verification Code',
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #001C3D; background-color: #FEFDF0;">
              <h1 style="color: #F3C613;">SmartNest</h1>
              <p style="font-size: 18px;">Your verification code is:</p>
              <div style="font-size: 32px; font-weight: bold; padding: 10px; background: white; border-radius: 8px; display: inline-block; border: 2px solid #F3C613;">
                ${otp}
              </div>
              <p style="margin-top: 20px; opacity: 0.6;">The code will expire shortly. Do not share this with anyone.</p>
              <p style="font-size: 11px; margin-top: 40px; color: #666;">Sent via SmartNest Security Service</p>
            </div>
          `
        });

        if (result.error) {
          throw result.error;
        }

        res.json({ message: "OTP sent successfully" });
      } catch (error: any) {
        console.error("Resend error Details:", error);
        
        // Handle common Resend trial errors
        let userMessage = "Failed to send email";
        const errorMessage = error.message || "";
        if (errorMessage.includes("can only send to your own email address") || 
            errorMessage.includes("to an email address that is not your own")) {
          userMessage = "Resend Trial limit: Silakan gunakan email pendaftaran Resend Anda untuk testing (fazafahri270706@gmail.com).";
        } else if (error.name === 'validation_error') {
          userMessage = "Invalid email recipient for this account.";
        }

        res.status(500).json({ error: userMessage, details: error.message });
      }
    } else {
      // For development/demo purposes when API key is missing
      console.warn("RESEND_API_KEY missing or placeholder. Logging OTP to console.");
      res.json({ 
        message: "OTP generated (Key Missing)", 
        demo: true, 
        otp,
        instructions: "Add RESEND_API_KEY to Secrets to send real emails."
      });
    }
  });

  // API to verify OTP
  app.post("/api/verify-otp", (req, res) => {
    const { email, code } = req.body;
    const storedOtp = otpStore.get(email);

    if (storedOtp && storedOtp === code) {
      otpStore.delete(email); // One-time use
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, error: "Invalid verification code" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
