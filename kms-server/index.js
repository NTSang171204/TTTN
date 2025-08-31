const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { query } = require('./db');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const knowledgeRoutes = require('./routes/knowledgeRoutes');
const techRoutes = require("./routes/techRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

//Cho phep frontend goi
app.use(cors({
    origin: [
        "http://localhost:8080", //User app
        "http://localhost:8081", //Admin app
    ],
    credentials: true, // Cho phép gửi cookie từ frontend
}));

//middlewares
app.use(express.json());
// cho phép truy cập ảnh tĩnh
app.use("/images", express.static(path.join(__dirname, "images")));


//routes
app.use('/api/auth', authRoutes);
app.use('/api/knowledge', knowledgeRoutes);
app.use('/api/technology', techRoutes);
app.use('/api/ai', aiRoutes);



// app.use("/api/knowledge", commentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});