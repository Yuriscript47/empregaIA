import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function analisarMatch(curriculo, vaga) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Você é um recrutador técnico. Compare o CURRÍCULO com a VAGA abaixo.

REGRAS:
- Cite requisitos, tecnologias e termos que aparecem NA VAGA.
- Cada lacuna deve nomear um requisito concreto da vaga que falta no currículo.
- Cada ponto forte deve citar uma evidência real do currículo.
- Proibido dar conselhos genéricos como "ajuste as palavras-chave".
- Para cada lacuna, diga o que fazer (ex.: curso, projeto, como reescrever o trecho).

VAGA:
${vaga}

CURRÍCULO:
${curriculo}
`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          pontosFortes: { type: Type.ARRAY, items: { type: Type.STRING } },
          lacunas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                requisito: { type: Type.STRING },
                recomendacao: { type: Type.STRING },
              },
              required: ["requisito", "recomendacao"],
            },
          },
        },
        required: ["score", "pontosFortes", "lacunas"],
      },
    },
  });
  return JSON.parse(response.text);
}