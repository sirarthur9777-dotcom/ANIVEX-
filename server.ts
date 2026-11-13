import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

import fs from "fs";

dotenv.config();

let firebaseApiKey = process.env.VITE_FIREBASE_API_KEY || "";
try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    if (configData.apiKey) {
      firebaseApiKey = configData.apiKey;
    }
  }
} catch {
  // fallback to env
}

const AUTHORIZED_ADMIN_EMAILS = [
  "sirarthur9777@gmail.com",
  "kdsingh9777@gmail.com",
];

async function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Authentication required: Bearer token is missing.",
      status: 401,
    });
  }

  const token = authHeader.split("Bearer ")[1]?.trim();
  if (!token) {
    return res.status(401).json({
      error: "Authentication required: Token is empty.",
      status: 401,
    });
  }

  try {
    if (!firebaseApiKey) {
      return res.status(500).json({ error: "Server authentication configuration missing." });
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    );

    if (!response.ok) {
      return res.status(401).json({
        error: "Invalid or expired administrator token.",
        status: 401,
      });
    }

    const data = (await response.json()) as any;
    const user = data.users?.[0];
    if (!user || !user.email) {
      return res.status(401).json({
        error: "Unable to verify administrator identity from token.",
        status: 401,
      });
    }

    const email = user.email.toLowerCase().trim();
    let isAuthorized = AUTHORIZED_ADMIN_EMAILS.includes(email);

    if (!isAuthorized && user.customAttributes) {
      try {
        const custom = JSON.parse(user.customAttributes);
        if (custom.admin === true || custom.role === "admin") {
          isAuthorized = true;
        }
      } catch {
        // continue
      }
    }

    if (!isAuthorized) {
      return res.status(403).json({
        error: "Forbidden: Account lacks administrator privileges.",
        status: 403,
      });
    }

    (req as any).adminUser = {
      uid: user.localId,
      email: user.email,
    };
    next();
  } catch (err: any) {
    return res.status(500).json({
      error: "Error verifying authentication token on server.",
      details: err?.message,
    });
  }
}

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

  // Secure Admin Verification & Inquiries Endpoints (Guarded by server-side requireAdminAuth)
  app.get("/api/admin/verify", requireAdminAuth, (req, res) => {
    res.json({
      authorized: true,
      user: (req as any).adminUser,
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/admin/inquiries", requireAdminAuth, (req, res) => {
    res.json({
      inquiries,
      count: inquiries.length,
      requestedBy: (req as any).adminUser.email,
    });
  });

  app.get("/api/admin/system-status", requireAdminAuth, (req, res) => {
    res.json({
      status: "operational",
      serverTime: new Date().toISOString(),
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      uptimeSeconds: process.uptime(),
      authorizedAdmin: (req as any).adminUser.email,
    });
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
