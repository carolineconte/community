import { Link } from "react-router-dom";
import { BiSolidUserRectangle } from 'react-icons/bi';
import { useEffect, useState } from "react";
import AppContext from "../context/AppContext";

export const User = ({ user }) => {

    const [admin, setAdmin] = useState([])

    const storedUserData = localStorage.getItem('user');
    useEffect(() => {
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setAdmin(userData)
        }
    }, [storedUserData])

    const newUserData = localStorage.getItem('user');
    useEffect(() => {
        if (newUserData) {
            const newUserData = JSON.parse(newUserData);
            setAdmin(newUserData)
        }
    }, [newUserData])



    const { id, name, created_at, role } = user

    const formatDate = (dateUTC) => {
        const options = { dateStyle: 'long' }
        const date = new Date(dateUTC).toLocaleString('EN', options);
        return date
    }

    console.log(admin)

    return (
        <div className='cardUser'>
            <div>
                <h3><span className='infouser'>Name:</span> {name}</h3>
                <h3><span className='infouser'>Member since:</span> {formatDate(created_at)}</h3>
                <p> info {admin}</p>

            </div>
            <Link className="foto" to={`/profile/${id}`}> <BiSolidUserRectangle /> </Link>
        </div>
    )
}
