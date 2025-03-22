import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputErrors({ username, password });
        if (!success) return;

        setLoading(true); // ✅ Set loading before API call

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials:"include",
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error("Invalid credentials, please try again.");
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // ✅ Store user in local storage
            // localStorage.setItem("chat-user", JSON.stringify(data));

            // ✅ Update global auth state
            setAuthUser(data);
            toast.success("Login successful!");
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill in all the fields");
        return false;
    }

    return true;
}
