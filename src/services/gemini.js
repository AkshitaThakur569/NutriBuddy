import { GoogleGenAI } from "@google/genai/web";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export async function generateDietPlan(profile) {
  console.log('Hii  i am inside API function')
  const prompt = `
You are a friendly children's nutrition assistant.

Create a fun, simple ONE-DAY meal plan for a ${profile.age}-year-old child.

Height: ${profile.height} cm.
Weight: ${profile.weight} kg.

Allergies to avoid: ${profile.allergies || "none"}.
Foods they like: ${profile.likedFood  || "not specified"}.
Foods they dislike: ${profile.dislikeFood  || "not specified"}.

Respond ONLY with valid JSON in this exact shape, no extra text:

{
  "breakfast": "string",
  "lunch": "string",
  "snack": "string",
  "dinner": "string",
  "water_goal_glasses": number
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
     console.log('Hii i got response ')
    const text = response.text.replace(/```json|```/g, "").trim();
    console.log("The response is ", text);
    return JSON.parse(text);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
