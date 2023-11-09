import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const {id} = useParams()
  

  const { logado, setLogado, setUsers } = useContext(AppContext)
  console.log(id, 'id')
  const [profile, setProfile] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData () {
      const res = await fetch(`http://localhost:3333/profile/${id}`);
      const Data = await res.json();
      setProfile(Data);
    }
    fetchData();
  }, [id]);


  const handleDelete = async () => {
    await fetch(`http://localhost:3333/profile/${id}`, {
      method: 'delete'
    })
    localStorage.setItem('loggedIn', false)
    localStorage.removeItem('user');
    localStorage.removeItem('Newuser');
    navigate('/')
    setUsers([])
  }

  console.log(profile)

  return (
    <div className="container">
      <h2>Detalhes do Usuário</h2>
      {profile ? (
        profile.map(dado =>
          <div key={dado.id}>
            <p>Name: {dado.name}</p>
            <p>Email: {dado.email}</p>
            <p>Password: {dado.password}</p>
            <p>Role: {dado.role}</p>
            <button className='btn att' onClick={handleDelete}>Delete account</button>
          </div>
        )
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  )
}
