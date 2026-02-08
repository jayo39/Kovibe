import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [friendRefreshTrigger, setFriendRefreshTrigger] = useState(0);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                let res = await axios.get('/api/auth/loggedIn', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser({...res.data, accessToken: token});
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, friendRefreshTrigger, refreshFriends: () => setFriendRefreshTrigger(prev => prev + 1) }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;