import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch("http://localhost:8080/user-info", {
                method: "GET",
                credentials: "include",
            });

            if (res.ok && !res.redirected) {
                const data = await res.json();
console.log("u", data);
                // Normalize Google and GitHub fields into one shape
                const normalized = {
                    name: data.name || data.login,
                    email: data.email || "Not provided",
                    picture: data.picture || data.avatar_url,
                    locale: data.locale || null,
                    provider: data.avatar_url ? "github" : "google",

                    // GitHub-specific
                    username: data.login || null,
                    githubProfile: data.html_url,
                    bio: data.bio || null,
                    location: data.location || null,
                    blog: data.blog || null,
                    company: data.company || null,
                    publicRepos: data.public_repos ?? null,
                    followers: data.followers ?? null,
                    following: data.following ?? null,
                    createdAt: data.created_at || null,
                };
                
                setUser(normalized);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch("http://localhost:8080/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.log("Logout error", error);
        } finally {
            setUser(null); // clear user regardless of response
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);