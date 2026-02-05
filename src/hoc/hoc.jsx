import {useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../provider/userProvider";

export const withLogin = (Component) => {
    return (props) => {
        const { user, loading } = useContext(UserContext);
        const navigate = useNavigate();

        useEffect(() => {
            if (loading === false && !user) {
                navigate('/login', { replace: true });
            }
        }, [user, loading, navigate]);
        if (loading) return <div>Loading...</div>; 

        return user ? <Component {...props} /> : null;
    };
}

export const withLoginAndAdmin = (Component) => {
    return (props) => {
        const { user, loading } = useContext(UserContext);
        const navigate = useNavigate();

        useEffect(() => {
            if (loading === false) {
                if (!user) {
                    navigate('/login', { replace: true });
                } else if (user.role !== 'ADMIN') {
                    alert('관리자 권한이 없습니다.');
                    navigate('/', { replace: true });
                }
            }
        }, [user, loading, navigate]);

        if (loading) return <div>Loading...</div>;

        return (user && user.role === 'ADMIN') ? <Component {...props} /> : null;
    };
}