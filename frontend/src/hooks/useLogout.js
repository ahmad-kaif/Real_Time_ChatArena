import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
    const  [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext()

    const logout = async () => {
        setLoading(true)
        
        try {
            const res = await fetch("/api/auth/logout", {
                method:"POST",
                headers: {"Content-Type" : "application/json"},
            });
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            // localstorage
            localStorage.removeItem("chat-user");
            // context
            setAuthUser(null);
        } catch (error) {
            toast.error(`Error in logout`,error.message);
        }finally{
            setLoading(false)
        }
    }
    return {loading,logout};
}

export default useLogout
