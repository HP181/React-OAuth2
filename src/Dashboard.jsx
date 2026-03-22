import { useAuth } from "./components/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { FiGlobe, FiMapPin, FiUsers, FiBook, FiUserCheck, FiBriefcase } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { user } = useAuth();
    const isGithub = user?.provider === "github";

    const stats = isGithub
        ? [
            { label: "Repositories", value: user?.publicRepos },
            { label: "Followers", value: user?.followers },
            { label: "Following", value: user?.following },
        ]
        : [
            { label: "Account type", value: "OAuth2" },
            { label: "Provider", value: "Google" },
            { label: "Status", value: "Active" },
        ];

    const infoRows = isGithub
        ? [
            { icon: <FiBook />, label: "Username", value: `@${user?.username}` },
            { icon: <FiBriefcase />, label: "Company", value: user?.company || "Not provided" },
            { icon: <FiMapPin />, label: "Location", value: user?.location || "Not provided" },
            { icon: <FiGlobe />, label: "Website", value: user?.blog || "Not provided", link: user?.blog },
            { icon: <FiUsers />, label: "Email", value: user?.email },
            { icon: <FiUserCheck />, label: "Member since", value: new Date(user?.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" }) },
        ]
        : [
            { label: "Full name", value: user?.name },
            { label: "Email", value: user?.email },
            { label: "Locale", value: user?.locale ?? "Not provided" },
        ];

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md flex flex-col gap-6">

                {/* Profile card */}
                <div className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl px-8 py-8 flex flex-col items-center gap-4">
                    <img
                        src={user?.picture}
                        alt="profile"
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-[#2a2a2a]"
                    />
                    <div className="text-center flex flex-col items-center gap-2">
                        <h2 className="text-white text-xl font-semibold">{user?.name}</h2>

                        {isGithub && user?.bio && (
                            <p className="text-gray-500 text-sm max-w-xs">{user.bio}</p>
                        )}

                        {!isGithub && (
                            <p className="text-gray-500 text-sm">{user?.email}</p>
                        )}

                        {/* Provider badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#242424] border border-[#2a2a2a] rounded-full text-xs text-gray-400 mt-1">
                            {isGithub
                                ? <ImGithub className="text-white text-sm" />
                                : <FcGoogle className="text-sm" />
                            }
                            Signed in with {isGithub ? "GitHub" : "Google"}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {stats.map(({ label, value }) => (
                        <div key={label} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-4 flex flex-col gap-1">
                            <span className="text-gray-600 text-xs">{label}</span>
                            <span className="text-white text-sm font-medium">{value}</span>
                        </div>
                    ))}
                </div>

                {/* Info rows */}
                <div className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl divide-y divide-[#2a2a2a]">
                    {infoRows.map(({ icon, label, value, link }) => (
                        <div key={label} className="flex items-center justify-between px-6 py-4 gap-4">
                            <div className="flex items-center gap-2 text-gray-500 text-sm shrink-0">
                                {icon && <span className="text-gray-600">{icon}</span>}
                                {label}
                            </div>
                            {link
                                ? <Link to={link} target="_blank" rel="noreferrer"
                                    className="text-green-400 text-sm font-medium hover:text-green-300 transition-colors truncate">
                                    {value}
                                </Link>
                                : <span className="text-white text-sm font-medium truncate">{value}</span>
                            }
                        </div>
                    ))}
                </div>
                
                {/* GitHub profile link */}
                {isGithub && (
                    <Link
                        to={user.githubProfile}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl text-white text-sm font-medium hover:bg-[#242424] transition-colors"
                    >
                        <ImGithub className="text-base" />
                        View GitHub Profiler
                    </Link>
                )}

            </div>
        </div>
    );
};

export default Dashboard;