const express = require("express");
const axios = require("axios");

const router = express.Router();

/**
 * POST /ai/ask
 * Body: { topic: "Node.js event loop" }
 * Response: JSON { think, summary, content }
 */
router.post("/ask", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Missing topic" });

    const prompt = `Explain the following topic in detail. Return ONLY a JSON object with keys: think, summary, content. Do not add any text outside JSON. Topic: ${topic}`;

    // Gọi API HuggingFace (router endpoint OpenAI-compatible) bằng axios
    const hfResponse = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "HuggingFaceTB/SmolLM3-3B:hf-inference",
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = hfResponse.data;

    // Lấy text trả về từ model (chat/completions format)
    let rawText =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.delta?.content ||
      "";

    // Làm sạch rawText (loại bỏ <think>, ```json, ```...)
    rawText = rawText
      .replace(/<think>[\s\S]*?<\/think>/gi, "") // bỏ block <think>
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Tìm JSON cuối cùng trong text
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({
        error: "Cannot parse JSON from model response",
        rawText, // debug
      });
    }

    let aiJson;
    try {
      aiJson = JSON.parse(jsonMatch[0]);
    } catch (e) {
      return res.status(500).json({
        error: "Invalid JSON format from model",
        rawText,
        parseError: e.message,
      });
    }

    res.json(aiJson);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
