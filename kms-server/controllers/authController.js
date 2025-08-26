const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {query} = require('../db');
const { isValidEmail} = require('../utils/validate');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

const hash_salt = 10;

//Register route

async function register(req,res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'username, email, password are required'});
        }
        if(!isValidEmail(email)) {
            return res.status(400).json({error: 'Email is invalid'});
        }
        if (password.length < 0) {
            return res.status(400).json({error: 'Password must be at least 6 characters long'});
        }

        const exists = await query(
            'SELECT 1 FROM users WHERE username = $1 OR email = $2 LIMIT 1',
            [username, email]
        );

        if (exists.rowCount > 0) {
            return res.status(409).json({error: 'Username or email already exists'});
        }

        const password_hash = await bcrypt.hash(password, hash_salt);

        const result = await query(
            `INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, role, created_at`,
            [username, email, password_hash]
        );

        return res.status(201).json({
            message: 'Registered successfully',
            user: result.rows[0]
        });
    } catch (error) {
        if (error && error.code === '23505') {
            return res.status(409).json({ error: 'Username or email already exists' });
        }
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


//Login route
async function login(req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({error: "Email and Password are required"});
        }

        const found = await query(
            `SELECT id, username, email, role, password_hash
            FROM users
            WHERE email = $1
            LIMIT 1`,
            [email]
        );

        if (found.rowCount === 0) {
            return res.status(401).json({success: false ,error: "Invalid email or password"});
        }
        const user = found.rows[0];

        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) {
            return res.status(401).json({success: false ,error: "Invalid email or password"});
        }
        const token = jwt.sign(
            { id: user.id, username: user.username,role: user.role},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES}
        );

        return res.json({
            success: true,
            message: 'Login Successfully',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error: ",error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

//User's details
async function me(req, res) {
    try {
        const me = await query(
            'SELECT id, username, email, role, created_at FROM users WHERE id = $1',
            [req.user.id]
        );
        if (me.rowCount ===0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: me.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


//Logout route

async function logout(req, res) {
    try {
        //Delete JWT in client
        //Server just need to response the successful message:
        return res.json({message: "Logged out successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { register, login, me, logout};