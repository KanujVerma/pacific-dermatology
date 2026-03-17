import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Load GEMINI_API_KEY from .env.local
const envFile = readFileSync(".env.local", "utf-8");
const GEMINI_API_KEY = envFile.match(/GEMINI_API_KEY=(.+)/)?.[1]?.trim();
if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not found in .env.local");

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const images = [
  {
    name: "hero-bg",
    prompt:
      "A serene, luxurious modern medical dermatology clinic interior, soft warm golden lighting, cream and deep navy color palette, minimalist elegant aesthetic, marble surfaces, no people, photorealistic, wide angle architectural photography",
  },
  {
    name: "about-clinic",
    prompt:
      "An upscale dermatology examination room with soft warm lighting, clean white clinical surfaces, warm wood accents, potted plant, framed art on wall, no people, luxury medical spa aesthetic, photorealistic interior photography",
  },
  {
    name: "treatment-cosmetic",
    prompt:
      "Close-up of professional cosmetic skincare treatment serums and tools arranged on a clean white marble surface with gold accents, soft natural light, luxury medical spa aesthetic, photorealistic product photography",
  },
];

mkdirSync("public/images", { recursive: true });

for (const { name, prompt } of images) {
  console.log(`Generating: ${name}...`);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: { responseModalities: ["IMAGE", "TEXT"] },
    });

    let imageBytes = null;
    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        imageBytes = part.inlineData.data;
        break;
      }
    }
    if (!imageBytes) throw new Error("No image in response");

    const buffer = Buffer.from(imageBytes, "base64");
    const outPath = join("public/images", `${name}.jpg`);
    writeFileSync(outPath, buffer);
    console.log(`✓ Saved ${outPath} (${buffer.length} bytes)`);
  } catch (err) {
    console.error(`✗ Failed ${name}:`, err.message);
  }
}

console.log("Done.");
