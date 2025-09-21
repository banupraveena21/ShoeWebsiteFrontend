import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res = await axios.post('https://shoewebsitebackend.onrender.com/api/login/',{
        username: email,
        password: password
      })
      localStorage.setItem('access', res.data.access)
      navigate('/')
    }catch(err){
      setError('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow w-96 border-1">
        <div className="flex justify-between mb-6">
          <button className="flex-1 bg-teal-800 text-white py-2">Log in</button>
          <Link to="/register" className="flex-1 bg-gray-300 py-2 text-center">Register</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input className="w-full border px-3 py-2" type="text"
              value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input className="w-full border px-3 py-2" type="password"
              value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="w-full bg-teal-800 text-white py-2 rounded">Log In</button>
        </form>
      </div>
    </div>
  )
}
