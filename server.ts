import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint to send offers & callback requests
  app.post("/api/contact", async (req, res) => {
    const { email, phone, packageConfig } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "E-mailadres en telefoonnummer zijn verplicht.",
      });
    }

    const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || "rjhaije@protonmail.com";
    const isPackageRequest = !!packageConfig;
    const subject = isPackageRequest
      ? `🆕 Oerang.nl: Offerte Aanvraag (${email})`
      : `📞 Oerang.nl: Terugbelverzoek (${email})`;

    // Generate clean text-based fallback content
    let textContent = `Nieuwe aanvraag ontvangen via oerang.nl!\n\n`;
    textContent += `Type: ${isPackageRequest ? "Pakket & Offerte Aanvraag" : "Terugbelverzoek / Contact"}\n`;
    textContent += `E-mailadres: ${email}\n`;
    textContent += `Telefoonnummer: ${phone}\n\n`;

    if (isPackageRequest && packageConfig) {
      textContent += `--- GEKOZEN CONFIGURATIE ---\n`;
      textContent += `Gekozen opties: ${packageConfig.options.join(", ")}\n`;
      textContent += `Eenmalige opstartkosten: €${packageConfig.setupPrice}\n`;
      textContent += `Maandelijkse hosting & support: €${packageConfig.monthlyPrice}/mnd\n`;
    }

    // Generate beautiful custom responsive HTML email
    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 16px; color: #18181b; background-color: #ffffff;">
        <div style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #e4e4e7;">
          <h1 style="margin: 0; color: #d97706; font-size: 26px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase;">OERANG</h1>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #71717a; text-transform: uppercase; font-weight: bold; letter-spacing: 0.15em;">BUDGET WEBSIGNERS</p>
        </div>
        
        <div style="padding: 24px 0;">
          <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: bold; color: #18181b; text-transform: uppercase; letter-spacing: -0.02em;">
            ${isPackageRequest ? "Nieuwe Offerte Aanvraag" : "Nieuw Terugbelverzoek"}
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; font-size: 14px; color: #71717a; font-weight: bold; width: 35%;">E-mailadres</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; font-size: 14px; color: #18181b; font-weight: 500;">
                <a href="mailto:${email}" style="color: #d97706; text-decoration: none; font-weight: bold;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; font-size: 14px; color: #71717a; font-weight: bold;">Telefoonnummer</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; font-size: 14px; color: #18181b; font-weight: 500;">
                <a href="tel:${phone}" style="color: #d97706; text-decoration: none; font-weight: bold;">${phone}</a>
              </td>
            </tr>
          </table>

          ${
            isPackageRequest && packageConfig
              ? `
            <div style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 12px; padding: 20px; margin-top: 16px;">
              <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 900; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em;">Gekozen Website Pakket</h3>
              
              <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 1.6; color: #78350f;">
                <strong>Geselecteerde opties:</strong><br/>
                ${packageConfig.options.map((opt: string) => `• ${opt}`).join("<br/>")}
              </p>
              
              <div style="border-top: 1px solid #fcd34d; padding-top: 12px; font-size: 14px; color: #78350f;">
                <div style="margin-bottom: 6px;">
                  <strong>Eenmalige opstartkosten:</strong> 
                  <span style="font-weight: bold; float: right;">€${packageConfig.setupPrice}</span>
                </div>
                <div style="margin-top: 6px;">
                  <strong>Maandelijks (hosting & support):</strong> 
                  <span style="font-weight: bold; float: right; color: #b45309;">€${packageConfig.monthlyPrice}/mnd</span>
                </div>
              </div>
            </div>
            `
              : ""
          }
        </div>

        <div style="border-top: 1px solid #e4e4e7; padding-top: 16px; text-align: center; font-size: 11px; color: #a1a1aa; line-height: 1.5;">
          Deze mail is automatisch verzonden vanaf de website <a href="https://oerang.nl" style="color: #d97706; text-decoration: none; font-weight: bold;">oerang.nl</a>.
        </div>
      </div>
    `;

    try {
      // Option A: Resend API Delivery
      if (process.env.RESEND_API_KEY) {
        console.log("Using Resend API for email delivery...");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: "Oerang Web <onboarding@resend.dev>",
          to: receiverEmail,
          subject: subject,
          html: htmlContent,
          text: textContent,
        });

        if (error) {
          throw new Error(`Resend Error: ${error.message}`);
        }

        return res.json({
          success: true,
          message: "Aanvraag succesvol verzonden via Resend!",
        });
      }

      // Option B: Traditional SMTP Delivery
      if (process.env.SMTP_HOST) {
        const smtpUser = process.env.SMTP_USER || "";
        const smtpPass = process.env.SMTP_PASS || "";
        
        // Smart validation for dummy / placeholder values
        const isDummyUser = !smtpUser || 
                            smtpUser.includes("je-emailadres") || 
                            smtpUser.includes("your_email") || 
                            smtpUser.includes("example.com") ||
                            smtpUser === "your_email@domain.com";
                            
        const isDummyPass = !smtpPass || 
                            smtpPass.includes("je-wachtwoord") || 
                            smtpPass.includes("your_password") || 
                            smtpPass === "your_password_here";

        if (isDummyUser || isDummyPass) {
          return res.status(400).json({
            success: false,
            message: "De SMTP-inloggegevens zijn nog niet correct ingesteld. Vul je echte Hostinger e-mailadres en wachtwoord in de 'Secrets' tab van Google AI Studio of in het .env-bestand.",
          });
        }

        console.log(`Using SMTP (${process.env.SMTP_HOST}) for email delivery for user: ${smtpUser}...`);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 5000, // 5 seconds max connection attempt
          greetingTimeout: 5000,   // 5 seconds max greeting
          socketTimeout: 5000,     // 5 seconds inactivity
        });

        await transporter.sendMail({
          from: smtpUser,
          to: receiverEmail,
          subject: subject,
          text: textContent,
          html: htmlContent,
        });

        return res.json({
          success: true,
          message: "Aanvraag succesvol verzonden via SMTP!",
        });
      }

      // Option C: Return a friendly placeholder success when secrets are not yet filled
      console.warn("⚠️ No SMTP or Resend credentials found in environment variables.");
      return res.json({
        success: true,
        mocked: true,
        message: "Aanvraag ontvangen! (Let op: vul je SMTP- of Resend-inloggegevens in de Settings tab van Google AI Studio om de e-mail live te laten verzenden).",
      });

    } catch (err: any) {
      console.error("Delivery error:", err);
      return res.status(500).json({
        success: false,
        message: "Er is een fout opgetreden bij het verwerken van je aanvraag op de server.",
        error: err.message,
      });
    }
  });

  // Serve Vite assets in development / production static build handler
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server successfully running on port ${PORT}`);
  });
}

startServer();
