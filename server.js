// server.js
import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// 📥 Nhận request từ fetch("/save")
app.post("/save", (req, res) => {
  const record = req.body;
  const filePath = path.join(__dirname, "data.json");

  try {
    let list = [];
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      list = raw ? JSON.parse(raw) : [];
    }
    list.push(record);
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
    res.json({ ok: true, message: "✅ Đã lưu vào data.json", record });
  } catch (err) {
    console.error("❌ Lỗi ghi file:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server chạy tại http://127.0.0.1:${PORT}`));
