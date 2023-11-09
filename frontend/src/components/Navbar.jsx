import { NavLink, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


export const Navbar = () => {

    const navigate = useNavigate();

    const [urlid, seturlId] = useState(undefined)
    const isUserLoggedIn = (localStorage.getItem('loggedIn') === 'true');

    const storedUserData = localStorage.getItem('user');
    useEffect(() => {
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            seturlId(userData[0].id)
        }
    }, [storedUserData])

    const newUserData = localStorage.getItem('Newuser');
    useEffect(() => {
        if (newUserData) {
            const newUserDataID = JSON.parse(newUserData);
            seturlId(newUserDataID.insertId)
            console.log(newUserData)
        }
    }, [newUserData])


    const logout = () => {
        fetch('http://localhost:3333/logout', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
        })
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('user');
        localStorage.removeItem('Newuser');
        navigate('/login')
    };


    return (
        <div className="navbar">
            <Link className="logo" to='/'>Home</Link>
            <Link className="logo" to='/community'>Community</Link>
            <nav>
                <ul className="links_list">
                    {isUserLoggedIn ?
                        (<>
                            <li> <NavLink to={`/profile/${urlid}`} > Profile </NavLink> </li>

                            <li><NavLink className='att' onClick={logout}> LogOut </NavLink></li>
                        </>)
                        :
                        (<>
                            <li><NavLink to='/login'>Login</NavLink></li>
                            <li><NavLink to='/register'>Register</NavLink></li>
                        </>)
                    }
                </ul>
            </nav>
        </div>
    )
}
