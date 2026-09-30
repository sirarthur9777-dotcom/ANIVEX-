import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  budgetRange: string;
  description: string;
  submittedAt: string;
}

const inquiries: ContactInquiry[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      company: "ANIVEX Solutions",
      timestamp: new Date().toISOString(),
    });
  });

  // Project Inquiry Contact Endpoint
  app.post("/api/contact", (req, res) => {
    try {
      const { fullName, email, phone, company, projectType, budgetRange, description } = req.body;

      if (!fullName || !email || !projectType || !description) {
        return res.status(400).json({
          error: "Required fields missing: fullName, email, projectType, and description are required.",
        });
      }

      const id = `ANX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const inquiry: ContactInquiry = {
        id,
        fullName,
        email,
        phone: phone || "Not specified",
        company: company || "Independent / Startup",
        projectType,
        budgetRange: budgetRange || "Flexible",
        description,
        submittedAt: new Date().toISOString(),
      };

      inquiries.push(inquiry);

      return res.status(200).json({
        success: true,
        referenceId: id,
        message: `Thank you, ${fullName}. Your inquiry for ${projectType} has been received by ANIVEX Solutions. Our engineering team will review your requirements and respond within 24 hours.`,
        inquiry,
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Internal server error processing project inquiry.",
      });
    }
  });

  // Serve Vite in dev or static in production
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
    console.log(`ANIVEX Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
