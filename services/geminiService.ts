
import { GoogleGenAI, Type } from "@google/genai";
import { CangjieData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function explainCangjie(character: string): Promise<CangjieData> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `提供中文字「${character}」的倉頡五代編碼。
    請給出完整的字母碼（例如：手戈）和對應的字根（例如：Q I）。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          char: { type: Type.STRING },
          code: { type: Type.STRING, description: "全碼，例如 'WMGR'" },
          radicals: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }, 
            description: "對應字根，例如 ['田', '一', '土', '口']" 
          }
        },
        required: ["char", "code", "radicals"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    // 確保 code 轉換為大寫
    data.code = data.code.toUpperCase();
    return data as CangjieData;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("無法解析 AI 回傳的數據");
  }
}
