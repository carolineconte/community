import { useContext, useEffect } from 'react';
import AppContext from "../context/AppContext";

import { Link } from "react-router-dom"

// un endpoint visibile a chiunque che ritorni il numero di utenti registrati
export const Home = () => {

    const { users, setUsers } = useContext(AppContext)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:3333/community');
            const data = await res.json();
            setUsers(data);
        }
        fetchData();

    }, [setUsers])

    return (
        <div className="container">
            <h2>Number of members:</h2>
            <p className="qnt">{users.length}</p>
            <div className="callBox">
                <Link className="call" to='/register'>join us</Link>
                <Link className="call" to='/login'>Already a member ?</Link>
            </div>
        </div>
    )
}
