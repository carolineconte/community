import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";

import AppContext from "../context/AppContext";

export const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { setUsers } = useContext(AppContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords must be the same.");
      return;
    }
    if (!displayName || !email || !password) {
      return setError("Please fill in all fields!");
    }

    if (role === 'admin' && pin !== '123') {
      return setError("PIN not allowes");
    }

    const user = {
      name: displayName,
      email: email,
      password: password,
      role: role
    };

    await fetch('http://localhost:3333/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('Newuser', JSON.stringify(data));

      })

    localStorage.setItem('loggedIn', true)

    navigate('/community')
    setUsers([])
  };


  return (
    <div className={`container reg`}>
      <h1 className="center">Register</h1>
      <p className="center">Sign up to be part of the community</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="type the password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Confirm your password:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        <div className="role-container">
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="user">Select your role</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <input placeholder="PIN" className="inputRole" disabled={role === 'admin' ? false : true} value={pin} onChange={(e) => setPin(e.target.value)} type="text"  />
        </div>
        <button className="btn">Register</button>
        <Link id="linkLogin" to='/login'><p>Already registered ?</p></Link>
        {error && <p className="error">{error}</p>}

      </form>
    </div>
  );
};

