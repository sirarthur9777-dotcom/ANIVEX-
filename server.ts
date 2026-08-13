import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
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

  // ANIVEX AI Assistant Endpoint
  app.post("/api/anivex-ai", async (req, res) => {
    try {
      const { prompt, history } = req.body;

      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt string is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const systemInstruction = `You are ANIVEX AI, the proprietary intelligent digital assistant built by ANIVEX Solutions.
ANIVEX Solutions is a modern technology and software solutions company focusing on building digital products, enterprise business software, AI-powered systems, websites, mobile applications, and custom software.
Your tone is intelligent, professional, crisp, helpful, and forward-looking.
Answer questions about software architecture, project estimations, technical stacks (React, Node, Python, AI, Android, Firebase, Cloud), or how ANIVEX Solutions can help solve business challenges. Keep answers clear and tailored.`;

          const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: prompt,
            config: {
              systemInstruction,
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          });

          return res.json({
            reply: response.text,
            source: "gemini-3.6-flash",
          });
        } catch (aiErr: any) {
          console.warn("Gemini call fallback triggered:", aiErr.message);
        }
      }

      // Intelligent fallback responses tailored to ANIVEX Solutions
      const queryLower = prompt.toLowerCase();
      let reply = "";

      if (queryLower.includes("price") || queryLower.includes("cost") || queryLower.includes("budget") || queryLower.includes("quote")) {
        reply = "ANIVEX Solutions provides customized project scoping based on architecture complexity, integrations, and timeline. Our project engagements typically start with a technical discovery phase to define precise deliverables and fixed milestones. You can submit your requirements via our Contact form below or request a tailored proposal.";
      } else if (queryLower.includes("policyhub") || queryLower.includes("policy") || queryLower.includes("document")) {
        reply = "PolicyHub is ANIVEX's flagship document management platform designed for modern enterprises to organize, govern, and audit corporate policies securely with AI search capabilities.";
      } else if (queryLower.includes("service") || queryLower.includes("build") || queryLower.includes("stack") || queryLower.includes("tech")) {
        reply = "ANIVEX Solutions specializes in 6 core engineering verticals: Custom Software, High-Performance Web Development, Android & Cross-Platform Mobile Apps, AI & Automation, Custom ERPs & Dashboards, and UI/UX Design. Our tech stack includes React, Next.js, Node.js, TypeScript, Python, Firebase, Android, and Cloud infrastructure.";
      } else if (queryLower.includes("hello") || queryLower.includes("hi") || queryLower.includes("hey")) {
        reply = "Hello! I am ANIVEX AI, the digital assistant developed by ANIVEX Solutions. How can I assist you with your software development, AI integration, or enterprise product requirements today?";
      } else {
        reply = `ANIVEX AI Analysis: Regarding "${prompt.slice(0, 80)}" — ANIVEX Solutions approaches this challenge through modular software architecture, human-centered UI/UX design, and scalable cloud engineering. Whether you are building an MVP or upgrading enterprise systems, our engineering team ensures high security and reliable execution.`;
      }

      return res.json({
        reply,
        source: "anivex-ai-core",
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Failed to process AI assistant request" });
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
