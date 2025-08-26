const pool = require('../db');

//Create new knowledge

const createKnowledge = async (req, res) => {
    try {
      const { technology, level, title, content, tags } = req.body;
      const author_id = req.user.id;
  
      const techQuery = await pool.query(`
        SELECT id from technology WHERE name = $1
        `,[technology]);

        const technology_id = techQuery.rows[0].id;

      const result = await pool.query(
        `INSERT INTO knowledge (technology, technology_id, level, title, content, tags, author_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [technology, technology_id, level, title, content, tags, author_id]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({
        error: `Internal server error on creating new knowledge: ${error.message}`,
      });
    }
  };
  
  

// Get all knowledge
const getAllKnowledge = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM knowledge ORDER BY created_at DESC`
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error:  `Internal server error on getting all the knowledge blogs: ${error.message}`})
    }
};

// Get Knowledge by ID
const getKnowledgeById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT * FROM knowledge WHERE id = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Knowledge not found, try checking the database or read the console log'});
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: `Internal server error on getting knowledge by ID: ${error.message}` });
    }
};

const updateKnowledge = async (req, res) => {
    try {
        const { id } = req.params;
        const { technology, level, title, content, tags, status } = req.body;
        const author_id = req.user.id;

        // Only let the author update their own knowledge blog
        const checkAuthor = await pool.query(
            "SELECT * FROM knowledge WHERE id = $1 AND author_id = $2",
            [id, author_id]
        );
        if (checkAuthor.rows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to update this knowledge blog' });
        }

        const result = await pool.query(
            `UPDATE knowledge
             SET technology = $1,
                 level = $2,
                 title = $3,
                 content = $4,
                 tags = $5,
                 status = COALESCE($6, status), -- giữ nguyên status cũ nếu null
                 updated_at = NOW()
             WHERE id = $7
             RETURNING *`,
            [technology, level, title, content, tags, status, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: `Internal server error on updating knowledge: ${error.message}` });
    }
};


// Delete knowledge for now: only the author can delete.

const deleteKnowledge = async (req, res) => {
    try {
        const { id } = req.params;
        const author_id = req.user.id;

        const check = await pool.query("SELECT * FROM knowledge WHERE id = $1 and author_id = $2", [id, author_id]);
        if (check.rows.length === 0) {
            return res.status(403).json({ error: 'You are not authorized to delete this knowledge blog' });
        }
        await pool.query(
            `DELETE FROM knowledge WHERE id = $1`,
            [id]
        );
        res.json({ message: 'Knowledge deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: `Internal server error on deleting knowledge: ${error.message}` });
    }
};

// Search Knowledge
const searchKnowledge = async (req, res) => {
    try {
        const { technology, level, keyword } = req.query;

        // Xây dựng query động
        let baseQuery = `
            SELECT k.id, k.title, k.content, k.tags, k.technology, k.level,
                   k.likes_count, k.dislikes_count,
                   (SELECT COUNT(*) FROM comments c WHERE c.knowledge_id = k.id) AS comments_count,
                   json_agg(
                       json_build_object(
                           'id', c.id,
                           'content', c.content,
                           'user_id', c.user_id,
                           'parent_id', c.parent_id,
                           'created_at', c.created_at
                       )
                   ) FILTER (WHERE c.id IS NOT NULL) AS comments
            FROM knowledge k
            LEFT JOIN comments c ON k.id = c.knowledge_id
            WHERE 1=1
        `;

        const values = [];
        let idx = 1;

        if (technology) {
            baseQuery += ` AND k.technology ILIKE $${idx++}`;
            values.push(`%${technology}%`);
        }

        if (level) {
            baseQuery += ` AND k.level ILIKE $${idx++}`;
            values.push(`%${level}%`);
        }

        if (keyword) {
            baseQuery += ` AND (k.title ILIKE $${idx++} OR k.content ILIKE $${idx++})`;
            values.push(`%${keyword}%`, `%${keyword}%`);
        }

        baseQuery += `
            GROUP BY k.id
            ORDER BY k.created_at DESC
        `;

        const result = await pool.query(baseQuery, values);

        res.json(result.rows);
    } catch (error) {
        console.error("Error searching knowledge:", error);
        res.status(500).json({ error: `Internal server error on searching knowledge: ${error.message}` });
    }
};


//Fetch all techs
const fetchAllTechs = async (req, res) => {
    try {
        const result = await pool.query(`SELECT id, name from technology ORDER BY name ASC`);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching technologies:", error);
        res.status(500).json({ error: `Internal server error on fetching technologies: ${error.message}` });
    }
};


// Exporting all the functions
module.exports = {
    createKnowledge,
    getAllKnowledge,
    getKnowledgeById,
    updateKnowledge,
    deleteKnowledge,
    searchKnowledge,
    fetchAllTechs
};