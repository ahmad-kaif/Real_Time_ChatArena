import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ✅ Ensures HTTP-only cookies are included
            });

            if (!res.ok) {
                throw new Error("Logout failed, please try again.");
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // ✅ Clear auth state
            setAuthUser(null);
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(`Logout failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
