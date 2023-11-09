import { useEffect, useContext } from 'react';
import AppContext from "../context/AppContext";
import { User } from '../components/User';

export const Community = () => {
    const { users, setUsers } = useContext(AppContext)

    //API
    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:3333/community');
            const data = await res.json();
            setUsers(data);
        }
        fetchData();
    }, [setUsers])

    return (
        <div className='communityList'>
            <h2>Our community </h2>
            <div className='communityList-GRID'>
            {
                users.map(user => <User key={user.id} user={user} />)
            }
            </div>
        </div>
        
    )
}
