
import { GoogleGenAI } from "@google/genai";
import { UserProfile, CreditMetrics, Transaction } from "../types";

export const getCreditInsight = async (
  profile: UserProfile, 
  metrics: CreditMetrics, 
  transactions: Transaction[]
): Promise<string> => {
  // Always use direct process.env.API_KEY for initialization as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze the creditworthiness of this gig worker for a micro-loan.
    Profile: ${profile.name}, ${profile.employment}, Location: ${profile.location}.
    Trust Score: ${metrics.trustScore}, Repayment Probability: ${metrics.repaymentProbability}%.
    Recent Transactions: ${transactions.map(t => `${t.source}: ${t.amount}`).join(', ')}.
    
    Provide a concise, professional AI assessment (max 100 words) on why they are a good candidate or what risks exist.
    Focus on 'Tech for Good' and financial inclusion.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Assessment currently unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI assessment. Please try again later.";
  }
};
