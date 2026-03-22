import { useAuth } from "../components/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useAuth();
    console.log("uiiii", user);

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-lg text-center flex flex-col items-center gap-6">

                <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center text-white text-2xl font-bold">
                    A
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-3xl font-semibold">
                        Hey, {user?.name} 👋
                    </h1>
                    <p className="text-gray-500 text-sm">
                        You're signed in as <span className="text-gray-400">{user?.email}</span>
                    </p>
                </div>

                <div className="w-full h-px bg-[#2a2a2a]" />

                <p className="text-gray-500 text-sm leading-relaxed">
                    Welcome to App. Head over to your dashboard to view your profile and account details.
                </p>

                <Link
                    to="/dashboard"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                    Go to Dashboard
                </Link>

            </div>
        </div>
    );
};

export default Home;