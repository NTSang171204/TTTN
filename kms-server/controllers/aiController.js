// const axios = require("axios");

// // 🔹 AI Chat tổng quát (miễn Knowledge ID) dùng axios
// const aiChat = async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || message.trim() === "") {
//       return res.status(400).json({ reply: "Xin hãy nhập câu hỏi hoặc yêu cầu." });
//     }

//     // Xác định intent dựa trên message
//     let prompt = "";
//     if (/tóm tắt/i.test(message)) {
//       prompt = `Tóm tắt nội dung sau một cách ngắn gọn:\n\n${message}`;
//     } else if (/giải thích/i.test(message)) {
//       prompt = `Giải thích chi tiết và dễ hiểu nội dung sau:\n\n${message}`;
//     } else {
//       prompt = `Trả lời câu hỏi hoặc yêu cầu sau một cách chi tiết và dễ hiểu:\n\n${message}`;
//     }

//     // Gọi Hugging Face T5-small (miễn phí) hoặc GPT-like bằng axios
//     const response = await axios.post(
//       "https://router.huggingface.co/hf-inference/models/google-t5/t5-small",
//       { inputs: prompt },
//       {
//         headers: {
//           "Authorization": `Bearer ${process.env.HF_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const data = response.data;

//     if (data.error) {
//       return res.status(500).json({ reply: `Error from AI: ${data.error}` });
//     }

//     const replyText = data[0]?.generated_text || "AI không trả lời được.";
//     res.json({ reply: replyText });

//   } catch (err) {
//     res.status(500).json({ reply: `Lỗi khi xử lý AI: ${err.message}` });
//   }
// };

// module.exports = {
//   aiChat,
// };
