import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import { join } from "path";

// Load company data using process.cwd() which works reliably in Nitro
let companyData: string;
try {
  companyData = readFileSync(
    join(process.cwd(), "server/data/company_data.md"),
    "utf-8"
  );
} catch (err) {
  console.error("Failed to load company data:", err);
  companyData = "Company information is currently unavailable.";
}

const SYSTEM_PROMPT = `You are a helpful AI assistant for Infosys Solutions. Your role is to answer questions ONLY about the company based on the provided context.

**Context (Company Information):**
${companyData}

**Instructions:**
1. Answer questions ONLY based on the information provided in the context above.
2. Be helpful, concise, and professional in your responses.
3. If a question is not related to the company, its services, or the information provided, politely decline to answer. Say something like: "I can only help with questions about Infosys Solutions and our services. Is there anything else I can help you with regarding our company?"
4. Never make up information. If something is not in the context, say you don't have that information.
5. Do not engage in conversations about topics unrelated to the company (e.g., general knowledge, coding help, personal advice, etc.).
6. Do not send response in markdown format. Send response in plain text format.`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userMessage = body?.message;

  if (!userMessage || typeof userMessage !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Message is required and must be a string.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "AI service is not configured. Please contact the administrator.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemma-3-27b-it",
      contents: [
        {
          role: "user",
          parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${userMessage}` }],
        },
      ],
    });

    const text = response.text || "I'm sorry, I couldn't generate a response. Please try again.";

    return {
      success: true,
      response: text,
    };
  } catch (error: any) {
    console.error("Chat API Error:", error);

    // Handle specific Google API errors
    if (error?.status === 429) {
      throw createError({
        statusCode: 429,
        statusMessage: "Too Many Requests",
        message: "I'm receiving too many requests right now. Please try again in a moment.",
      });
    }

    if (error?.status === 401 || error?.status === 403) {
      throw createError({
        statusCode: 500,
        statusMessage: "Authorization Error",
        message: "AI service is not properly configured. Please contact the administrator.",
      });
    }

    if (error?.message?.includes("SAFETY")) {
      return {
        success: true,
        response: "I apologize, but I cannot respond to that query. Please ask me something about Infosys Solutions.",
      };
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
});
