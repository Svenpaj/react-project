import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ProtectedRoute({ children }) {
    const { user } = useUser();

    if (!user || user.role == "guest") {
        console.log("User:", user);
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;