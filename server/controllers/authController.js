const supabase = require('../config/supabaseClient')

const signup = async (req, res) => {
  const { email, username, password } = req.body

  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return res.status(400).json({ error: error.message })

    await supabase.from('users').insert([{ 
      id: data.user.id, 
      email, 
      username 
    }])

    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return res.status(400).json({ error: error.message })

    res.status(200).json({ 
      token: data.session.access_token,
      user: data.user 
    })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

const logout = async (req, res) => {
  try {
    await supabase.auth.signOut()
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { signup, login, logout }