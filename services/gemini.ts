
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export async function askSchoolAssistant(prompt: string, context: any) {
  // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Lifequiver Schools Virtual Assistant. 
      School location: Ile-Ife, Osun State, Nigeria. 
      Context: ${JSON.stringify(context)}.
      User asks: ${prompt}`,
      config: {
        systemInstruction: "You are a helpful and professional school administrator. Provide concise, friendly, and accurate information about grades, schedules, and school events."
      }
    });
    // The GenerateContentResponse object features a text property that directly returns the string output.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to the school servers right now.";
  }
}
