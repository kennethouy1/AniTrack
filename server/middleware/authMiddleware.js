const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' })

  try {
    const { data, error } = await supabase.auth.getUser(token)
    if (error) return res.status(401).json({ error: 'Token is not valid' })
    req.user = data.user
    next()
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' })
  }
}

module.exports = { protect }