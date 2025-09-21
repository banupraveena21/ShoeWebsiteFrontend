import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [agree,setAgree] = useState(false)
  const [error,setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!agree){ setError('You must agree to terms'); return }
    try{
      await axios.post('http://127.0.0.1:8000/api/register/',{
        username,email,password
      })
      navigate('/login')
    }catch(err){
      console.error(err.response?.data);
      setError('Registration failed')
    }
  }

  return(
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow w-96">
        <div className="flex justify-between mb-6">
          <Link to="/login" className="flex-1 bg-gray-300 py-2 text-center">Log in</Link>
          <button className="flex-1 bg-teal-800 text-white py-2">Register</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input className="w-full border px-3 py-2"
              value={username} onChange={e=>setUsername(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Email id</label>
            <input className="w-full border px-3 py-2"
              value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input className="w-full border px-3 py-2" type="password"
              value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" checked={agree} onChange={e=>setAgree(e.target.checked)} />
            <span>I have read and agreed to the Terms and Privacy Policy</span>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="w-full bg-teal-800 text-white py-2 rounded">Register</button>
        </form>
      </div>
    </div>
  )
}
