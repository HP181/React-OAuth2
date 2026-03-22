import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border-b border-[#2a2a2a]">
            <div className="flex gap-6">
                <Link to="/" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">
                    Home
                </Link>
                <Link to="/dashboard" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">
                    Dashboard
                </Link>
            </div>

            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <img src={user.picture} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                        <span className="text-white text-sm font-medium hidden sm:block">{user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;