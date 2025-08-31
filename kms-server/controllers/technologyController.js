const pool = require("../db"); // import kết nối DB

// POST /api/technology
const createTechnology = async (req, res) => {
    try {
      const { name } = req.body;
      const file = req.file; // file do multer upload vào
  
      if (!file) {
        return res.status(400).json({ error: "Icon file is required" });
      }
  
      // Lưu tên file hoặc đường dẫn vào DB
      const iconPath = `/images/${file.filename}`;
  
      const result = await pool.query(
        "INSERT INTO technology (name, icon) VALUES ($1, $2) RETURNING *",
        [name, iconPath]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };



// Update technology (cho phép update icon file)
const updateTechnology = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const file = req.file; // file upload từ multer
  
      // Lấy record cũ để check
      const oldResult = await pool.query(
        "SELECT * FROM technology WHERE id=$1",
        [id]
      );
  
      if (oldResult.rowCount === 0) {
        return res.status(404).json({ error: "Technology not found" });
      }
  
      const oldTech = oldResult.rows[0];
  
      // Nếu có file mới thì tạo đường dẫn icon mới
      let iconPath = oldTech.icon; // giữ nguyên icon cũ
      if (file) {
        iconPath = `/images/${file.filename}`;
  
        // Nếu muốn xoá icon cũ trong thư mục images:
        if (oldTech.icon && oldTech.icon.startsWith("/images/")) {
          const oldFilePath = path.join(__dirname, "..", oldTech.icon);
          if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath); // xóa file cũ
          }
        }
      }
  
      // Update DB
      const result = await pool.query(
        "UPDATE technology SET name=$1, icon=$2 WHERE id=$3 RETURNING *",
        [name || oldTech.name, iconPath, id]
      );
  
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// Xóa technology
const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM technology WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Technology not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTechnology,
  updateTechnology,
  deleteTechnology,
};
