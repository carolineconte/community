import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUsers} = useContext(AppContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email,
      password
    }

    await fetch('http://localhost:3333/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        // Aqui você pode lidar com o authUser retornado do servidor
        localStorage.setItem('user', JSON.stringify(data));
       
        if (data.length === 0) {
          return setError('User not found')
        } else {

          localStorage.setItem('loggedIn', true)
          
          navigate('/community')
          setUsers([])
        }
      })
  }


  return (
    <div className={`container`}>
      <h1 className="center">Login</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input type="email" name='email' required placeholder='Email'
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Password</span>
          <input type="password" name="password" required
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button className='btn'>Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
